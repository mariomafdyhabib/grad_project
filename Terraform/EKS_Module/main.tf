# IAM Role for EKS Cluster
resource "aws_iam_role" "Mario_eks_cluster_role" {
  name = "Mario-eks-cluster-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "eks.amazonaws.com"
      }
    }]
  })
}

# IAM Policy Attachment for EKS Cluster Role
resource "aws_iam_role_policy_attachment" "eks_cluster_AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.Mario_eks_cluster_role.name
}

resource "aws_iam_role_policy_attachment" "eks_cluster_AmazonEKSVPCResourceController" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.Mario_eks_cluster_role.name
}

# -------------------------------------------------------------- Creating Cluster
# Create the EKS Cluster
resource "aws_eks_cluster" "eks_cluster" {
  name     = var.cluster_name
  role_arn = aws_iam_role.Mario_eks_cluster_role.arn

  vpc_config {
    subnet_ids = var.private_subnet_ids
    security_group_ids = [var.sg_id]
    # endpoint_public_access = false
  }

  version = var.kubernetes_version

  tags = {
    Name = "eks-cluster"
  }
}

resource "aws_eks_addon" "eks_pod_identity_agent" {
  cluster_name = aws_eks_cluster.eks_cluster.name
  addon_name   = "eks-pod-identity-agent"
  addon_version = "v1.3.2-eksbuild.2"
}

resource "aws_eks_addon" "kube_proxy" {
  cluster_name = aws_eks_cluster.eks_cluster.name
  addon_name   = "kube-proxy"
  # addon_version = "v1.33.0-eksbuild.2"
}

resource "aws_eks_addon" "vpc_cni" {
  cluster_name = aws_eks_cluster.eks_cluster.name
  addon_name   = "vpc-cni"
  # addon_version = "v1.19.5-eksbuild.3"
}