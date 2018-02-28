/*------------------------------------------------------------------------------------------------------------------
* JS for Quiz Application:
* "Which Programs am I elegible for?"
* URL: https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Which%20Program%20are%20you%20eligible%20for.aspx
-------------------------------------------------------------------------------------------------------------------*/
/*
Array Find method polyfill
*/
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}


/*-------------------------*/
//JSON with program data.
/*-------------------------*/

var PROGRAMS = [
	
	//TTC Elegible
	{id: 0, name: "Career Services", link: "http://hrd.iadb.org/careerandlearning/careerservices/tabid/13791/language/en-us/default.aspx"},
	{id: 1, name: "Language and Culture", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Language%20and%20Culture.aspx"},
	
	//DTC elegible
	{id: 2, name: "High Impact Presentations", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Communication%20Skills.aspx"},
	{id: 3, name: "Advanced Presentation skills", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Communication%20Skills.aspx"},
	{id: 4, name: "Client Engagement", link: null},
  {id: 25, name: "English Business Writing", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Communication%20Skills.aspx"},

	//Technical Track
	{id: 5, name: "Team Leadership", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Team%20Leadership%20Program.aspx"},
	{id: 6, name: "Emerging Women Leaders", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Emerging%20Women%20Leaders.aspx"},
	{id: 7, name: "Negotiation and Conflict Management", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Negotiation%20%20Conflict%20Management.aspx"},
	{id: 8, name: "Advanced Negotiation Skills", link: null},
	{id: 9, name: "Harvard Manage Mentor Online Learning", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Harvard%20MangeMentor%20Online.aspx"},
	
	// Technical Supervisor
	{id: 10, name: "People Managers (This course is obligatory)", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/People%20Managers.aspx"},
	{id: 11, name: "Managing Teams and Leading People", link: null},
	{id: 12, name: "Client Relationship Management", link: null},
	{id: 13, name: "Executive Coaching", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Executive%20Coaching%20Program.aspx"},
	
	// Managerial
	{id: 14, name: "Leading Change and Transformation", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Leading%20Change%20and%20Transformation.aspx"},
	{id: 17, name: "Leader as a Coach", link: null},
	{id: 18, name: "Managing Workplace Conflict", link: null},
	{id: 19, name: "Team Coaching", link: null},

	//Support Track
	{id: 20, name: "Comprehensive Learning and Innovation Program (HQ and COF)", link: null},
	{id: 21, name: "Skills for Success (HQ)", link: null},
  
  //Others
  {id: 22, name: "Mentoring Program", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/learning/Mentoring.aspx"},
  {id: 23, name: "Living Our Values at Work", link: null},
  {id: 24, name: "Working Mama", link: "https://idbg.sharepoint.com/sites/HRD/en/Pages/diversity/Working%20Mama.aspx"}

];


/*-------------------------*/
//JSON with question data.
/*-------------------------*/
  var questions = [
    {
      questionId: 1,
      questionText:"First, what kind of Bank employee are you?",
      answers : [
        "Staff",
        "Contractual"
      ],
    },
    {
      questionId: 2,
      previousQuestion: 1,
      questionText:"What type of contract do you have?",
      answers : [
        "TTC",
        "DTC"
      ],
    },
    {
      questionId: 3,
      questionText:"What career track are you currently in?",
      hint: "Check your <a target='_blank' href='" + "https://idbg.sharepoint.com/sites/HRD/en/Pages/career/Role%20Portraits.aspx" + "'>role portrait</a>",
      previousQuestion: 1,
      answers : [
        "Technical",
        "Support",
        "Managerial"
      ],
    },
    {
      questionId: 4,
      questionText:"Are you an Performance Management supervisor?",
      hint: "Do you Supervise 3 or more Staff Members?",
      previousQuestion: 3,
      answers : [
        "Yes",
        "No",
      ],
    },
    
  ];


/* Global variables*/

var thisQuiz;
var questionContainer = document.getElementById("quiz-question");
  
/*
* Employee "Class" definition
*
*
*/
function Employee (type, courses) {
  this.type =  type; //type of contract
  this.courses = courses; //Array with course ID #s
}

// This method uses the Course IDs to map to the Programs array
// and returns an array with the names of the courses
Employee.prototype.getCoursesNames = function (arrayToMatch) {
  
  var courseNames = [];
  //for each element in IDarray, find the corresponding name in Programs 
	for (var i = 0; i <= this.courses.length; i++) {
		
		var id = this.courses[i];
		
		arrayToMatch.find(function(element, index){
			
			if(element.id === id) {
       courseNames.push({name: element.name, link: element.link}); 
      }
			
		}); 
	}
  
  return courseNames;
}

/*  end of Employee Class*/


/* Instantiate employees */


var employees = [
  new Employee("TTC", [0, 1]),
  new Employee("DTC", [0, 1,2,3,4, 7, 25]),
  new Employee("Technical", [0,1,2,3,4,5,6,7,8,9]),
  new Employee("Technical Supervisor", [0,1,2,3,4,5,6,7,8,9,10,11,12,13, 25]),
  new Employee("Managerial", [0, 1, 10, 11, 12,13, 22, 14,17,18,19, 22,23, 25]),
  new Employee("Support", [0,1,20,21, 25]),
  
];// end of employee instance arrays


/*
* Quiz "Class" definition
*/
function Quiz(questions) {
  this.questions = questions;
  this.length = questions.length;
  this.currentQuestion = 1;  
}
  
Quiz.prototype.renderQuestion = function(index) {
  
  //remove previous content before inserting new one
  questionContainer.innerHTML = "";
  

  //create question node
  var question = document.createElement("p");
  // get question
  question.innerHTML = this.questions[index].questionText;
 
  
  //append the question...
  questionContainer.appendChild(question);
  
  // check if there's a hint available for the question
  var hint = this.questions[index].hint;
  
  if (hint) {
    var hintNode = document.createElement("p");
    hintNode.setAttribute("id", "hint");
    hintNode.innerHTML = "<strong>Hint: </strong>" + hint;
    questionContainer.appendChild(hintNode);
  }
  
  //create buttons for each answer
  for(var i = 0; i < this.questions[index].answers.length; i++) {
   
    var button = document.createElement("button");
    var answer = this.questions[index].answers[i];
    
    // add answer text into button
    button.innerHTML = answer;
    
    //add attributes
    button.setAttribute("class", "quiz-button");
    button.setAttribute("tabindex", i + 1);
    
    // set data attribute using jquerys method to support IE10
    $(button).attr("data-value", answer);
    
    //set click handler
    button.setAttribute("onclick", "submitAnswer($(this).data('value'))");
    
    //append it to the DOM
    questionContainer.appendChild(button);
  }
  
};

/*
* This method handles the output of the answers. It expects an array of answers and simply adds them as lists to the DOM.
*/
Quiz.prototype.outputResults = function(answerArray) {
  
   //remove previous content before inserting new one
  questionContainer.innerHTML = "";
  
  //create question node
  var p = document.createElement("p");
  var ul = document.createElement("ul");
  
  p.innerHTML = "These programs are available to you...";
  
  //append the paragraph...
  questionContainer.appendChild(p);
  questionContainer.appendChild(ul);
  
  for(var i = 0; i < answerArray.length; i++) {
    
    var item = document.createElement("li");
    var itemLink; 
    
    if(answerArray[i].link) // if there's a webpage for the program 
    {
      itemLink = document.createElement("a"); //create the anchor tag
      itemLink.innerHTML = answerArray[i].name;
      itemLink.setAttribute("href", answerArray[i].link);
      item.appendChild(itemLink);
  } 
    else {
     //else we just create a <li> item, with no link
    item.innerHTML = answerArray[i].name;
  }
    
    ul.appendChild(item);  
    
  } 
}


/* show disclaimer */
Quiz.prototype.disclaimer = function() {
  
  var disclaimer = "**With the exception of Career Services and the Language and Culture program, participation by DTC's in other programs require a business case justification from your supervisor. Tuition must also be paid in full by your department. For more information please contact the Program Coordinator of the program that interests you.";
  
 var disclaimerNode = document.createElement("p");
  
  questionContainer.appendChild(disclaimerNode);
  
  disclaimerNode.setAttribute("class", "disclaimer");
  disclaimerNode.innerHTML = disclaimer;
  
  console.log(disclaimer);
  
};

 
/*  end of Quiz Class*/


function initQuiz() {

  thisQuiz = new Quiz(questions); 
  //render first question on load...
  thisQuiz.renderQuestion(thisQuiz.currentQuestion - 1);
 
}

initQuiz();
 
 
   /*
  * This method gets called on click on a button. 
  * 
  */
 function submitAnswer (optionSelected) {
   
  //this switch statement controls the branching of the quiz using the cases
  // There's 3 main branches that change the course of the output: Staff, Contractual, and Technical track
   // If buttons with those values are selected, the appropriate question is rendered,
   // else it means we have reached a dead end that merits the showing of the courses appropriate for that branch of the tree. 
   switch(optionSelected) {
     case "Staff":
       thisQuiz.renderQuestion(3 - 1);
       break;
     case "Contractual":
       thisQuiz.renderQuestion(2 - 1);
       break;
     case "Technical":
       thisQuiz.renderQuestion(4 - 1);
       break;   
    default:
       // manipulate the string value technical track question
       if(optionSelected === "Yes")
         optionSelected = "Technical Supervisor";
       else if(optionSelected === "No")
        optionSelected = "Technical";
       
       
       
       
       employees.find(function(element, index) {
         if(element.type === optionSelected)
           thisQuiz.outputResults(element.getCoursesNames(PROGRAMS));
       });
       
       // if DTC is selected, you must include a disclaimer 
       if(optionSelected === "DTC") {
        thisQuiz.disclaimer();
        
       }
                        
 }
}; 

