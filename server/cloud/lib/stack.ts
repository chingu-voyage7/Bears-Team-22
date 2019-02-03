import cdk = require("@aws-cdk/cdk");
import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");

export class KnowledgeStack extends cdk.Stack {
	constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Create VPC and Fargate Cluster
		// NOTE: Limit AZs to avoid reaching resource quotas
		const vpc = new ec2.VpcNetwork(this, "KnowledgeVpc", {
			maxAZs: 2
		});
		const cluster = new ecs.Cluster(this, "KnowledgeCluster", {vpc});

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