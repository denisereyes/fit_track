# Sprint Meeting Notes

*note: replace anything surrounded by << >> and **remove** the << >>*

**Attended**: All Here

**DATE**: April 11

***

## Sprint 4 Review

### SRS Sections Updated

User Interface

### User Story

None

### Sprint Requirements Attempted

- Calculate the daily calorie count API
- User Login - API/DB
- Account settings - API/DB

### Completed Requirements

- Calculate the daily calorie count API

### Incomplete Requirements

- Can't communicate between the API and DB
   
- User Login - API/DB
- Account settings - API/DB

### The summary of the entire project
Using the api a user can create an account.
Using the api a user can edit certain settings on their account: Goals, activity level, and unit type.
Using database functions so the user can edit certain settings on their account: goal, activityLvl, height
Using database functions to post a user to the database 
Using database functions to verify a users credentials

***

## Sprint 5 Planning

## Requirements Flex

3/5 requirement flexes remaining

## Technical Debt

- We need to be able to send data from the API to the Database container

### Requirement Target

- Send data from the API to the DB
- User login (Sessions & Frontend)
- Account set up (Frontend)
- Testing Classes

### User Stories

- User Information

### Planning

We need to establish a connection between the API and the DB container first. Once we do that we can start testing the API and DB functionality. We need to be able to do everything from the API first and then we can start developing the frontend and setting up the tests. 

### Action Items

Set up db create a user function that has all the information API is going to send to the backend
*Status: complete*

Set up test classes for the API to make sure every function does what it is supposed to 
*Status: incomplete*

Set up login sessions 
*Status: complete*
 
Add needed info for creating an account frontend
*Status: complete*

Create the login screen for a user
*Status: incomplete*

!!! Be able to send information from the API to the DB
*Status: incomplete* 

### Issues and Risks

- Any potential bugs that could occur while building the containers 
- Time issues 

### Team Work Assignments

Itay
- Set up login sessions
- Update account creation frontend
- Develop login screen
- Communication between API and DB

Denise 
- set up test classes 
- Communication between API and DB
- Ensure db has a concrete create user functionality
