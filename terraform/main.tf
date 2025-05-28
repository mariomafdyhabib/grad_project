provider "aws" {
  region = var.region
}

provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
  }
}

provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
    }
  }
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${var.cluster_name}-vpc"
  cidr = var.vpc_cidr

  azs             = ["${var.region}a", "${var.region}b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true

  public_subnet_tags = {
    "kubernetes.io/role/elb" = 1
  }

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = 1
  }
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name                   = var.cluster_name
  cluster_version                = var.eks_version
  cluster_endpoint_public_access = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    app = {
      min_size     = 1
      max_size     = 3
      desired_size = 2

      instance_types = [var.node_instance_type]
      capacity_type  = "ON_DEMAND"

      labels = {
        app = "todo-app"
      }
    }
  }

  node_security_group_additional_rules = {
    ingress_alb_http = {
      description = "Allow ALB ingress"
      protocol    = "tcp"
      from_port   = 30000
      to_port     = 32767
      type        = "ingress"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }
}

resource "aws_iam_policy" "alb_controller" {
  name        = "AWSLoadBalancerControllerIAMPolicy"
  description = "Policy for ALB Controller"
  policy      = file("${path.module}/iam/alb-controller-policy.json")
}

module "alb_controller_iam_role" {
  source = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"

  role_name = "alb-controller"
  attach_load_balancer_controller_policy = true

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["kube-system:aws-load-balancer-controller"]
    }
  }
}

resource "helm_release" "alb_controller" {
  name       = "aws-load-balancer-controller"
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  namespace  = "kube-system"

  set {
    name  = "clusterName"
    value = module.eks.cluster_name
  }

  set {
    name  = "serviceAccount.create"
    value = "true"
  }

  set {
    name  = "serviceAccount.name"
    value = "aws-load-balancer-controller"
  }

  set {
    name  = "serviceAccount.annotations.eks\\.amazonaws\\.com/role-arn"
    value = module.alb_controller_iam_role.iam_role_arn
  }

  depends_on = [module.eks]
}

resource "helm_release" "app" {
  name      = "my-full-app"
  chart     = "./helm-chart"  # Path to your Helm chart
  namespace = "default"

  values = [
    file("${path.module}/helm-values/my-full-app.yaml")
  ]

  set {
    name  = "global.host"
    value = data.aws_lb.app_alb.dns_name
  }

  depends_on = [
    helm_release.alb_controller,
    kubernetes_storage_class.ebs_sc
  ]
}

data "aws_lb" "app_alb" {
  depends_on = [helm_release.app]
  tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "owned"
    "elbv2.k8s.aws/stack" = "default/my-app-ingress"
  }
}

output "application_url" {
  value = "http://${data.aws_lb.app_alb.dns_name}"
}

output "mongo_express_url" {
  value = "http://${data.aws_lb.app_alb.dns_name}/mongo-express"
}