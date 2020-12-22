# did-jwt-vc-example
An example of how to create a DID for an issuer and subject and create a VC to say that the
subject is over 18 years old.

## Demo
http://did-jwt-vc-example-lb-1347369287.us-east-1.elb.amazonaws.com

<img src="/docs/page.png" align="middle" width="900" >

## Dev
Make sure to have an .env file in the root folder of the project with the required parameters set

```
cp template.env .env
```
e.g.
```
ISSUER_ADDRESS=0x0000000000000000000000000000000000000000
ISSUER_PRIVATE_KEY=0000000000000000000000000000000000000000000000000000000000000000
INFURA_URI=https://ropsten.infura.io/v3/00000000000000000000000000000000
```
To run app, server with SSR
```
npm install
npm start
```
Optional: to run react webpack dev server in additon to server
```
npm run start:fe
```

### local docker testing
`docker build --pull --rm -f "Dockerfile" -t didjwtvcexample:latest "."`

`docker run -d -p 5000:5000 didjwtvcexample:latest`

### Deployment notes
ECS setup reference 
https://medium.com/javascript-in-plain-english/deploy-your-node-app-to-aws-container-service-via-github-actions-build-a-pipeline-c114adeb8903
https://dev.to/rubiin/docker-pipeline-with-typescript-express-for-production-20kc

task definition, cluster in ECS, load balancer, ECS Service https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html

`aws ecs register-task-definition --region us-east-1 --cli-input-json file://./ecs-task-definition.json`
