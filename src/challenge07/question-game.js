var QuestionBuilder = function(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswert = correctAnswer;
};

(
    function() {
        var currentGame = new QuestionBuilder(
            'Which game am I currently playing?',
            [
                '0 - Spider-Man PS4',
                '1 - Resident Evil 2 Remake',
                '2 - God of War PS4'
            ],
            '0'
        );

        var previousGame = new QuestionBuilder(
            'Which game did I just finish playing?',
            [
                '0 - Draqon Quest XI',
                '1 - Resident Evil VII',
                '2 - God of War PS4'
            ],
            '2'
        );

        var gameSystem = new QuestionBuilder(
            'Which game system am I currently playing games on?',
            [
                '0 - Playstation3',
                '1 - Playstation4',
                '2 - Playstation2'
            ],
            '1'
        );
        const gameQuestions = [currentGame, previousGame, gameSystem];
        let isPlaying = true;
        let playerScore = 0;
        let result;
        while(isPlaying) {
            const questionSelect = Math.floor( Math.random() * gameQuestions.length );
            const selectedQuestion = gameQuestions[questionSelect];
            console.log(selectedQuestion.question);
            for (const answer in selectedQuestion.answers) {
                console.log(selectedQuestion.answers[answer]);
            }
            let playerAnswer = prompt('Your answer:', 'Answer: 0, 1 or 2...');
            if (playerAnswer === 'exit') {
                break;
            }
            if ( playerAnswer === selectedQuestion.correctAnswert ) {
                playerScore++;
                result = 'Correct!';
            } else {
                result = 'Nope! Maybe next time...';
            }
            console.log(result);
            console.log('Current score: ' + playerScore);
        }
    }
)();
