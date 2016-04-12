"use strict";
$(document).ready(function() {
/*Implementation of Combination Constructor/Prototype Pattern*/
  function User(theName, theEmail) {
     this.name = theName;
     this.email = theEmail;
     this.quizScores = [];
     this.currentScore = 0;
  };
    User.prototype = {
     constructor: User,
     saveScore: function(theScoreToAdd) {
         this.quizScores.push(theScoreToAdd);
     },
     showNameAndScores: function () {
         var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
         return this.name + " Scores: " + scores;
     },
     changeEmail:function (newEmail) {
         this.email = newEmail;
         return "New Email Saved: " + this.email;
     },
  };
  /*Instances of the User function*/
  var firstUser = new User("yolixtly", "yolixtly@example.com");
  firstUser.changeEmail("yolixtly_13@hotmail.com");
  firstUser.saveScore(10);
  firstUser.saveScore(9);
  console.log(firstUser.showNameAndScores());

  // --------This function succinctly implements the parasitic combination inheritance for us.-----//
  /*Crockford Method*/
 function inheritPrototype(childObject, parentObject) {
 var copyOfParent = Object.create(parentObject.prototype);
    copyOfParent.constructor = childObject;
   childObject.prototype = copyOfParent;
};
// -----------------------------Second Example-----------------------------------//
/*Implementation of Combination Constructor/Prototype Pattern*/
 function Question(theQuestion, theChoices, theCorrectAnswer) {
 // Initialize the instance properties​.
  this.question = theQuestion;
  this.choices = theChoices;
  this.correctAnswer = theCorrectAnswer;
  this.userAnswer = "";
//Private properties
  var newDate = new Date();
  QUIZ_CREATED_DATE = newDate.toLocaleDateString();
//accessing the private properties through the method:
  this.getQuizDate = function () {
        return QUIZ_CREATED_DATE;
  };
  console.log("Quiz Created On: " + this.getQuizDate());
 };
//prototype methods to the Question Object.
 Question.prototype.getCorrectAnswer = function() {
    return  this.correctAnswer;
 };
 Question.prototype.getUserAnswer = function() {
    return this.userAnswer;
 };
Question.prototype.displayQuestion = function() {
    var questionToDisplay = "<div class='question'>" + this.question + "</div><ul>";
        choiceCounter = 0;
        this.choices.forEach(function(eachChoice)  {
        questionToDisplay += '<li><input type="radio" name="choice" value="' + choiceCounter + '">' + eachChoice + '</li>';
        choiceCounter++;
    });
    questionToDisplay += "</ul>";
    console.log (questionToDisplay);
 }; 
/*Implementing inheritance. Creation of children objects from Question Object*/
 function MultipleChoiceQuestion(theQuestion, theChoices, theCorrectAnswer){
/*??? call method takes the first parameter as the object it wants to inherit and the others are the
 properties/methods it wants to inherit from it*/
  Question.call(this, theQuestion, theChoices, theCorrectAnswer);
 };
/*implementing the parasistic combination inheritance with inheritPrototype function: 
makes the child object inherits from the parent object*/
inheritPrototype(MultipleChoiceQuestion, Question);

 function DragDropQuestion(theQuestion, theChoices, theCorrectAnswer) {
  Question.call(this, theQuestion, theChoices, theCorrectAnswer);
 };​​
//inherit the methods and properties from Question​
​ inheritPrototype(DragDropQuestion, Question);
/*Overriding Methods*/
 DragDropQuestion.prototype.displayQuestion = function() {
  //advance topic... only console the question
    console.log(this.question);
 };
/*Array of Objects to inizialize some questions*/
  var allQuestions = [
​    new MultipleChoiceQuestion("Who is Prime Minister of England?", ["Obama", "Blair", "Brown", "Cameron"], 3),   
​    new MultipleChoiceQuestion("What is the Capital of Brazil?", ["São Paulo", "Rio de Janeiro", "Brasília"], 2),   
​    new DragDropQuestion("Drag the correct City to the world map.", ["Washington, DC", "Rio de Janeiro", "Stockholm"], 0)
];
//display the question: 
 allQuestions.forEach(function(eachQuestion) {
    eachQuestion.displayQuestion();
 });
});