"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/cdk");
const ec2 = require("@aws-cdk/aws-ec2");
const ecs = require("@aws-cdk/aws-ecs");
class KnowledgeStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Create VPC and Fargate Cluster
        // NOTE: Limit AZs to avoid reaching resource quotas
        const vpc = new ec2.VpcNetwork(this, "KnowledgeVpc", {
            maxAZs: 2
        });
        const cluster = new ecs.Cluster(this, "KnowledgeCluster", { vpc });
        // Instantiate Fargate Service with just cluster and image
        const fargateService = new ecs.LoadBalancedFargateService(this, "KnowledgeService", {
            cluster,
            image: ecs.ContainerImage.fromAsset(this, "KnowledgeImage", {
                directory: ".."
            }),
            containerPort: 5000
        });
        // Output the DNS where you can access your service
        new cdk.Output(this, "LoadBalancerDNS", {
            value: fargateService.loadBalancer.dnsName
        });
    }
}
exports.KnowledgeStack = KnowledgeStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9DQUFxQztBQUNyQyx3Q0FBeUM7QUFDekMsd0NBQXlDO0FBRXpDLE1BQWEsY0FBZSxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzVDLFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM3RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixpQ0FBaUM7UUFDakMsb0RBQW9EO1FBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3BELE1BQU0sRUFBRSxDQUFDO1NBQ1QsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUM7UUFFakUsMERBQTBEO1FBQzFELE1BQU0sY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUNuRixPQUFPO1lBQ1AsS0FBSyxFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtnQkFDM0QsU0FBUyxFQUFFLElBQUk7YUFDZixDQUFDO1lBQ0YsYUFBYSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsbURBQW1EO1FBQ25ELElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDdkMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxZQUFZLENBQUMsT0FBTztTQUMxQyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Q7QUF6QkQsd0NBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNkayA9IHJlcXVpcmUoXCJAYXdzLWNkay9jZGtcIik7XG5pbXBvcnQgZWMyID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1lYzJcIik7XG5pbXBvcnQgZWNzID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1lY3NcIik7XG5cbmV4cG9ydCBjbGFzcyBLbm93bGVkZ2VTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG5cdGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQXBwLCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG5cdFx0c3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cblx0XHQvLyBDcmVhdGUgVlBDIGFuZCBGYXJnYXRlIENsdXN0ZXJcblx0XHQvLyBOT1RFOiBMaW1pdCBBWnMgdG8gYXZvaWQgcmVhY2hpbmcgcmVzb3VyY2UgcXVvdGFzXG5cdFx0Y29uc3QgdnBjID0gbmV3IGVjMi5WcGNOZXR3b3JrKHRoaXMsIFwiS25vd2xlZGdlVnBjXCIsIHtcblx0XHRcdG1heEFaczogMlxuXHRcdH0pO1xuXHRcdGNvbnN0IGNsdXN0ZXIgPSBuZXcgZWNzLkNsdXN0ZXIodGhpcywgXCJLbm93bGVkZ2VDbHVzdGVyXCIsIHt2cGN9KTtcblxuXHRcdC8vIEluc3RhbnRpYXRlIEZhcmdhdGUgU2VydmljZSB3aXRoIGp1c3QgY2x1c3RlciBhbmQgaW1hZ2Vcblx0XHRjb25zdCBmYXJnYXRlU2VydmljZSA9IG5ldyBlY3MuTG9hZEJhbGFuY2VkRmFyZ2F0ZVNlcnZpY2UodGhpcywgXCJLbm93bGVkZ2VTZXJ2aWNlXCIsIHtcblx0XHRcdGNsdXN0ZXIsXG5cdFx0XHRpbWFnZTogZWNzLkNvbnRhaW5lckltYWdlLmZyb21Bc3NldCh0aGlzLCBcIktub3dsZWRnZUltYWdlXCIsIHtcblx0XHRcdFx0ZGlyZWN0b3J5OiBcIi4uXCJcblx0XHRcdH0pLFxuXHRcdFx0Y29udGFpbmVyUG9ydDogNTAwMFxuXHRcdH0pO1xuXG5cdFx0Ly8gT3V0cHV0IHRoZSBETlMgd2hlcmUgeW91IGNhbiBhY2Nlc3MgeW91ciBzZXJ2aWNlXG5cdFx0bmV3IGNkay5PdXRwdXQodGhpcywgXCJMb2FkQmFsYW5jZXJETlNcIiwge1xuXHRcdFx0dmFsdWU6IGZhcmdhdGVTZXJ2aWNlLmxvYWRCYWxhbmNlci5kbnNOYW1lXG5cdFx0fSk7XG5cdH1cbn0iXX0=