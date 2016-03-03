var myModule = angular.module('QuizzingProgram',[]);


myModule.controller('QuizController',
    ['$scope', 'studentListService', 'questionListService', 
        function ($Scope, studentListService, questionListService)  {
    
        var qc = this;
        
        qc.students_completed = [];
        
        
        qc.question = [];
        qc.questions_completed = [];
        
        qc.getNextQuestion = function(){
            
            if(qc.question.length > 0){
                var index = Math.floor(Math.random()* qc.question.length);
                
                qc.selected_question = qc.question[index];
                
                qc.questions_completed.push(qc.selected_question);
                
                qc.question.splice(index,1);
            }else{
                qc.question = qc.questions_completed;
                qc.questions_completed = [];
            }
        }
        
        qc.getNextStudent = function(){
            if(qc.students.length >0){
                var index = Math.floor(Math.random()*qc.student.length);
                
                qc.selected_student = qc.student[index];
                
                qc.students_completed.push(qc.selected_student);
                
                qc.student.splice(index,1);
            }else{
                qc.student = qc.students_completed;
                
                qc.students_completed = [];
            }
        }
    qc.getNext = function(){
        qc.getNextQuestion();
        qc.getNextStudent();
    }
    
    qc.doCorrect = function(){
        qc.selected_student.correct++;
        qc.getNext();
    }
    
    qc.doIncorrect = function(){
        qc.selected_student.incorrect++;
        qc.getNext();        
    }
    
     qc.getStudents = function(){
        studentListService.getStudentList()
        .then(
            //Success - What to do
            function(response){
                console.log(response.data);
                qc.students = response.data;
                qc.getNextStudent();
                //qc.getNext();
        },
            //Failure -What to do 
            function(response){
                console.log(response);
                qc.student = [];
            }
        );
    }
       
    //A call to get the student 
    qc.getStudents();
    
    qc.getQuestion = function(){
        questionListService.getQuestion()
        .then(
            //Success - What to do
            function(response){
                console.log(response.data);
            qc.questions = response.data;
            qc.getNextQuestion();
        },
            //Failure -What to do 
            function(response){
                console.log(response);
                qc.questions = [];
            }
        );
    }
    
    //A call to get the questions    
    qc.getQuestion();
    
    //qc.getNext();
    
}]);

///// QUESTION LIST FACTORY 
myModule.factory('questionListService', ['$http', function($http){

    //factory allows us to specify an object to send back
    var questionListService = {};

    //get current rest conditions
    questionListService.getQuestion = function(){
        return $http.get("Question.json");
    };
    
    return questionListService;
}]);


        
///// STUDENT LIST FACTORY 
myModule.factory('studentListService', ['$http', function($http){

    //factory allows us to specify an object to send back
    var studentListService = {};

    //get current rest conditions
    studentListService.getStudentList = function(){
        return $http.get("students.json");
    };
    
    return studentListService;
}]);