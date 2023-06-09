import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import "./InterviewRankings.css";

const InterviewRankings = () => {
    const location = useLocation();
    const [interviewedCandidates, setInterviewedCandidates] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [showApplicants, setShowApplicants] = useState([]);
    const jobId = location.state.jobId;
    const position = location.state.position;
    const neededJobSkills = location.state.neededJobSkills;
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
        const expressionPercentages = {};
        for (let i = 0; i < expressionCount; i++) {
          const expression = expressions[i];
          if (expressionCounts.hasOwnProperty(expression)) {
            expressionCounts[expression]++;
          } else {
            expressionCounts[expression] = 1;
          }
        }
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

    const maxExpression = (expressions) => {
        const data = expressions.split(',').map(expression => expression.trim());
        const convertedData = data.reduce((result, item) => {
          const [key, value] = item.split(':').map(str => str.trim());
          result[key] = parseFloat(value);
          return result;
        }, {});
      
        const sortedData = Object.entries(convertedData)
          .sort((a, b) => b[1] - a[1])
          .reduce((result, [key, value]) => {
            result.push({ key, value });
            return result;
          }, []);
      
        return sortedData;
    };

    const speechAccuracy = (speech, answer) => {
        const words = speech.split(',').map(word => word.trim());
        const answerWords = answer.split(',').map(word => word.trim());
        const cwords = words.filter((word) => answerWords.includes(word));
        const commonWords = [...new Set(cwords)];
        const matchPercentage = (commonWords.length / answerWords.length) * 100;
        console.log(`commonWords: ${commonWords}, answerWords: ${answerWords}, %:${matchPercentage}`);
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

    const overallResultPerQuestion = (expressions, speechAccuracy, numberOfQuestions) => {
        const expressionValue = expressions[0].value;
        const total = parseFloat(expressionValue) + parseFloat(speechAccuracy);
        // const questionContribution = 100 / numberOfQuestions;
        // const questionAnswerContribution = total/100;
        // const questionContributionPerc = questionContribution/100;
        const contribution = Math.round(total);
        return contribution;
    };

    
    const countQuestions = () => {
        const questionCountBySaveId = [];
        interviewedCandidates.forEach(entry => {
          const saveQuestionId = entry.expressions.save_question_id;
          if (!questionCountBySaveId.includes(saveQuestionId)) {
           questionCountBySaveId.push(saveQuestionId);
          }
        });
        return questionCountBySaveId.length;
    };

    const totalOverall = () => {
        const contrib = document.getElementsByClassName('contributionsTotal');
        let total = 0;
        for (let i = 0; i < contrib.length; i++) {
            total += parseFloat(contrib[i].innerHTML);
        }
        return Math.ceil(total);
    }

    const sortRankings = () => {
        const table = document.getElementById('data-table');
        if (table && table.tBodies.length > 0) {
            const rows = table.tBodies[0].rows;
            const rowsArray = Array.from(rows);
            rowsArray.sort((a, b) => {
                const rankA = parseInt(a.cells[3].textContent);
                const rankB = parseInt(b.cells[3].textContent);
                return rankA - rankB;
            });
            for (let i = 0; i < rowsArray.length; i++) {
                table.tBodies[0].appendChild(rowsArray[i]);
            }
        }
    };

    const fetchAllpplicants = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/jobs/${jobId}/show_applicants`
          );
          setShowApplicants(response.data.users);
        } catch (error) {
          console.log(error);
        }
    };

    const candidateMatch = (id) => {
        let applicantSkills = "";
        showApplicants.forEach((applicant) => {
            if (applicant.id === id) {
                applicantSkills = applicant.skills;
            }
        });
        const neededJobSkillsArray = neededJobSkills.split(",").map((skill) => skill.trim());
        const applicantSkillsArray = applicantSkills.split(",").map((skill) => skill.trim());
        const commonSkills = neededJobSkillsArray.filter((skill) => applicantSkillsArray.includes(skill));
        const matchPercentage = Math.round((commonSkills.length / neededJobSkillsArray.length) * 100);
        return matchPercentage;
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
        sortRankings();
        fetchAllpplicants();
    }, [interviewedCandidates]);

    return (
        <div className="rankings">
            <br /><br /><br />
            <h2>Interview Rankings</h2>
            <h4>Position: {position} </h4>
            {applicants && applicants.length > 0 ? (
                <table className="table-rankings" id="data-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Bio Details</th>
                            <th>Question Summaries</th>
                            <th className="right coloring">Overall</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((applicant, i) =>
                                <tr key={i} className="applicant">
                                    <td width="5%">{i + 1}</td>
                                    <td width="20%">
                                        <table className="table-bios">
                                            <thead>
                                                <th>Applicant</th>
                                                <th className="emphasis">Skills Match</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {applicant.first_name} {applicant.last_name} <br />
                                                        {applicant.email} <br />
                                                        {applicant.phone}
                                                    </td>
                                                    <td className="emphasis">
                                                        <span className="contributionsTotal">{candidateMatch(applicant.id)}</span> %
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td width="65%">
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
                                                                    <b>Total</b><br />
                                                                    <span className="contributionsTotal">
                                                                        {overallResultPerQuestion(maxExpression(overallExpressions(candidate.expressions.expressions)), speechAccuracy(candidate.expressions.voice_text, getAnswer(candidate.expressions.save_question_id)), countQuestions())}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                )
                                            }
                                        }
                                        )}
                                    </td>
                                    <td className="right coloring">
                                        {totalOverall()}
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
