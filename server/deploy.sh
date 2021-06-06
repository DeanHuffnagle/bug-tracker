#!/bin/bash

echo what should the version be?
read VERSION

docker build -t deanhuffnagle/workflo:$VERSION .
docker push deanhuffnagle/workflo:$VERSION 
ssh root@159.65.223.251 "docker pull deanhuffnagle/workflo:$VERSION && docker tag deanhuffnagle/workflo:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"  
