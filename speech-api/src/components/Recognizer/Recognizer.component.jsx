import { useState, useEffect, useRef } from 'react';



// COMPONENT
const Recognizer = () => {
  const [currentText, setCurrentText] = useState('');
  const [allText, setAllText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechDetected, setSpeechDetected] = useState(false);
  const recognizerEngine = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognizer = new recognizerEngine();
  recognizer.interimResults = true;
  recognizer.lang = 'ru-RU';

  recognizer.onspeechstart = () => {
    setSpeechDetected(true);
  };

  recognizer.onspeechend = () => {
    setSpeechDetected(false);
  };

  recognizer.onaudiostart= () => {
    setIsRecording(true);
  };

  recognizer.onaudioend = () => {
    setIsRecording(false);
  };

  recognizer.onend = () => {
    if (isRecording) recognizer.start();
  };


  recognizer.onresult = (event) => {
    console.log(event.results);
    setCurrentText(event.results[0][0].transcript);
    setAllText(allText + ' ' + currentText);
    setCurrentText('');
  };

  const startRecognize = () => {
    recognizer.start();
  };
  const stopRecognize = () => {
    setIsRecording(false);
    recognizer.stop();
  };

  return (
    <div>
      Recording: {isRecording ? 'Listening...' : 'Stopped'}<br/>
      Speech detector: {speechDetected ? 'DETECTED!' : ''}<br/>
      <input type="text" value={currentText} disabled/><br/>
      <textarea value={allText} disabled></textarea><br/>
      {
        isRecording ? <button onClick={stopRecognize}>STOP</button>:
        <button onClick={startRecognize}>START RECOGNIZING</button>
      }
    </div>
  );
};

export default Recognizer;
