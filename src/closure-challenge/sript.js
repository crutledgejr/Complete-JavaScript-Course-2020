function interviewQuestion(job) {
    var a;
    switch(job) {
        case 'designer': {
            a = ' tell us about UX.';
            break;
        }
        case 'teacher': {
            a = ' tell us about the subject you teach.';
            break;
        }
        default: {
            a = ' tell us about yourself.';
        }
    }
    return function(name) {
        console.log(name + a);
    }
}

var designerInterview = interviewQuestion('designer');
var teacherInterview = interviewQuestion('teacher');
var genericInterview = interviewQuestion();

designerInterview('Mark');
teacherInterview('Matthew');
genericInterview('Heather');
