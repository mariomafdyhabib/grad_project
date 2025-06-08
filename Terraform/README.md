# Terraform Infrastructure for Book Library Management

In this section, we utilized Terraform to manage and provision the infrastructure on AWS, ensuring a scalable and consistent setup for the "Book Library Management" application. The infrastructure is designed to be modular and maintainable, using separate modules for different components such as VPC, security groups, and EKS clusters. Additionally, Terraform is configured to store its state files on an S3 bucket, centralizing resource management and enhancing collaboration.

## Prerequisites
Before creating Infrastructure as Code (IaC), ensure you have created an IAM Role on AWS and obtained the necessary credentials.

## Terraform Modules

### VPC Module
- **Purpose**: Defines and provisions the Virtual Private Cloud (VPC) and associated networking components, such as subnets and route tables.
- **Module Path**: `./VPC_Module`

### SecurityGroup Module
- **Purpose**: Manages security groups, specifying rules for inbound and outbound traffic to secure the infrastructure.
- **Module Path**: `./SecurityGroup_Module`

### Node Group Module
- **Purpose**: Configures and manages the node groups in the Kubernetes cluster.
- **Module Path**: `./NodeGroup_Module`

### EKS Module
- **Purpose**: Provisions the Amazon EKS (Elastic Kubernetes Service) cluster, enabling container orchestration and management.
- **Module Path**: `./EKS_Module`

### EC2 Module (Bastion Server)
- **Purpose**: Deploys an EC2 instance as a bastion server for secure access and management of the EKS cluster.
- **Module Path**: `./EC2_Module`

## Configure Terraform Backend

- **Backend Configuration**: Terraform state files are stored in an S3 bucket to centralize the management of infrastructure state. This setup facilitates better collaboration and consistency across different environments by providing a shared and reliable state storage solution.

## How to Use

1. **Setup IAM Role**: Create an IAM Role on AWS and configure it with the necessary permissions.
2. **Configure Credentials**: Use the IAM credentials to authenticate Terraform.
3. **Initialize Terraform**: 
    ```bash
    terraform init
    ```
4. **Apply Configuration**: 
    ```bash
    terraform apply
    ```
5. **Destroy Configuration**: 
    ```bash
    terraform destroy
    ```
6. **Manage Infrastructure**: Use the Bastion Server to SSH into the EKS cluster for management.

## Summary

By leveraging Terraform’s modular approach and centralized state management, the infrastructure setup for the application is both robust and adaptable. This setup supports efficient deployment and management of resources, ensuring a scalable environment for the Book Library Management application.
