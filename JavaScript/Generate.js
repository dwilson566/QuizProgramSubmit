var quizModule = angular.module('QuizProgram', []);

quizModule.controller('QuizProgramController',
    ['$scope', 'studentListService', 'questionListService', 
        function($scope, studentListService, questionListService){
    
    var qpc = this;
    
    //Uses Services
    

    qpc.students_completed = [];
    
    
        
    qpc.questions_completed = [];
    
    
    
    qpc.getNextQuestion = function(){
        
        if(qpc.questions.length > 0){
            var index = Math.floor(Math.random() * qpc.questions.length);
            
            qpc.selected_question = qpc.questions[index];
            
            qpc.questions_completed.push(qpc.selected_question);
            
            //read about splice here: http://www.w3schools.com/jsref/jsref_obj_array.asp
            qpc.questions.splice(index, 1);            
        }
        else{
            qpc.questions = qpc.questions_completed;
            qpc.questions_completed = [];
        } 

    }
    
    qpc.getNextStudent = function(){
        
        if(qpc.students.length > 0){
            var index = Math.floor(Math.random() * qpc.students.length);
             
            qpc.selected_student = qpc.students[index];
             
            qpc.students_completed.push(qpc.selected_student);
             
            qpc.students.splice(index, 1);
        }
        else{
            qpc.students = qpc.students_completed;
            qpc.students_completed = [];
        }
    }
    
    qpc.getNext = function(){
        qpc.getNextQuestion();
        qpc.getNextStudent();
    }
    
    qpc.doCorrect = function(){
        qpc.selected_student.correct++;
        qpc.getNext();
    }
    
    qpc.doIncorrect = function(){
        qpc.selected_student.incorrect++;
        qpc.getNext();        
    }
    
     qpc.getStudents = function(){
        studentListService.getStudentList()
        .then(
            //Success - What to do
            function(response){
                console.log(response.data);
                qpc.students = response.data
                qpc.getNext();
        },
            //Failure -What to do 
            function(response){
            console.log(response);
            qpc.student = [];
        });
    }
       
    //A call to get the student 
    qpc.getStudents();
    
    qpc.getQuestion = function(){
        questionListService.getStudentList()
        .then(
            //Success - What to do
            function(response){
            qpc.questions = response.data
        },
            //Failure -What to do 
            function(response){
            console.log(response);
            qpc.questions = [];
        });
    }
    
    //A call to get the questions    
    qpc.getQuestion();
    
    qpc.getNext();
    
}]);

///// QUESTION LIST FACTORY 
quizModule.factory('questionListService', ['$http', function($http){

    //factory allows us to specify an object to send back
    var questionListService = {};

    //get current rest conditions
    questionListService.getQuestion = function(){
        return $http.get("Questions.json");
    };
    
    return questionListService;
}]);


        
///// STUDENT LIST FACTORY 
quizModule.factory('studentListService', ['$http', function($http){

    //factory allows us to specify an object to send back
    var studentListService = {};

    //get current rest conditions
    studentListService.getStudentList = function(){
        return $http.get("students.json");
    };
    
    return studentListService;
}]);