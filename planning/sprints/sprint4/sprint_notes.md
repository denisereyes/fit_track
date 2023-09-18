so te# Sprint Meeting Notes

*note: replace anything surrounded by << >> and **remove** the << >>*

**Attended**: All Here

**DATE**: 4/04

***

## Sprint 3 Review

### SRS Sections Updated

- Testing
- Requirements
- Application diagrams

### User Story

None

### Sprint Requirements Attempted

- Account set up
- Send data from the frontend to the backend


### Completed Requirements

- Account set up

### Incomplete Requirements

- The api is able to create a new account and set up new account and put together a json object to send to the database container
- We are not able to send a request to the database container. There needs to be a flask app set up in the DB container so the api can send a post request.
  
### The summary of the entire project

- Using the api a user is able to setup a new account

***

## Sprint 4 Planning

## Requirements Flex

4/5 requirement flexes remaining

## Technical Debt

- None

### Requirement Target

- Calculate the daily calorie count API
- User Login - API/DB
- Account settings - API/DB

### User Stories

- User Information
- Tracking 

### Planning

- The first thing denise needs set up is the flask in the database container so the api and database containers can communicate
- While denise sets that up Itay will look into finding the right formula to calculate the correct calorie count based on the users information
- After completing those two we will make sure we can post a new user to the database
- Then we will being working on setting up the user login
  - We will need to allow a log in using a username and password
  - A database function will need to be created checking the username to the hash password
  - And api function in Auth will be set up to facilitate a call from the frontend
- Account settings
  - An Api call need to be set up to send updated information about a user
  - The database function needs to be set up to update the user

### Action Items

Set up flask in database container 
*Status: incomplete*

Set up a function that will calculate the daily calorie count 
*Status: complete*

Set up database functions to manage account settings, in order for the user to update their information. 
*Status: incomplete*

Set up API functions to manage account settings, in order for the user to update their information. 
*Status: complete*

Post a new user to the database from the api container.  
*Status: incomplete*

Set up API functions to login a user.
*Status: complete*

Set up DB functions to login a user.
*Status: incomplete*

### Issues and Risks

- Any potential bugs that could occur while building the containers 
- Time issues 

### Team Work Assignments

  - Itay
    - Calculating the calorie count
    - Setting up login function for the api
    - Setting up user update for the api
    - Setting up routes so the frontend can call on the api
    - 

- Denise 
    - Set up a create user function 
    - Set up a flask app in database container 
    - Set up database functions to manage account settings 
    - Set up a login function