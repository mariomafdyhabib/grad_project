provider "aws" {
  region = "us-east-2"
}

data "aws_eks_cluster_auth" "eks_cluster" {
  name = module.eks.cluster_name
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_name
}

provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    token                  = data.aws_eks_cluster_auth.cluster.token
  }
}


data "http" "chart_values" {
  url = "https://github.com/mariomafdyhabib/grad_project/blob/deployment/app/values.yaml"
}

resource "helm_release" "my_chart" {
  name       = "my-helm-app"
  repository = "https://github.com/mariomafdyhabib/grad_project.git/deployment"
  chart      = "app"
  namespace  = "default"

  # chart      = "/home/mario/Desktop/grad_project/app"  # local path to Helm chart
  # namespace  = "default"
  
  values = [
    data.http.chart_values.response_body,
    # file("/home/mario/Desktop/grad_project/app/values.yaml"),
    yamlencode({
      global = {
        host = replace(module.eks.cluster_endpoint, "https://", "")
        serviceAccount = {
        create = false
        name   = "aws-load-balancer-controller"
        annotations = {
          "eks.amazonaws.com/role-arn" = aws_iam_role.aws_load_balancer_controller_role.arn
        }
      }
      }
    })
    
  ]
  
  set {
    name  = "clusterName"
    value = "Mario-eks-cluster"
  }

  set {
    name  = "region"
    value = "us-east-2"
  }
  

  timeout = 600
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]  # Canonical's AWS account ID for Ubuntu
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}

module "vpc" {
  source         = "./VPC_Module"
  cidr_block     = "10.0.0.0/16"
  vpc_name       = "Mario-VPC"
  public_subnets = ["10.0.1.0/24", "10.0.3.0/24"]
  private_subnets = ["10.0.2.0/24", "10.0.4.0/24"]
  azs            = ["us-east-2a", "us-east-2b"]
  cluster_name   = "Mario-eks-cluster"
}
module "security_group" {
  source  = "./SecurityGroup_Module"
  sg_name = "Mario-Security-Group"
  vpc_id  = module.vpc.vpc_id
}

module "eks" {
  source = "./EKS_Module"
  vpc_id              = module.vpc.vpc_id
  sg_id               = module.security_group.security_group_id
  cluster_name        = "Mario-eks-cluster"
  private_subnet_ids  = module.vpc.private_subnets[*]
  kubernetes_version  = "1.33" 
}


module "nodegroup" {
  source = "./NodeGroup_Module"
  cluster_name        = module.eks.cluster_name
  node_group_name     = "Mario-eks-node-group"
  private_subnet_ids  = module.vpc.private_subnets[*]
  instance_types      = ["t3.medium"]
  desired_size        = 1
  max_size            = 1
  min_size            = 1
}



module "ec2_instance" {
  source           = "./EC2_Module"
  ami_id           = data.aws_ami.ubuntu.id  # Replace with actual AMI ID
  instance_type    = "t2.micro"
  subnet_id        = module.vpc.public_subnets[0]  # Deploying in the first public subnet
  security_group_id = module.security_group.security_group_id
  key_name         = "mario"  # Replace with your actual key pair name
  instance_name    = "Mario-EC2-Bastion "
}


resource "aws_iam_openid_connect_provider" "oidc_provider" {
  url = module.eks.cluster_oidc_issuer_url

  client_id_list = ["sts.amazonaws.com"]

  thumbprint_list = ["9e99a48a9960b14926bb7f3b02e22da0ecd4e4e4"] # Amazon Root CA thumbprint

  tags = {
    Name = "EKS OIDC Provider"
  }
}


provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  token                  = data.aws_eks_cluster_auth.cluster.token
}


data "http" "iam_policy" {
  url = "https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/main/docs/install/iam_policy.json"
}

resource "aws_iam_policy" "aws_load_balancer_controller_policy" {
  name        = "AWSLoadBalancerControllerIAMPolicy"
  description = "IAM policy for AWS Load Balancer Controller"
  policy      = data.http.iam_policy.body
}

resource "aws_iam_role" "aws_load_balancer_controller_role" {
  name = "eks-aws-load-balancer-controller-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Federated = aws_iam_openid_connect_provider.oidc_provider.arn
      },
      Action = "sts:AssumeRoleWithWebIdentity",
      Condition = {
        StringEquals = {
          "${replace(module.eks.cluster_oidc_issuer_url, "https://", "")}:sub" = "system:serviceaccount:kube-system:aws-load-balancer-controller"
        }
      }
    }]
  })
}


resource "aws_iam_role_policy_attachment" "attach_policy" {
  role       = aws_iam_role.aws_load_balancer_controller_role.name
  policy_arn = aws_iam_policy.aws_load_balancer_controller_policy.arn
}

resource "kubernetes_service_account" "aws_load_balancer_controller_sa" {
  metadata {
    name      = "aws-load-balancer-controller"
    namespace = "kube-system"
    annotations = {
      "eks.amazonaws.com/role-arn" = aws_iam_role.aws_load_balancer_controller_role.arn
    }
  }
}

resource "helm_release" "aws_load_balancer_controller" {
  name       = "aws-load-balancer-controller"
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  namespace  = "kube-system"
  version    = "1.7.1" # check latest version and update accordingly

  values = [
    yamlencode({
      clusterName = module.eks.cluster_name
      region      = "us-east-2"
      vpcId       = module.vpc.vpc_id
      serviceAccount = {
        create = false
        name   = kubernetes_service_account.aws_load_balancer_controller_sa.metadata[0].name
      }
      webhook = {
        port = 9443
      }
    })
  ]
}

terraform {
  backend "s3" {
    bucket         = "7erafy-bucket"
    key            = "terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "terraform-locks" # optional but recommended for locking
  }
}