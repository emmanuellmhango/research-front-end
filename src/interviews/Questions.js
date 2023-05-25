/* global webkitSpeechRecognition */
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as faceapi from "face-api.js";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs';

const Questions = () => {
  tf.setBackend('webgl');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerExpressions, setAnswerExpressions] = useState([]);
  const [answerText, setAnswerText] = useState([]);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef();
  const questions = useSelector((state) => state.jobQuestions.jobQuestions);
  const user = useSelector((state) => state.user.user);
  const job_id = location.state.job_id;

  const fetchJobQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/save_questions", { params: { job_id: job_id } });
      if (response.data.success === true) {
        dispatch({ type: "JOB_INT_QUES_SUCCESS", payload: response.data.save_questions });
      } else {
        dispatch({ type: "JOB_INT_QUES_ERROR", payload: null });
      }
    } catch (error) {
      dispatch({ type: "JOB_INT_QUES_ERROR", payload: null });
    }
  };

  const showNextElement = async () => {
    const expressions = answerExpressions.join(", ");
    const saveExpressions = await axios.post("http://localhost:3000/api/v1/save_expressions", {
      expressions: expressions,
      job_id: job_id,
      user_id: user.id
    });
    
    if (saveExpressions.statusText === 'Created') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
      textToSpeech(questions[(currentIndex + 1) % questions.length].question);
      setAnswerExpressions([]);
      setAnswerText([]);
    } else {
      alert("Error saving your answer. Please check your network and try again.");
    }
  };

  const textToSpeech = (text) => {
    const textAudio = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(textAudio);
  };

  const speechToText = () => {
    SpeechRecognition.startListening();
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModels = async () => {
    try {
      await Promise.all([
        // LOAD FACE MODELS FROM THE PUBLIC/MODELS DIRECTORY
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models")
      ]);
      console.log("Face detection models loaded successfully"); // Log a success message
      faceMyDetect();
    } catch (error) {
      console.log("Error loading face detection models:", error); // Log an error message
    }
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      if (videoRef.current && videoRef.current instanceof HTMLVideoElement) {        
        const inputSize = 512;
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions({ inputSize })).withFaceExpressions();
        const newAnswerExpressions = detections.map((detection) => {
          const expressions = detection.expressions;
          const sortedExpressions = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
          return sortedExpressions[0][0];
        });
        setAnswerExpressions((prevExpressions) => [...prevExpressions, ...newAnswerExpressions]);
      }
    }, 1000);
  };
  useEffect(() => {
    fetchJobQuestions();
    //textToSpeech(questions[currentIndex].question);
    startVideo();
    loadModels();
    speechToText();
  }, []);

  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <br />
      <div className="width-size">
        <h2 className="center color">Question {currentIndex + 1}</h2>
        <div id="section center">
          <span className="question">Question: {questions[currentIndex].question}</span>
          <br />
          <br />
          <span className="question">Start Answering:</span>
          <br />
          <br />
          <video id="video" className="video" ref={videoRef} autoPlay></video>
        </div>
        <div className="end-button">
          <button onClick={showNextElement} className="form-control-btn right">
            Next
          </button>
        </div>
        <div>
          <p> Answer: {transcript}</p>
        </div>
      </div>
    </div>
  );
};

export default Questions;
