var myModule = angular.module("QuizzingProgram",[]);

myModule.controller('QuizController',
    ['$scope', 'studentListService', 'questionListService', 
        function ($Scope, studentListService, questionListService)  {
    
        var qc = this;

        

        qc.GenerateQuestion = function GenerateQuestion() {
        
        
           
            var rndNumber = (Math.random() * (question.length - 1));
            var x = rndNumber.toFixed()
            
     
            //use random number to pick a qustion from a array
            var test = tempquestion[x];
            var test;
           
            
           
            if(tempquestion.length -1 == 0){
                test = 'The list is complete';
            }else{
                test = tempquestion[x];
                //tempquestion.remove(x);
                //delete tempquestion[tempquestion.indexOf(x)];
                //delete tempquestion[test];
                tempquestion.splice(x,1);
            }
            
            qc.question = test;
           
             
        }
        
        qc.GenerateStudent = function GenerateStudent(){
            
             var rndNumber = (Math.random() * Students.length);
            var x = rndNumber.toFixed();
            //use random number to pick a student from a array
            var rndStudent = Students[x];
            if(Students.length -1 == 0){
                qc.student = "List is empty";
            }else{
            Students.splice(x,1);
            qc.student = rndStudent;
            }
            qc.student = rndStudent;
        }
        
        qc.DisplayAnswer = function DisplayAnswer(){
            var rndNumber = (Math.random() * numberOfStudent);
            var x = rndNumber.toFixed();
            qc.answer = 'This is a test answer', x ;

        }
        

}]);