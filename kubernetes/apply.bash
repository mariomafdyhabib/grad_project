#!/bin/bash

#minikube start

kubectl apply -f mongo.yaml
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml
kubectl apply -f mongo-express.yaml
kubectl apply -f ingress.yaml
kubectl apply -f nodeport.yaml
kubectl apply -f prometheus.yaml
kubectl apply -f grafana.yaml
kubectl apply -f ingress.yaml

#minikube dashboard