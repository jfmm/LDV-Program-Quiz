# LDV-Program-Quiz
An app that tells you what learning programs you're elegibe for.

## Dependencies
1. **`Array.find()` method polyfill**: Because we need to support Internet Explorer, the `find()` method of the Array object prototype must be polyfilled. Right now the polyfill is included within the first part of `quiz-app.js`. If IE support is dropped, the polyfill code may be removed. 
2. **jQuery (Version 3.2.1 was used for development)**: make sure it is being loaded in the website. 

## How it works
The core components of this quiz are 3 major entities: data about the Programs, data about the Questions, and the Employee Class. 

### Program data
The `var PROGRAMS = []` array is the data structure used to create, update, and delete the different programs that LDV offers. The array contains a set of object literals that employ the following key-value-pair model:

```javascript
{
  id: 6, // <- Each program gets an ID number for easy access. This value is manually and arbitrarily assigned (for now). 
  name: "Emerging Women Leaders", // <- a string with the name of the program
  link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Emerging%20Women%20Leaders.aspx" // <- a string with the URL of the program webpage.
}
```
### Question data
he `var questions = []` array is the data structure used to create, update, and delete the different questions that the quiz asks the user. The array contains a set of object literals that employ the following key-value-pair model:

```javascript
{
  questionId: 1, // <- Each program gets an ID number for easy access. This value is manually and sequentially assigned.
  questionText:"First, what kind of Bank employee are you?", // <- A string with the text of the question that will be displayed on screen.
  answers : [
    "Staff",
    "Contractual"
  ],// <- an array with the options a user gets to answer the question. 
},
```
### The Employee Class
Given the different types of employees with shared attributes, prototypal inheritance was used to create an Employee class to instantiate needed Employee objects. The following is the class definition:

```javascript
/*
* Employee "Class" definition
*/

// constructor...
function Employee (type, courses) {
  this.type =  type; //type of contract
  this.courses = courses; //Array with course ID's numbers. These are the values assigned in the PROGRAMS array (See above).
}
```

#### Instantiating an Employee
In the application, the Employee objects are instantiated inside an Array. This lets us iterate over the data more easily during execution. Note that the porperty `Employee.courses` should be an array of numbers. Each number corresponds to the ID of a program in the PROGRAMS array.

```javascript
var employees = [
  new Employee("TTC", [0, 1]),
  new Employee("DTC", [0, 1,2,3,4, 7, 25]),
  new Employee("Technical", [0,1,2,3,4,5,6,7,8,9]),
  new Employee("Technical Supervisor", [0,1,2,3,4,5,6,7,8,9,10,11,12,13, 25]),
  new Employee("Managerial", [0, 1, 10, 11, 12,13, 22, 14,17,18,19, 22,23, 25]),
  new Employee("Support", [0,1,20,21, 25]),
];
```

## Adding the widget to a webpage
Follow these 3 easy steps:

**1. Make sure the CSS file (`styles.css`) is linked in the page.** The path to this resource will of course depend on the directory structure of your site. 

```html
 <link rel="stylesheet" type="text/css" href="yourSiteCSSFolder/styles.css">
```

**2. Make sure the JavaScript is loaded**, preferably before the closing `</body>` tag. You will have to load jQuery **before** `cmf.js`


```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="quiz-app.js"></script>
```

**3. Copy the HTML snippet into your webpage.** Basically copy and paste the entire `<section id="cmf-wrap">` into a container. Changing ID's and classes in the markup is not recommended as it will break the styles and functionality.
```html
<main id="yourContainer">
 
  <!-- copy and paste from here..-->
  <div class="quizCard">
  <div id="quiz-header">
    
    <p class="app-title">Which Programs am I elegible for?</p>
    <button onclick="initQuiz()" class="header-button">Reset</button>
 
  </div>
 <div id="quiz-question">

  </div>
 </div>
  <!-- ... to here-->

</main>
```
