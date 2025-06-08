variable "vpc_name" {
  description = "The name of the VPC"
  type        = string
}
variable "cidr_block" {
  description = "The CIDR block for the VPC"
  type        = string
}

variable "azs" {
  description = "The list of availability zones"
  type        = list(string)
}
variable "public_subnets" {
  description = "The list of public subnet CIDR blocks"
  type        = list(string)
}

variable "private_subnets" {
  description = "The list of private subnet CIDR blocks"
  type        = list(string)
}

variable "cluster_name" {
  description = "The name of the EKS cluster to tag subnets for ALB discovery"
  type        = string
}
