---
title: "Are You Leveraging Infrastructure as Code to Rapidly Deploy Applications?"
date: "2019-11-26 08:00"
path: /blog/leveraging-infrastructure-as-code-to-rapidly-deploy-applicaitons
excerpt: Use IaC to automate building and tearing down of infrastructure and eliminate error-prone human intervention.
tags: ["aws", "cloud", "devops"]
---

## The Complexities of Maintaining Infrastructure

Let's say you're building an application. You start as simple as possible. So you enter the AWS web console to provision a server. You spend a few days building your app and upload it to the server.

You realize you're missing a few things. You need a database and so you head to DynamoDB to create one. You need a custom domain too. You head to Route53 to purchase and set up a domain.

It turns out you have been doing a lot of manual work in the web console and on the server to get all the infrastructure provisioned and configured. Hopefully, you only need to perform these steps once.

Your app is now alive and well but things keep changing. You produce new versions of your app and old code on the server is replaced manually. You start adding more database tables. You adopt S3 to store images and videos. You even want to replicate this entire infrastructure as a testing environment.

Managing all these changes is getting really stressful. New infrastructure is being added and current infrastructure keeps updating. Changes are hard to track. Configuration management feels brittle.

How can this complexity of managing infrastructure be alleviated? By treating infrastructure as code.

## Infrastructure as Code

According to Wikipedia:

> Infrastructure as code (IaC) is the process of managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.

Infrastructure as code, or IaC, is the process of representing the desired state of infrastructure via code. As a software engineer, you develop an application through source code. Source code files define how the application works and a running instance of that code is the application.

## Definition Files

With IaC, you manage files that document what infrastructure is provisioned and how it is configured. For example, in AWS's CloudFormation service you write JSON or YAML files like this:

```
Resources:
  DDBTable:
    Type: AWS::DynamoDB::Table
    Properties:
      AttributeDefinitions:
        -
          AttributeName: "ArtistId"
          AttributeType: "S"
        -
          AttributeName: "Concert"
          AttributeType: "S"
      KeySchema:
        -
          AttributeName: "ArtistId"
          KeyType: "HASH"
        -
          AttributeName: "Concert"
          KeyType: "RANGE"
```

This is part of a very simplified CloudFormation snippet that describes a DynamoDB table and the schema for it. It's clear that the attributes should be strings and the primary key (the hash) is the `ArtistId` and the sort key (the range) is the `Concert`.

This file only shows a single resource but we could have easily described every resource we need for our application. This entire file can describe what we desire our infrastructure to be. All we have to do now is give it to AWS to do all the hard work.

## IaC is Documentation

There's a lot of pieces that come together to produce infrastructure. Without IaC it becomes a challenging task to summarize how the infrastructure is set up. It becomes even more of a headache when you have to explain it to someone else.

The definition files for the infrastructure are self-documenting. They can be easily understood for what and how a piece of infrastructure is to be provisioned and configured. A new engineer on the team could understand your entire infrastructure by glancing over the definition files. It's clear in the previous CloudFormation template that it defines a DynamoDB table and it's schema.

Structured files allow them to be easily understood but what can else we do with them?

## IaC Allows for Automation

Since IaC is just code it makes it a great fit for automating the tasks of provisioning and configuring infrastructure. Most cloud computing service providers have adopted IaC. When you provide AWS a CloudFormation template, the file is fed to an application that automates the provisioning of all the resources within it. No more human intervention. No more human error.

Now that infrastructure can be automatically provisioned with ease, setting up a develop, testing, staging, and production environment with similar infrastructure doesn't sound that hard to accomplish. A simple change to a single definition file can be easily propagated to all environments. All environments can then be consistent with each other.

Tearing down infrastructure is just as simple. A definition file identifies all the resources within the infrastructure that needs to be decommissioned.
Implementing IaC allows teams to automatically build and tear down infrastructure rapidly and at scale.

## IaC is Version Controlled

Since definition files are simple structured files, you version-control it like you would application source code. This enables your team to reap all the benefits of a version-control system. Version-controlling definition files:
- allow changes to them to go through a review, test, approval process before they are applied.
- allow you to view the changes made to infrastructure over time.
- allow reverting undesired changes back to a prior state.

## Conclusion

Infrastructure as code helps teams rapidly deploy applications at scale. Structured definition files provide detailed documentation of the infrastructure. Automating building and tearing down of infrastructure eliminates error-prone human intervention. Version-controlling these files enable teams to compare current infrastructure with potential infrastructure and allow them to revert back if the change is undesirable.

If you would like your environments to be well-documented, automated, consistent, and robust consider adopting IaC. There are plenty of solutions out there. There is:
- AWS CloudFormation
- Serverless Framework
- Hashicorp Terraform
- Google Cloud Deployment Manager
- Chef, Ansible, Puppet