variable "vpc_id" {
  description = "ID of the VPC where EKS cluster will be deployed"
  type        = string
}

variable "cluster_name" {
  description = "The name of the EKS cluster."
  type        = string
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs for the EKS cluster."
  type        = list(string)
}

variable "sg_id" {
  description = "The ID of the security group for the EKS cluster."
  type        = string
}

variable "kubernetes_version" {
  description = "The Kubernetes version for the EKS cluster."
  type        = string
}