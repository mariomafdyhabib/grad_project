variable "cluster_name" {
  default = "todo-app-eks"
}

variable "region" {
  default = "us-west-2"
}

variable "eks_version" {
  default = "1.28"
}

variable "node_instance_type" {
  default = "t3.medium"
}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}