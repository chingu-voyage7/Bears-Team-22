#!/usr/bin/env node
import cdk = require("@aws-cdk/cdk");
import {KnowledgeStack} from "../lib/stack";

const app = new cdk.App();
new KnowledgeStack(app, "Knowledge");
app.run();
