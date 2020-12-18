# did-jwt-vc-example
An example of how to do something with DID and VC


ECS setup
task definition, cluster in ECS, load balancer, ECS Service
https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html

aws ecs register-task-definition --region us-east-1 --cli-input-json file://./ecs-task-definition.json