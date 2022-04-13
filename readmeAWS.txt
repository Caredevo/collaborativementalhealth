
Login : 
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 567882099727.dkr.ecr.us-east-1.amazonaws.com

docker tag mentalhealth: 567882099727.dkr.ecr.us-east-1.amazonaws.com/mentalhealth:

docker push 567882099727.dkr.ecr.us-east-1.amazonaws.com/mentalhealth: