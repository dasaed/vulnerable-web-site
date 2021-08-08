# WARNING: DO NOT COPY OR CLONE THIS REPO
The code and information in this repo was meant for a class assignment for a course at Memorial University of Newfoundland. 
Do not use this code for anything that is not authorized by Memorial University of Newfoundland. 

# Assignment 4, question 3

Website vulnerable to cross-site scripting

## Steps for carrying out the cross-site scripting attack
  * Steps 1 through 3 are just for setting up the page
  * Step 4 is just for testing purposes
  * Step 5 is where you can playing around and save any javascript code into the comments.csv file at the root of the directory

### Step 1
Install NodeJS

### Step 2
From the home directory of this project, run:
    npm install
    npm start

### Step 3
From the browser, open up localhost:8000

### Step 4 
Scroll down to the bottom of the page, and leave a comment

### Step 5
To create a XSS attack, under the comment section, insert the "malicious" javascript code.
**NOTE**: The javascript code must all be in the same line

## Why is the cross-site scripting attack possible for this website?
User's comments are stored in a local csv file on the computer hosting the server. 
When the index page is request, the csv is parsed into the main page and loads the comments for anyone to see.
However, there is no real user input data sanitization, so any one can leave a comment containing any arbitrary message.
This in turn leaves the door wide open for any attacker to inject their own malicious javascript code into the comment section and basically execute a cross-site scripting attack.
A very simple proof of concept example can be done by typing the following comment:
    <script>alert('You have been hacked!')</script>
Once this is done, any user that visits the message will get an alert message saying that they have been hacked.

**NOTE**: Double quotes cause issues with the parser, but using a tool like [JSFuck](http://www.jsfuck.com/) can easily bypass this issue.

## Citations
The few jokes mentioned in this repo came from https://www.helpsystems.com/blog/35-cybersecurity-jokes-make-any-security-geek-chuckle-or-groan
The template used in the sample page was obtained from the free examples in [https://github.com/twbs/bootstrap](https://github.com/twbs/bootstrap).
