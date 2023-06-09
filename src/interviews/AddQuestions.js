import React, {useEffect, useState} from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./Interviews.css";

const AddQuestions = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.questions);
    const id = location.state.id;
    const position = location.state.position;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const fetchQuestions = async () => {
        await axios.get('http://localhost:3000/api/v1/save_questions', {params: {job_id: id}})
        .then((response) => {
           dispatch({type: 'QUESTIONS_SUCCESS', payload: response.data.save_questions});
        })
        .catch((error) => {
           dispatch({type: 'QUESTIONS_ERROR', payload: error});
        });
    };

    const [formData, setFormData] = useState({
        job_id: id,
        question: '',
        answer: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/v1/save_questions', formData)
          .then(() => {
            fetchQuestions();
            alert('Question saved correctly.');
          })
          .catch(() => {
            alert(`Error saving question, Please try again!!`);
          });
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div>
            <br />
            <br />
            <center>
                <h2>Add Questions</h2>
            </center>
            <div className="container-start-interview">
                <h3> Position: { position }</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="question">Question</label><br />
                        <textarea type="text" className="form-control-l format-textarea" onChange={handleInputChange} id="question" name="question" placeholder="Enter question" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="answer">Expected answer verbs. separate by comma ( , )</label><br />
                        <textarea className="form-control-l format-textarea" onChange={handleInputChange} id="answer" name="answer" placeholder="Enter expected answer verbs" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="form-control-btn make-big">Save</button> &nbsp;&nbsp;&nbsp;
                        <button type="reset" className="form-control-btn">Clear</button>
                    </div>
                </form>
            </div>
            <hr />
            <table className="table-questions">
                <thead>
                    <tr className="left">
                        <th>No.</th>
                        <th>Question</th>
                        <th>Expected Answer Verbs</th>
                    </tr>
                </thead>
                <tbody>
                {questions && questions.map((question, index) => (
                    <tr key={question.id}>
                        <td>{index + 1}.</td>
                        <td>{question.question}</td>
                        <td>{question.answer}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddQuestions;
