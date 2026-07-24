User
 │
 │ 1
 │
 │
 ├───────────────∞ Projects
 │
 │
 └───────────────∞ Bugs


Project
 │
 │1
 │
 └──────────────∞ Bugs


Bug
 │
 ├──────────────∞ Comments
 │
 ├──────────────1 AIAnalysis
 │
 └──────────────∞ ActivityLogs



 ## User

Purpose

Stores all users of BugGPT.

Fields

- _id
- name
- email
- password
- role
- avatar
- createdAt
- updatedAt

Role values

- Admin
- Developer
- Tester



## Project

Purpose

Represents one software project.

Fields

- _id
- name
- description
- createdBy
- members
- status
- createdAt


## Bug

Fields

- title
- description
- project
- reporter
- assignedTo
- priority
- severity
- category
- status
- screenshots
- aiAnalysis
- createdAt
- updatedAt