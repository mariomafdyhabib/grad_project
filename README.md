# 🎓 Grad Project Deployment – Full DevOps Pipeline on AWS

![Architecture Placeholder 1](./docs/architecture1.png)

## 🚀 Project Overview
Expand
README_generated.md
4 KB
﻿

![image](https://github.com/user-attachments/assets/729ae982-9395-4ce8-adfd-f5b2c7f4837e)


# 🎓 Grad Project Deployment – Full DevOps Pipeline on AWS

![Architecture Placeholder 1](./docs/architecture1.png)

## 🚀 Project Overview

This is a comprehensive full-stack DevOps project designed as a final graduation project. It demonstrates modern Infrastructure as Code, CI/CD pipelines, container orchestration, and Helm-based deployment on AWS.

The system deploys a **Next.js frontend**, **Node.js backend**, and **MongoDB database**, wrapped and deployed via Docker, Helm charts, and Kubernetes on AWS EKS. GitHub Actions automate testing, packaging, and deployment.

---

## 📐 Architecture Overview


```mermaid
graph TD
    A[GitHub Actions] --> B{CI/CD Pipelines}
    B --> C[Apply Pipeline]
    B --> D[Destroy Pipeline]
    B --> E[Helm Push Pipeline]
    
    C --> FF[Build]
    FF --> GA[Frontend]
    FF --> GB[Backend]

    C --> FG[Test]
    FG --> GC[Frontend]
    FG --> GD[Backend]

    C --> F[Terraform Apply]
    F --> G[AWS Infrastructure]
    G --> H[VPC]
    G --> I[EKS Cluster]
    G --> J[Security Groups]
    G --> K[IAM Roles]
    
    C --> L[Kubernetes Deployment]
    L --> M[Application Stack]
    M --> N[Frontend Pod]
    M --> O[Backend Pod]
    M --> P[MongoDB StatefulSet]
    M --> Q[Mongo Express Deployment]
    
    C --> R[Monitoring Setup]
    R --> S[Prometheus Stack]
    R --> T[Grafana]
    S --> U[Metrics Collection]
    T --> V[Dashboards]
    
    D --> W[Terraform Destroy]
    D --> X[K8s Resource Cleanup]
    D --> Y[Helm Uninstall]
    
    E --> Z[Package Helm Chart]
    E --> AA[Push to GitHub Registry]
    
    style A fill:#2088FF,color:white
    style B fill:#555,color:white
    style C fill:#34D058,color:black
    style D fill:#F85149,color:white
    style E fill:#FBCA04,color:black
    style G fill:#FF9900,color:black
    style M fill:#326CE5,color:white
    style R fill:#E535AB,color:white
    style Z fill:#FBCA04,color:black
    
    classDef pipeline fill:#f5f5f5,stroke:#333
    class C,D,E pipeline


## 🧾 Key Features

- **Full CI/CD** pipeline using GitHub Actions
- **Infrastructure as Code** with modular Terraform setup for VPC, EKS, EC2, SGs, and more
- **Dockerized apps**: frontend, backend, MongoDB, Mongo Express
- **Helm charts** to package and deploy the stack to EKS
- **Ingress and Services** for full service exposure
- **Secrets Management** via GitHub Secrets
- **Monitoring support** with Prometheus/Grafana (optional)

---

## 🗂️ Project Structure

```
grad_project-deployment/
│
├── Terraform/                  # IaC setup using Terraform
│   ├── VPC_Module/
│   ├── EKS_Module/
│   ├── NodeGroup_Module/
│   ├── EC2_Module/
│   └── SecurityGroup_Module/
│
├── .github/workflows/         # GitHub Actions (CI/CD, Helm Publish, Destroy)
├── app/                       # Helm chart for Kubernetes deployment
├── kubernetes/                # Raw Kubernetes manifests (alternative to Helm)
├── herafy-back-end/           # Node.js backend with Express + MongoDB
├── herafy-client/             # Next.js frontend with Tailwind CSS
└── docker-compose.yml         # Local development environment
```

---

## 🛠️ How to Execute

### 1. Clone the Repository
```bash
git clone https://github.com/your-user/grad_project-deployment.git
cd grad_project-deployment
```

---

### 2. Provision Infrastructure with Terraform
```bash
cd Terraform
terraform init
terraform apply
```

Ensure you configure your AWS credentials before running Terraform.

---

### 3. Deploy Helm Chart to EKS
```bash
helm upgrade --install my-full-app ./app -f ./app/values.yaml
```

---

### 4. Use GitHub Actions for CI/CD
Push to `deployment` branch to trigger CI/CD pipeline (`helm-publish.yml` and `ci.yml`).

Secrets required:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `GITHUB_TOKEN`

---

### 5. Local Development with Docker Compose
```bash
docker-compose up --build
```

---

## 🧰 Technologies Used

- Terraform
- AWS (EKS, EC2, VPC, IAM, etc.)
- Docker & Docker Compose
- Kubernetes
- Helm
- GitHub Actions
- Node.js (Backend)
- Next.js (Frontend)
- MongoDB & Mongo Express

---

## 📎 Notes

- Remember to install and configure `kubectl`, `aws-cli`, `terraform`, `helm`, and `docker` before execution.
- Customize `.env` and `values.yaml` for your environment.

---

## 📬 Contact

For questions or contributions, please reach out via GitHub issues or fork the repo.

README_generated.md
4 KB


