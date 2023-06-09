const data = [
  {
    expressions: { id: 1, expressions: "happy, happy, neutral, neutral, neutral, neutral, neutral, neutral, neutral", save_question_id: 1, user_id: 1 },
    candidate: { fname: "emmanuel", lname: "mhango" }
  },
  {
    expressions: { id: 2, expressions: "happy, happy, neutral, neutral, neutral, neutral, neutral, neutral, neutral", save_question_id: 1, user_id: 1 },
    candidate: { fname: "emmanuel", lname: "mhango" }
  },
  {
    expressions: { id: 3, expressions: "happy, happy, neutral, neutral, neutral, neutral, neutral, neutral, neutral", save_question_id: 2, user_id: 1 },
    candidate: { fname: "james", lname: "mhango" }
  },
  {
    expressions: { id: 4, expressions: "happy, happy, neutral, neutral, neutral, neutral, neutral, neutral, neutral", save_question_id: 1, user_id: 1 },
    candidate: { fname: "emmanuel", lname: "mhango" }
  }
];

const questionCountBySaveId = [];

data.forEach(entry => {
  const saveQuestionId = entry.expressions.save_question_id;
  if (!questionCountBySaveId.includes(saveQuestionId)) {
    questionCountBySaveId.push(saveQuestionId);
  } 
});

console.log(questionCountBySaveId);
