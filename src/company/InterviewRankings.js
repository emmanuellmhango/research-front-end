import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import "./InterviewRankings.css";

const InterviewRankings = () => {
    const location = useLocation();
    const [interviewedCandidates, setInterviewedCandidates] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const jobId = location.state.jobId;
    const position = location.state.position;
    const [questions, setQuestions] = useState([]);

    const fetchJobQuestions = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/save_questions", { params: { job_id: jobId } });
            if (response.data.success === true) {
                setQuestions(response.data.save_questions);
            } else {
                setQuestions([]);
            }
        } catch (error) {
            setQuestions([]);
        }
    };

    const fetchInterviewedCandidates = async () => {
        if (!jobId || dataFetched) return;

        const data = { job_id: jobId };
        try {
            const response = await axios.get('http://localhost:3000/api/v1/save_expressions', { params: data });
            if (response.data.success === true) {
                setInterviewedCandidates(response.data.job_results);
                setDataFetched(true);
            } else {
                setInterviewedCandidates([]);
                setDataFetched(true);
            }
        } catch (error) {
            setInterviewedCandidates([]);
            setDataFetched(true);
        }
    };

    const groupResultsByUser = (results) => {
        const userMap = new Map();
        results.forEach((result) => {
          const { expressions, candidate } = result;
          const { user_id } = expressions;
      
          if (!userMap.has(user_id)) {
            userMap.set(user_id, {
                id: user_id,
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                email: candidate.email,
                phone: candidate.phone,
            });
          }
        });
      
        const applicantsArray = Array.from(userMap.values());
        setApplicants(applicantsArray);
    }; 

    const overallExpressions = (data) => {
        const expressions = data.split(',').map(expression => expression.trim());
        const expressionCount = expressions.length;
        const expressionCounts = {};
      
        // Count the occurrences of each expression
        for (let i = 0; i < expressionCount; i++) {
          const expression = expressions[i];
          if (expressionCounts.hasOwnProperty(expression)) {
            expressionCounts[expression]++;
          } else {
            expressionCounts[expression] = 1;
          }
        }
      
        // Calculate the percentage for each expression
        const expressionPercentages = {};
        for (const expression in expressionCounts) {
          const count = expressionCounts[expression];
          let percentage = (count / expressionCount) * 100;
          if (expression === 'neutral') {
            percentage /= 2;
          }
          expressionPercentages[expression] = `${percentage.toFixed(2)}%`;
        }
      
        return Object.entries(expressionPercentages).map(([key, value]) => `${key}: ${value}`).join(', ');
    };

    const speechAccuracy = (speech, answer) => {
        const words = speech.split(',').map(word => word.trim());
        const answerWords = answer.split(',').map(word => word.trim());
        
        // check how many candidate words match the question's required answer words
        const commonWords = words.filter((word) => answerWords.includes(word));

        // calculate matching percentage
        const matchPercentage = (commonWords.length / answerWords.length) * 100;
        // return the percentage of the match
        
        return matchPercentage.toFixed(1);
    };

    const getQuestion = (questionId) => {
        const question = questions.find(question => question.id === questionId);
        return question ? question.question : '';
    };

    const getAnswer = (questionId) => {
        const question = questions.find(question => question.id === questionId);
        return question ? question.answer : '';
    };

    const overallResultPerQuestion = (expressions, speechAccuracy) => {
        const expressionsArray = expressions.split(',').map(expression => expression.trim());
        console.log(expressionsArray);
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchInterviewedCandidates();
        };

        fetchData();
    }, []);

    useEffect(() => {
        groupResultsByUser(interviewedCandidates);
        fetchJobQuestions();
    }, [interviewedCandidates]);

    console.log(questions);
    return (
        <div className="rankings">
            <br /><br /><br />
            <h2>Interview Rankings</h2>
            <h4>Position: {position} </h4>
            {applicants && applicants.length > 0 ? (
                <table className="table-rankings">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Bio Details</th>
                            <th>Question Summaries</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((applicant, i) =>
                                <tr key={i} className="applicant">
                                    <td valign="top" width="5%">{i + 1}</td>
                                    <td  valign="top" width="25%">
                                        {applicant.first_name} {applicant.last_name} <br />
                                        {applicant.email} <br />
                                        {applicant.phone}
                                    </td>
                                    <td width="70%">
                                        {interviewedCandidates.map((candidate, j) => {
                                            if (candidate.expressions.user_id === applicant.id) {
                                                return (
                                                    <table key={j} className="table-statistics">
                                                        <tbody>
                                                            <tr>
                                                                <td width="40%">Q{j + 1}: {getQuestion(candidate.expressions.save_question_id)}</td>
                                                                <td width="40%">
                                                                    <a href={candidate.expressions.video_feed} target="_blank" className="link">
                                                                        <b>Expressions</b> <br />
                                                                         {overallExpressions(candidate.expressions.expressions)}
                                                                    </a>
                                                                </td>
                                                                <td width="20%">
                                                                    <b>Speech Accuracy</b><br />
                                                                    {speechAccuracy(candidate.expressions.voice_text, getAnswer(candidate.expressions.save_question_id))} %
                                                                </td>
                                                                <td>
                                                                    Overall <br />
                                                                    {overallResultPerQuestion(overallExpressions(candidate.expressions.expressions), speechAccuracy(candidate.expressions.voice_text, getAnswer(candidate.expressions.save_question_id)))}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                )
                                            }
                                        }
                                        )}
                                    </td>
                                </tr>
                            )
                        }                       
                    </tbody>
                    </table>
                ) : (
                    <div className="no-applicants">
                        <h3>No applicants yet</h3>
                    </div>
                )
            }

        </div>
    );
};

export default InterviewRankings;
