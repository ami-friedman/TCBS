# Three Category Budget System

# High Level Requirements

## User Management
The system should allow the user to register, login securly and edit his account information

## Budget System Management

As a home owner I need to be able to manage my budget on a monthly bases. 
For managing a budget, we need to take 4 components into account:
1. Income
2. Expenses
3. Budget
4. Month's End (balance sheet)

## Income
Allow the user to create a forcast income chart to be used for creating the budget. 
Allow the user to create an income chart every month by re-using the forcast income chart as a tsarting template. 
Every income item consists of 2 peices of data:
1. Name of the income
2. Amount of the income

The user should be able to create, view, and edit her forcast income and monthly income

## Budget
In this system the budget items can belong to one of three categories:
1. Category 1: Paid by cash on a monthly basis
2. Category 2: Monthly pay out and can be done by check, money transfer or credit card
3. Category 3: Pay outs are less frequent than once a month but must be accounted for (set aside money) every month

When the user first starts the program he needs to establish his monthly budget. 
The user should be able to create, view and edit this budget

Future feature: allow user to import a csv/xml etc. with expenses and add them to his budget with a click of a butten

## Expenses
Allow the user to create a monthly expense report which refers to the above mentioned 3 cartegories. Every expense report must be based on the corresponding category in the Budget. 
Therefore, the creation of the monthly expense starts with the items from the budget. A user **cannot** add an item to the expense report without adding it first to the budget. 
The expense report should have 4 columns:
1. Expense name (taken from the budget)
2. Budgeted amonut (taken from the budget)
3. Actual amount (manual input)
4. Deficit/Surplues between item 1 and 2 (calculated amount)

## Months End 
Allow the user to bring all the peices together and generate a proper balance report for the current month:
1. Total income
2. Total Expenses
3. Decficit/Surplus

The user should be able to click through the total and get a breakdown of the items
Toggling between months should be via dropdown menu

## Screens
 - Registration Form
 - Login Form
 - Landing Page
 - Budget Management
 - Expense Report Management
 - Income Management
 - Months End Reports

Navigation between screens should be via the navbar 

#### Registration
 - First name
 - Last name
 - e-mail
 - Password
 - Confirm password
 
#### Login
 - E-mail
 - Password

#### Landing Page
 - Snippet/Card of the last month's end report
 - Snippet/Card of in progress month's end report

#### Budget Management
Layout hould support the 3 category concept by using a tab for each category
There are a few states to take into account for this screen.
1. First time user: 
    - Screen 1 - Show 
        - Prsent the option to create a new budget in each tab
    - Screen 2 - Create
        - Present a form to create a new budget 
2. Existing user: 
    - Screen 1 - Show: 
        - Present a table with name and amount of each item 
        - An edit button leading to a new form
    - Screen 2 - Edit
        - Present a from-like table to edit the items
        - A Save/Update button at the bottom of the page leading to screen 1

#### Expense Management
Layout hould support the 3 category concept by using a tab for each category
There are a few states to take into account for this screen.
1. First time expense: 
     - Screen 1 - Show 
        - Prsent the option to create a new expense in each tab
    - Screen 2 - Create
        - Present a form-like table pre-populated with information from the budget and ability to insert amount
2. Existing expense: 
    - Screen 1 - Show: 
        - Present a table with the above mentioned columns
        - An edit button leading to a new form
    - Screen 2 - Edit
        - Present a from-like table preloaded with already existing data. Allow user to edit the "actual amount" column 
        - A Save/Update button at the bottom of the page leading to Screen 1

Toggling between months of expenses should be via dropdown menu

#### Income Management
1. First time income 
    - Screen 1 - Show 
        - Prsent the option to create a new forecast income
    - Screen 2 - Create
        - Present a form-like table to create the income report
2. Monthly income
    - Screen 1 - Show
        - A table with preloaded data from the forecast income
        - An edit button leading to the Edit page
    - Screen 2 - Edit
        - A table with preloaded data from this month's input
        - A Save/Update button leading to Screen 1

#### Month's End Management
1. First time months end: Prsent the option to generate a new months end report
2. Existing months end: Present the option to re-generate the months end report

The months end report will be balance sheet table:
1. Row 1-3 on the left: Expesnes of each category for that month
2. ROw 1 on the right: Total income for that month
3. Total row: Show total of difference (red with minus of deficift, or green with plus for surplus)









