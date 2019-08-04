# IAM

## Outline
- What is it
- Why use it
  - importance
- Why learn it
  - Who should use it

## References
- IAM: 

## What is IAM
IAM is an AWS service that manages identities and access to AWS resources. The "identity" part is the "who" within AWS. The "access" part is the "what" or the AWS resource an identity needs permission to access.

### Identity Management
An identity can be any of the following:
- a user
- a group of users
- a role

A user an an entity that can interact with AWS resources. A user accomplishes this through any of the following methods:
- the AWS Management Console, if you allow them to
- programmatically using the API, if you allow them to
- programmatically using the CLI, if you allow them to

A group is a collection of users that share the same permissions. A group cannot interact with AWS resources, it is simply a way to attach policies to multiple users at one time.

A role is an entity that contains one or more permissions. You assign roles to users or groups. We'll discuss what permissions are soon.

### Access Management
Access to AWS resources is managed by:
- policies
- permissions


## Conclusion

## Where to go to Next?

- Read the IAM [documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
- Read the IAM [best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)