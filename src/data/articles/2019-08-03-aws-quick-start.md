---
title: "AWS Beginner Quick Start Guide"
date: "2019-08-05 08:00"
path: /blog/aws-beginner-quick-start-guide
excerpt: An AWS quick start guide for beginners
tags: ["aws"]
---

AWS's endlessly growing amount of services and behemoth documentation can make getting started extremely intimidating and confusing. Some common questions that you might have are:
- Where do I start?
- How do I do X?
- Where do I find documentation on Y?
- How can I try service Z out without paying anything or much at all?
- Should I use this or that service for my application?

This guide helps to point you in the right direction to answer some of those questions. It will help:
- introduce you to the AWS ecosystem and common services
- build a starting foundation for you to build upon using best practices
- suggest important operations with a nudge towards documentation to get you familiar with common AWS services (links are provided)
- suggest resources vital to your development and operations of your applications

This guide will *not*:
- provide a step-by-step guide to building applications
- provide in-depth coverage of AWS services

Let's get to it.

## Create an Account

> Services involved: IAM

Start by creating an AWS account with a very strong password. This will create an account and a root user. The root user, by default, is granted full administrative privileges. Later on you'll create yourself another IAM user with less privileges and use the root user to manage that user's privileges.

### Enable MFA for the Root User

Immediately [enable MFA for the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html#enable-virt-mfa-for-root) to lock it down. You won't be using this user to perform anything other than managing your non-root user, account settings, [billing information](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-what-is.html), and billing notifications

## Create a Billing Alarm

> Services involved: CloudWatch and SNS

Create a [billing alarm](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#creating_billing_alarm_with_wizard) to get notified when your monthly bill exceeds an amount you configure. If you're testing out services that accrue charges and forget to stop and terminate the service it can continue to accrue charges without you knowing. Some examples include a running EC2 instance and data left stored in S3 and EBS.

CloudWatch will monitor your billing report and trigger SNS to notify you through email when the threshold is exceeded. Setting this up should help you feel relieved knowing that upon notification you can quickly log-in to the AWS Console to take action to prevent any further charges.

Remember, all services charge differently so [make sure you understand how the service charges money](https://aws.amazon.com/pricing/) before using it. Some services are free, others charge for what and how much you use, and others charge by how much time you use it for.

## Get Familiar with [IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)

> Services involved: IAM

IAM is the Identity and Access Management service that helps you securely control access to AWS resources. You use IAM to control who is authenticated (signed in) and authorized (has permissions) to use resources.

Everything you do in AWS will first be authorized by IAM. When you click a button in the AWS console, make an API request to AWS within your app, or send a CLI request it will first go through IAM to confirm you, or the person or application making the request, are authorized. It is easy to initially ignore IAM since it's not the most exciting service. However, don't do this. You'll quickly face headaches and errors trying to do the simplest things with other services. Nearly all services depend on IAM so learn it well.

### [Prioritize IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
AWS recommends a list of best practices to help secure your resources.

### Create a Non-Root User

Now that you know the basics of IAM, create another IAM user for yourself to use. Provide this user the minimum necessary IAM permissions to perform the tasks you need to perform. You can, however, provide this user the [AdministratorAccess](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_job-functions.html#jf_administrator) policy that grants administrative privileges but that essentially makes this user the root user.

## Take Advantage of the [Free-Tier](https://aws.amazon.com/free/) Offering
AWS offers some services for free forever, for a free-trial, and for the first 12-months of signing up. As a new user make sure to take advantage of all of these offerings, especially those that expire within 12 months.

## Utilize the various [tools](https://aws.amazon.com/tools/) to interact with AWS services

> Services involved: Console, CLI, and SDK

You can interact with AWS in three ways:
- through the AWS [Console](https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/getting-started.html) (ie, the web application at aws.amazon.com)
- through the AWS [CLI tool](https://aws.amazon.com/cli/)
- through the AWS SDK in your favorite programming language

### AWS Console Usage Suggestions
- great for beginners to get a feel for how AWS looks and feels
- great for visually interacting with AWS
- great for testing out services through a step-by-step user interace
- great for performing administrative tasks like those you can only perform within the Console
- not so great for automating tasks since operations are performed manually

### AWS CLI Usage Suggestions
- great for interacting with AWS through a shell
- great for automating tasks and achieving "Infrastructure as Code"
- great for CI/CD and DevOps

### AWS SDK Usage Suggestions
- great for interacting with AWS within application code

### Use [CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) Extensively

Creating applications on AWS most often requires using many resources together. Manually provisioning and configuring these resources is tedious and error prone. What if you could provide AWS a configuration file that declares the details of the resources you're trying to build including how they interact with each other? With CloudFormation, you can do this.

AWS CloudFormation takes care of provisioning and configuring resources for you. You don't need to individually create and configure AWS resources and figure out what's dependent on what. You provide a JSON or YML template and AWS CloudFormation handles all of that for you.

This concept of declaring infrastructure within declarative configuration files is called "[Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_code)" and it's worth investing time to pick up and use. Once you've got a feel for the AWS Console try switching over to using only CloudFormation. You'll no longer use the Console other than to use the GUI to *view* something or perform administrative tasks.

## Bookmark Essential AWS Documentation Reference
As an AWS user it's impossible to remember all the APIs, SDK functions, IAM policies, and CloudFormation resources and property types. Below are the essential documentation I suggest you bookmark for quick reference.
- [AWS Services Documentation](https://docs.aws.amazon.com/)- central hub for documentation on all AWS services
- [AWS CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/)- documentation on the AWS CLI
- [AWS SDK Reference](https://aws.amazon.com/tools/)- documentation on the various AWS SDK's
- [AWS Service ARNs and Namespaces](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html)- documentation on the Amazon Resource Names that uniquely identify AWS resources
- [IAM Policy Reference](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_actions-resources-contextkeys.html)- documentation on all IAM policies
- [Resource and Property Types Reference](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)- documentation for all resource and property types supported by CloudFormation

## Where to Next?
Follow the documentation depending on what you're trying to learn or achieve. Take what you've learned and start building. Refer back to your documentation bookmarks when you need clarification on a service. Here are some common AWS services you may be interested in investigating next:

- [AWS EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) is a compute service that offers virtual servers. Look into EC2 if you want work directly with a virtual server.
- [AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html) is an object storage service. You can use it to store nearly anthing from text files, to binary files, to pictures, to videos, and more.
- [AWS DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) is a NoSQL database service.
- [AWS RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html) is a SQL database service.
- [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) is a compute service that lets you run code without provisioning or managing servers (AKA server-less). Lambda's work well with RESTful API's and the Serverless framework.
- [AWS Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html) is a compute service that lets you deploy and manage applications without having to manage infrastructure. You simply upload your application, and the service handles the details of capacity provisioning, load balancing, scaling, and application health monitoring. This service is often compared to Heroku.
- [AWS ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html) is a container management service that makes it easy to run, stop, and manage Docker containers on a cluster. If you're interested in distributed Docker systems ECS may be of interest to you. Look into Fargate too!