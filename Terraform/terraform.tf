terraform {
backend "s3" {
  bucket         = "7erafy-bucket"
  key            = "terraform.tfstate"
  region         = "us-east-1"
}
}