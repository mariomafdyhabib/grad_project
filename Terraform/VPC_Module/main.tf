# ------------------------------------
# Create the VPC
resource "aws_vpc" "Mario_VPC" {
  cidr_block = var.cidr_block

  tags = {
    Name = var.vpc_name
  }

  depends_on = [null_resource.delete_sgs]

}

########                         PUBLIC Creation                  **************

# Create public subnets
resource "aws_subnet" "public" {
  count             = length(var.public_subnets)
  vpc_id            = aws_vpc.Mario_VPC.id
  cidr_block        = var.public_subnets[count.index]
  availability_zone = var.azs[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "Mario Public Subnet ${count.index + 1}"
    "kubernetes.io/role/elb" = "1"
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
  }
}

# Create the Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.Mario_VPC.id

  tags = {
    Name = "Mario_VPC-IGW"
  }
}

# Route Table for Public Subnets
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.Mario_VPC.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "Mario_VPC-Public-RT"
  }
}

# Route Table Association for Public Subnets
resource "aws_route_table_association" "public_subnet_association" {
  count          = length(var.public_subnets)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public_rt.id
}


########                         PRIVATE Creation                  **************

resource "aws_subnet" "private" {
  count             = length(var.private_subnets)
  vpc_id            = aws_vpc.Mario_VPC.id
  cidr_block        = var.private_subnets[count.index]
  availability_zone = var.azs[count.index]

  tags = {
    Name = "Mario Private Subnet ${count.index + 1}"
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/${var.cluster_name}"  = "shared"
  }

  depends_on = [
    null_resource.delete_enis
  ]

}

# Create an Elastic IP for the NAT Gateway
resource "aws_eip" "nat_eip" {
  domain = "vpc"
  tags = {
    Name = "Mario-NAT-EIP"
  }
}

# Create the NAT Gateway in a public subnet
resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public[0].id  # Assuming the NAT Gateway is created in the first public subnet

  tags = {
    Name = "Mario_VPC-NAT-Gateway"
  }
}

# Route Table for Private Subnets
resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.Mario_VPC.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw.id
  }

  tags = {
    Name = "Mario_VPC-Private-RT"
  }
}

# Route Table Association for Private Subnets
resource "aws_route_table_association" "private_subnet_association" {
  count          = length(var.private_subnets)
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private_rt.id
}

variable "private_subnet_ids" {
  type = list(string)
  description = "List of private subnet IDs (manual list to avoid destroy-time reference)"
  default = []  # Optional: or pass via `terraform.tfvars`
}

resource "null_resource" "delete_enis" {
  for_each = toset(var.private_subnet_ids)

  provisioner "local-exec" {
    when = destroy
    command = <<EOT
      echo "Deleting ENIs in subnet ${each.key}..."
      ENIs=$(aws ec2 describe-network-interfaces --filters Name=subnet-id,Values=${each.key} \
        --query 'NetworkInterfaces[*].NetworkInterfaceId' --output text)
      for eni in $ENIs; do
        echo "Deleting ENI: $eni"
        aws ec2 delete-network-interface --network-interface-id $eni
      done
    EOT
    interpreter = ["/bin/bash", "-c"]
  }
}

variable "vpc_id_for_sg_cleanup" {}

resource "null_resource" "delete_sgs" {
  provisioner "local-exec" {
    when = destroy
    command = <<EOT
      echo "Deleting non-default security groups in VPC $VPC_ID..."
      SG_IDS=$(aws ec2 describe-security-groups \
        --filters Name=vpc-id,Values=$VPC_ID \
        --query 'SecurityGroups[?GroupName!=`default`].GroupId' \
        --output text)

      for sg in $SG_IDS; do
        echo "Deleting security group $sg"
        aws ec2 delete-security-group --group-id $sg || true
      done
    EOT
    interpreter = ["/bin/bash", "-c"]
    environment = {
      VPC_ID = self.triggers.vpc_id
    }
  }

  triggers = {
    vpc_id = var.vpc_id_for_sg_cleanup
  }
}
