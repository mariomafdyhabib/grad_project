variable "node_group_name" {
  description = "The name of the EKS node group."
  type        = string
}

variable "cluster_name" {
  description = "The name of the EKS cluster."
  type        = string
}

variable "instance_types" {
  description = "List of instance types for the EKS node group."
  type        = list(string)
}

variable "desired_size" {
  description = "The desired number of nodes in the EKS node group."
  type        = number
}

variable "max_size" {
  description = "The maximum number of nodes in the EKS node group."
  type        = number
}

variable "min_size" {
  description = "The minimum number of nodes in the EKS node group."
  type        = number
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs for the EKS cluster."
  type        = list(string)
}
