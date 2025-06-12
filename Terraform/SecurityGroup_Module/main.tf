/*
This is a general Purpose Security Group
Take variables: Name, VPC_ID
Enable or Disable Inbound rules: HTTP, HTTPS, SSH
Allow for all outbound rules
*/



resource "aws_security_group" "Mario_SecGroup" {
  name        = var.sg_name
  description = "Security group with inbond SSH, HTTP, HTTPS"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = var.sg_name
  }
}


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
    vpc_id = aws_vpc.Mario_VPC.id
  }
}

