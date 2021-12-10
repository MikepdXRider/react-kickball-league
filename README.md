# Rubrik 
- A user can create a new team
- A user can select a team from the list view and update them
- A user can select a team from the list view and delete them
- A user can create a new player
- A user can select a player from the list view and update them
- A user can select a player from the list view and delete them
- Each view & component has an associated test


# Getting started
Making a Plan 
1. Make a drawing of your app. Simple "wireframes"
2. Once you have a drawing, name the HTML elements you'll need to realize your vision
3. For each HTML element ask: Why do I need this?
4. Once we know _why_ we need each element, think about how to implement the "Why" as a "How"
5. Is there some state we need to initialize?
6. Find all the 'events' (user clicks, form submit, page loads, etc) in your app. Ask one by one, "What happens when" for each of these events. Does any state change?
7. Think about how to validate each of your steps.
8. Consider your data model. What objects will you be using? What are the key/value pairs? What arrays do you need? What needs to live in local storage?
9. Consider what features _depend_ on what other features. Use this dependency logic to figure out what order to complete tasks.


# Plan
- ✔ A user can create a new team
    - Wireframe: N/A. createTeam Views component. TeamForm component(takes in optional team data, and a handleSubmit fn as props).
    - HTML: (TeamForm Component)Form as container, inputs as user inputs(some required), submit button/input, fieldset for cool form box, legend for cool form title.
    - State: useState hook for each user input. 
    - Events: 
        - User types into input fields -> update state. 
        - User clicks submit -> handleSubmit fn to perform a call to the to add players to the DB and redirect the user to the new team page.
    - Validation: Test behavior via console.log and mocking the service using MSW(Mock Service Worker).
    - Data model: ```{ Name, City, State }```
    - Features that rely on features: None. 
- ✔ A user can select a team from the list view and update them
    - Wireframe: N/A. TeamDetails Views. TeamForm component(takes in optional team data, and a handleSubmit fn as props)
    - HTML: (Reuse TeamForm Component) Form as container, inputs as user inputs(some required), submit button/input, fieldset for cool form box, legend for cool form title.
    - State: useState hook for each user input. 
    - Events: 
        - Page load, set value of inputs. 
        - User types into input fields -> update state. 
        - User clicks submit -> handleSubmit fn to perform a call to the to add players to the DB and redirect the user to the new team page.
    - Validation: Test behavior via console.log and mocking the service using MSW(Mock Service Worker).
    - Data model: ```{ Name, City, State }```
    - Features that rely on features: None. 
- ✔ A user can select a team from the list view and delete them
    - Wireframe: N/A. TeamDetails Views. 
    - HTML: Button for deleting team.
    - State: N/A.
    - Events: 
        - User click delete -> prompt the user to confirm deletion.
        - On truthy input of user prompt -> call handleDelete fn to remove the team from the DB.
    - Validation: Test behavior via console.log and mocking the service using MSW(Mock Service Worker).
    - Data Model: N/A
    - Features that rely on other features: N/A.
- ✔ A user can create a new player
    - A version of the teamsComponent and plan. 
- ✔ A user can select a player from the list view and update them
    - A version of the teamsComponent and plan. 
- ✔ A user can select a player from the list view and delete them
    - A version of the teamsComponent and plan. 
- Each view & component has an associated test
    - Heck'n heck yeah, sister! 

## Additional functionality:
- Form validation -> Which input tags should be required and not? 
- PropTypes validation -> Which props/params should be required and not? 