Instead of AI Bug Tracker We define it as :

"BugGPT" is an AI-powered engineering intelligence platform that helps software teams analyze, categorize, prioritize, and understand software bugs while providing debugging guidance and engineering insights.

who will use this:
Admin
Tester
Developer

Tester -> Creates Bug -> Backend -> AI Analysis -> Database -> Developer -> Fixes Bug -> Manager sees analytics

Before coding we freeze Version 1.

Otherwise projects become endless.

Authentication

✅ Signup

✅ Login

✅ JWT


<!-- Projects -->

Create project

Delete project

View project


<!-- Bugs -->

Create

Update

Delete

Assign

Search

Filter

Status

Priority


<!-- AI -->

Categorize

Severity

Root Cause

Checklist

Weekly Summary


<!-- Analytics -->

Dashboard

Bug Trends

Critical Bugs

Resolution Time


This is Version 1.

No more features.


no different try catch but a global try catch





































**********************************************************************************************************************************************************

## INTERVIEW QUESTIONS

[x] Why create a custom ApiError class?
It lets us include additional information (like HTTP status codes) with errors and keeps error responses consistent.

[x]Why use an asyncHandler?
It catches errors from asynchronous controllers automatically, so we don't repeat try/catch blocks everywhere.

[x]Why register notFound before errorHandler?
Unknown routes should first become a 404 error, and then the error handler formats the response.



**********************************************************************************************************************************************************


## here is the 1st user created

{
  "name": "Developer1",
  "email": "developer1@example.com",
  "password": "password123",
  "role": "Developer"
}


## this was the response 

{
    "success": true,
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNmI5MjIxNjVkZDYxZTAyZTFlOGE1OSIsImlhdCI6MTc4NTQzNDY1OCwiZXhwIjoxNzg2MDM5NDU4fQ.Fy8yTxmt0RLNAs7AZH_3Ez1zVJoxla8JWtbHtXhAHe4",
    "data": {
        "id": "6a6b922165dd61e02e1e8a59",
        "name": "Developer1",
        "email": "developer1@example.com",
        "role": "Developer"
    }
}


