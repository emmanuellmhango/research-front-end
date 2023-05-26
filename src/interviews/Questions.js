import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as faceapi from 'face-api.js';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./Interviews.css"

const Questions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  const job_id = location.state.job_id;
  const questions = useSelector((state) => state.jobQuestions.jobQuestions);
  const user = useSelector((state) => state.user.user);
  const videoRef = useRef();
  const canvasRef = useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const [expressions, setExpressions] = useState([]);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const mediaRecorderRef = useRef(null);  

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

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

  const showNextElement = async() => {
    stopVideo();
    if (recordedChunks.length > 0) {
      let recordedBlob = new Blob(recordedChunks, { type: recordedChunks[0].type });
      setRecordedChunks([]);
      const express = expressions.join(", ");
      const saveExpressions = await axios.post("http://localhost:3000/api/v1/save_expressions", {
        expressions: express,
        video_feed: recordedBlob,
        job_id: job_id,
        user_id: user.id
      });
      
      if (saveExpressions.statusText === 'Created') {
        alert("Question submitted, please wait for the next question");
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
        setExpressions([]);
      } else {
        alert("Error saving your answer. Please check your network and try again.");
      }
  
    } else {
      alert("There was a problem with your video, please try again or contact the HR manager");
    }
  };

  const speechToText = () => {
    const text = questions[currentIndex].question
    const textAudio = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(textAudio);
  };
  
  const loadModels = async () => {
    const MODEL_URL = process.env.PUBLIC_URL + '/models';
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]).then(setModelsLoaded(true));
  }
  
  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.addEventListener('canplay', handleVideoCanPlay);
          video.addEventListener('playing', handleVideoPlaying);
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.start();
          mediaRecorder.ondataavailable = handleDataAvailable;
        }
      })
      .catch(err => {
        console.error("error:", err);
      });
  };
  
  const handleVideoCanPlay = () => {
    let video = videoRef.current;
    if (video) {
      video.removeEventListener('canplay', handleVideoCanPlay);
      video.play();
    }
  };
  
  const handleVideoPlaying = () => {
    let video = videoRef.current;
    if (video) {
      video.removeEventListener('playing', handleVideoPlaying);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
    }
  };
  
  const stopVideo = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setCaptureVideo(false);
    }
  };  

  const handleVideoOnPlay = () => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      setInterval(async () => {
        if (canvasRef && canvasRef.current) {
          canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
          const displaySize = {
            width: videoWidth,
            height: videoHeight
          }
          faceapi.matchDimensions(canvasRef.current, displaySize);
          const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
          canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
          canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

          if (detections.length > 0) {
            const expressions = detections[0].expressions;
            const maxExpression = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
            setExpressions(prevExpressions => [...prevExpressions, maxExpression]);
          }
        }
      }, 1000);
    }
  };

  useEffect(() => {
    fetchJobQuestions();
    //speechToText();
    loadModels();
    startVideo();

    SpeechRecognition.startListening();
    if (videoRef.current) {
      videoRef.current.addEventListener("loadedmetadata", handleVideoOnPlay);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadedmetadata", handleVideoOnPlay);
      }
    };
  }, [currentIndex]);

  if (!questions || questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      <br />
      <div className="container-start-interview">
        <h4 className="color">Question {currentIndex + 1}: "{questions[currentIndex].question}"</h4>
        <h4 className="color">Your response: </h4>
        <div id="section">
          {
              modelsLoaded ?
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                    <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                    <canvas ref={canvasRef} style={{ position: 'absolute' }} /> <br />
                  </div>
                  <p>Transcript: {transcript}</p>
                </div>
                :
                <div>loading...</div>
          }
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={showNextElement} className="form-control-btn green">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
