const johnScores = 300 + 120 + 200;
const mikeScores = 116 + 94 + 300;
const maryScores = 300 + 120 + 200;

const johnAvgScore = johnScores / 3;
const mikeAvgScore = mikeScores / 3;
const maryAvgScore = maryScores / 3;

var isTieMary = false;
var isTieMike = false;
var isTieJohn = false;

var alertMsg = 'N/A';

var message = johnAvgScore > mikeAvgScore
  ? 'John\'s team beats Mike\'s team!'
  : (johnAvgScore < mikeAvgScore
    ? 'Mike\'s team beats John\'s team!'
    : (johnAvgScore === mikeAvgScore
      ? 'It\'s a tie between Mike and John!' : 'Something is amiss!')
  );

console.log(message);

if (johnAvgScore === mikeAvgScore && mikeAvgScore === maryAvgScore) {
  alert('Three way tie!');
} else if (johnAvgScore >= mikeAvgScore && johnAvgScore >= maryAvgScore) {
  isTieMary = johnAvgScore === maryAvgScore;
  isTieMike = johnAvgScore === mikeAvgScore;
  alertMsg = isTieMary ? 'John and Mary tie for the win!' : (isTieMike ? 'John and Mike tie for the win!' : 'John wins!');
  alert(alertMsg);
} else if (maryAvgScore > johnAvgScore && maryAvgScore > mikeAvgScore) {
  isTieJohn = maryAvgScore === johnAvgScore;
  isTieMike = maryAvgScore === mikeAvgScore;
  alertMsg = isTieJohn ? 'Mary and John tie for the win!' : (isTieMike ? 'Mary and Mike tie for the win!' : 'Mary wins!');
  alert(alertMsg);
} else if (mikeAvgScore > johnAvgScore && mikeAvgScore > maryAvgScore) {
  isTieJohn = mikeAvgScore === johnAvgScore;
  isTieMary = mikeAvgScore === maryAvgScore;
  alertMsg = isTieJohn ? 'Mike and John tie for the win!' : (isTieMary ? 'Mike and Mary tie for the win!' : 'Mike wins!');
  alert(alertMsg);
}