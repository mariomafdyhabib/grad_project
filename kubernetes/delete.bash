#!/bin/bash

kubectl delete -f mongo.yaml
kubectl delete -f backend.yaml
kubectl delete -f frontend.yaml
kubectl delete -f mongo-express.yaml
kubectl delete -f ingress.yaml
kubectl delete -f nodeport.yaml
kubectl delete -f prometheus.yaml
kubectl delete -f grafana.yaml
kubectl delete -f ingress.yaml

#minikube stop