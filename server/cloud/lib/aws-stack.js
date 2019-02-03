"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/cdk");
const ec2 = require("@aws-cdk/aws-ec2");
const ecs = require("@aws-cdk/aws-ecs");
const elbv2 = require("@aws-cdk/aws-elasticloadbalancingv2");
const { ApplicationProtocol } = elbv2;
// import path = require("path");
class KnowledgeStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Create VPC and Fargate Cluster
        const vpc = new ec2.VpcNetwork(this, "FargateVPC", {
            maxAZs: 1
        });
        const cluster = new ecs.Cluster(this, "KnowledgeCluster", { vpc });
        // Configure cluster auto-scaling
        // cluster.addDefaultAutoScalingGroupCapacity({
        // 	instanceType: new ec2.InstanceType("t2.nano"),
        // 	instanceCount: 4,
        // });
        // Create task definition
        const fargateTaskDefinition = new ecs.FargateTaskDefinition(this, "FargateTaskDef", {
            memoryMiB: "512",
            cpu: "256"
        });
        // Create container from local `Dockerfile`
        const knowledgeContainer = fargateTaskDefinition.addContainer("KnowledgeContainer", {
            image: ecs.ContainerImage.fromAsset(this, "KnowledgeImage", {
                directory: ".."
            })
        });
        // Set port mapping
        knowledgeContainer.addPortMappings({
            containerPort: 5000
        });
        // Create container from DockerHub image
        const mongoContainer = fargateTaskDefinition.addContainer("MongoContainer", {
            image: ecs.ContainerImage.fromDockerHub("mongo")
        });
        // Set port mapping
        mongoContainer.addPortMappings({
            containerPort: 27017,
            hostPort: 27017
        });
        // Create service
        const service = new ecs.FargateService(this, "KnowledgeService", {
            cluster,
            taskDefinition: fargateTaskDefinition,
            desiredCount: 2
        });
        // Configure task auto-scaling		
        const scaling = service.autoScaleTaskCount({
            maxCapacity: 5
        });
        scaling.scaleOnCpuUtilization("CpuScaling", {
            targetUtilizationPercent: 70
        });
        // Create service with built-in load balancer
        const loadBalancer = new elbv2.ApplicationLoadBalancer(this, "KnowledgeLB", {
            vpc,
            internetFacing: true
        });
        // Create a listener and listen to incoming requests
        const listener = loadBalancer.addListener("Listener", {
            port: 5000,
            protocol: ApplicationProtocol.Http
        });
        listener.addTargets("KnowledgeServiceTarget", {
            port: 5000,
            protocol: ApplicationProtocol.Http,
            targets: [service]
        });
        // Output the DNS where you can access your service
        new cdk.Output(this, "LoadBalancerDNS", {
            value: loadBalancer.dnsName
        });
    }
}
exports.KnowledgeStack = KnowledgeStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXdzLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQXFDO0FBQ3JDLHdDQUF5QztBQUN6Qyx3Q0FBeUM7QUFDekMsNkRBQThEO0FBRTlELE1BQU0sRUFBQyxtQkFBbUIsRUFBQyxHQUFHLEtBQUssQ0FBQztBQUVwQyxpQ0FBaUM7QUFFakMsTUFBYSxjQUFlLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDNUMsWUFBWSxLQUFjLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzdELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLGlDQUFpQztRQUNqQyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNsRCxNQUFNLEVBQUUsQ0FBQztTQUNULENBQUMsQ0FBQztRQUNILE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDO1FBRWpFLGlDQUFpQztRQUNoQywrQ0FBK0M7UUFDL0Msa0RBQWtEO1FBQ2xELHFCQUFxQjtRQUNyQixNQUFNO1FBRVAseUJBQXlCO1FBQ3pCLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxHQUFHLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ25GLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEdBQUcsRUFBRSxLQUFLO1NBQ1YsQ0FBQyxDQUFDO1FBRUgsMkNBQTJDO1FBQzNDLE1BQU0sa0JBQWtCLEdBQUcscUJBQXFCLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFO1lBQ25GLEtBQUssRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBQzNELFNBQVMsRUFBRSxJQUFJO2FBQ2YsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUNILG1CQUFtQjtRQUNuQixrQkFBa0IsQ0FBQyxlQUFlLENBQUM7WUFDbEMsYUFBYSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsd0NBQXdDO1FBQ3hDLE1BQU0sY0FBYyxHQUFHLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMzRSxLQUFLLEVBQUUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1NBQ2hELENBQUMsQ0FBQztRQUNILG1CQUFtQjtRQUNuQixjQUFjLENBQUMsZUFBZSxDQUFDO1lBQzlCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLFFBQVEsRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsaUJBQWlCO1FBQ2pCLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDaEUsT0FBTztZQUNQLGNBQWMsRUFBRSxxQkFBcUI7WUFDckMsWUFBWSxFQUFFLENBQUM7U0FDZixDQUFDLENBQUM7UUFFSCxnQ0FBZ0M7UUFDaEMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1lBQzFDLFdBQVcsRUFBRSxDQUFDO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRTtZQUMzQyx3QkFBd0IsRUFBRSxFQUFFO1NBQzVCLENBQUMsQ0FBQztRQUVILDZDQUE2QztRQUM3QyxNQUFNLFlBQVksR0FBRyxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQzNFLEdBQUc7WUFDSCxjQUFjLEVBQUUsSUFBSTtTQUNwQixDQUFDLENBQUM7UUFFSCxvREFBb0Q7UUFDcEQsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUU7WUFDckQsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsbUJBQW1CLENBQUMsSUFBSTtTQUNsQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFO1lBQzdDLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLG1CQUFtQixDQUFDLElBQUk7WUFDbEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQ2xCLENBQUMsQ0FBQztRQUVILG1EQUFtRDtRQUNuRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ3ZDLEtBQUssRUFBRSxZQUFZLENBQUMsT0FBTztTQUMzQixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Q7QUFoRkQsd0NBZ0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNkayA9IHJlcXVpcmUoXCJAYXdzLWNkay9jZGtcIik7XG5pbXBvcnQgZWMyID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1lYzJcIik7XG5pbXBvcnQgZWNzID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1lY3NcIik7XG5pbXBvcnQgZWxidjIgPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLWVsYXN0aWNsb2FkYmFsYW5jaW5ndjJcIik7XG5cbmNvbnN0IHtBcHBsaWNhdGlvblByb3RvY29sfSA9IGVsYnYyO1xuXG4vLyBpbXBvcnQgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5leHBvcnQgY2xhc3MgS25vd2xlZGdlU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuXHRjb25zdHJ1Y3RvcihzY29wZTogY2RrLkFwcCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuXHRcdHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG5cdFx0Ly8gQ3JlYXRlIFZQQyBhbmQgRmFyZ2F0ZSBDbHVzdGVyXG5cdFx0Y29uc3QgdnBjID0gbmV3IGVjMi5WcGNOZXR3b3JrKHRoaXMsIFwiRmFyZ2F0ZVZQQ1wiLCB7XG5cdFx0XHRtYXhBWnM6IDFcblx0XHR9KTtcblx0XHRjb25zdCBjbHVzdGVyID0gbmV3IGVjcy5DbHVzdGVyKHRoaXMsIFwiS25vd2xlZGdlQ2x1c3RlclwiLCB7dnBjfSk7XG5cblx0XHQvLyBDb25maWd1cmUgY2x1c3RlciBhdXRvLXNjYWxpbmdcblx0XHRcdC8vIGNsdXN0ZXIuYWRkRGVmYXVsdEF1dG9TY2FsaW5nR3JvdXBDYXBhY2l0eSh7XG5cdFx0XHQvLyBcdGluc3RhbmNlVHlwZTogbmV3IGVjMi5JbnN0YW5jZVR5cGUoXCJ0Mi5uYW5vXCIpLFxuXHRcdFx0Ly8gXHRpbnN0YW5jZUNvdW50OiA0LFxuXHRcdFx0Ly8gfSk7XG5cblx0XHQvLyBDcmVhdGUgdGFzayBkZWZpbml0aW9uXG5cdFx0Y29uc3QgZmFyZ2F0ZVRhc2tEZWZpbml0aW9uID0gbmV3IGVjcy5GYXJnYXRlVGFza0RlZmluaXRpb24odGhpcywgXCJGYXJnYXRlVGFza0RlZlwiLCB7XG5cdFx0XHRtZW1vcnlNaUI6IFwiNTEyXCIsXG5cdFx0XHRjcHU6IFwiMjU2XCJcblx0XHR9KTtcblxuXHRcdC8vIENyZWF0ZSBjb250YWluZXIgZnJvbSBsb2NhbCBgRG9ja2VyZmlsZWBcblx0XHRjb25zdCBrbm93bGVkZ2VDb250YWluZXIgPSBmYXJnYXRlVGFza0RlZmluaXRpb24uYWRkQ29udGFpbmVyKFwiS25vd2xlZGdlQ29udGFpbmVyXCIsIHtcblx0XHRcdGltYWdlOiBlY3MuQ29udGFpbmVySW1hZ2UuZnJvbUFzc2V0KHRoaXMsIFwiS25vd2xlZGdlSW1hZ2VcIiwge1xuXHRcdFx0XHRkaXJlY3Rvcnk6IFwiLi5cIlxuXHRcdFx0fSlcblx0XHR9KTtcblx0XHQvLyBTZXQgcG9ydCBtYXBwaW5nXG5cdFx0a25vd2xlZGdlQ29udGFpbmVyLmFkZFBvcnRNYXBwaW5ncyh7XG5cdFx0XHRjb250YWluZXJQb3J0OiA1MDAwXG5cdFx0fSk7XG5cdFx0XG5cdFx0Ly8gQ3JlYXRlIGNvbnRhaW5lciBmcm9tIERvY2tlckh1YiBpbWFnZVxuXHRcdGNvbnN0IG1vbmdvQ29udGFpbmVyID0gZmFyZ2F0ZVRhc2tEZWZpbml0aW9uLmFkZENvbnRhaW5lcihcIk1vbmdvQ29udGFpbmVyXCIsIHtcblx0XHRcdGltYWdlOiBlY3MuQ29udGFpbmVySW1hZ2UuZnJvbURvY2tlckh1YihcIm1vbmdvXCIpXG5cdFx0fSk7XG5cdFx0Ly8gU2V0IHBvcnQgbWFwcGluZ1xuXHRcdG1vbmdvQ29udGFpbmVyLmFkZFBvcnRNYXBwaW5ncyh7XG5cdFx0XHRjb250YWluZXJQb3J0OiAyNzAxNyxcblx0XHRcdGhvc3RQb3J0OiAyNzAxN1xuXHRcdH0pO1xuXG5cdFx0Ly8gQ3JlYXRlIHNlcnZpY2Vcblx0XHRjb25zdCBzZXJ2aWNlID0gbmV3IGVjcy5GYXJnYXRlU2VydmljZSh0aGlzLCBcIktub3dsZWRnZVNlcnZpY2VcIiwge1xuXHRcdFx0Y2x1c3Rlcixcblx0XHRcdHRhc2tEZWZpbml0aW9uOiBmYXJnYXRlVGFza0RlZmluaXRpb24sXG5cdFx0XHRkZXNpcmVkQ291bnQ6IDJcblx0XHR9KTtcblxuXHRcdC8vIENvbmZpZ3VyZSB0YXNrIGF1dG8tc2NhbGluZ1x0XHRcblx0XHRjb25zdCBzY2FsaW5nID0gc2VydmljZS5hdXRvU2NhbGVUYXNrQ291bnQoe1xuXHRcdFx0bWF4Q2FwYWNpdHk6IDVcblx0XHR9KTtcblx0XHRzY2FsaW5nLnNjYWxlT25DcHVVdGlsaXphdGlvbihcIkNwdVNjYWxpbmdcIiwge1xuXHRcdFx0dGFyZ2V0VXRpbGl6YXRpb25QZXJjZW50OiA3MFxuXHRcdH0pO1xuXG5cdFx0Ly8gQ3JlYXRlIHNlcnZpY2Ugd2l0aCBidWlsdC1pbiBsb2FkIGJhbGFuY2VyXG5cdFx0Y29uc3QgbG9hZEJhbGFuY2VyID0gbmV3IGVsYnYyLkFwcGxpY2F0aW9uTG9hZEJhbGFuY2VyKHRoaXMsIFwiS25vd2xlZGdlTEJcIiwge1xuXHRcdFx0dnBjLFxuXHRcdFx0aW50ZXJuZXRGYWNpbmc6IHRydWVcblx0XHR9KTtcblx0XHRcblx0XHQvLyBDcmVhdGUgYSBsaXN0ZW5lciBhbmQgbGlzdGVuIHRvIGluY29taW5nIHJlcXVlc3RzXG5cdFx0Y29uc3QgbGlzdGVuZXIgPSBsb2FkQmFsYW5jZXIuYWRkTGlzdGVuZXIoXCJMaXN0ZW5lclwiLCB7XG5cdFx0XHRwb3J0OiA1MDAwLFxuXHRcdFx0cHJvdG9jb2w6IEFwcGxpY2F0aW9uUHJvdG9jb2wuSHR0cFxuXHRcdH0pO1xuXHRcdGxpc3RlbmVyLmFkZFRhcmdldHMoXCJLbm93bGVkZ2VTZXJ2aWNlVGFyZ2V0XCIsIHtcblx0XHRcdHBvcnQ6IDUwMDAsXG5cdFx0XHRwcm90b2NvbDogQXBwbGljYXRpb25Qcm90b2NvbC5IdHRwLFxuXHRcdFx0dGFyZ2V0czogW3NlcnZpY2VdXG5cdFx0fSk7XG5cblx0XHQvLyBPdXRwdXQgdGhlIEROUyB3aGVyZSB5b3UgY2FuIGFjY2VzcyB5b3VyIHNlcnZpY2Vcblx0XHRuZXcgY2RrLk91dHB1dCh0aGlzLCBcIkxvYWRCYWxhbmNlckROU1wiLCB7XG5cdFx0XHR2YWx1ZTogbG9hZEJhbGFuY2VyLmRuc05hbWVcblx0XHR9KTtcblx0fVxufSJdfQ==