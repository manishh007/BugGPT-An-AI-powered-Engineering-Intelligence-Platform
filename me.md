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

[x]Why doesn't the controller call the repository directly?
Because the service layer separates business logic from database logic. This keeps controllers thin, repositories focused on data access, and makes the application easier to maintain and test.

[x]Why set createdBy in the service instead of accepting it from the client?
Because client input cannot be trusted. The authenticated user's ID comes from the verified JWT (req.user), so setting createdBy in the service prevents users from impersonating others.

[x]Why is the creator added to members automatically?
Every project should include its creator as a member by default. This is a business rule, so it belongs in the service layer rather than the repository.

Why doesn't the controller access MongoDB directly?
Because controllers should only handle HTTP requests and responses. Database access belongs in the repository, while business rules belong in the service.

Q2. Why use req.user._id instead of accepting createdBy from the client?
The authenticated user's identity has already been verified by the JWT middleware. Using req.user._id prevents users from impersonating someone else.

Q3. Why return HTTP 201 for project creation?
201 Created is the standard HTTP status code indicating that a new resource has been successfully created.



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


