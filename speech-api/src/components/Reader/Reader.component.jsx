import { useState, useEffect } from 'react';

const synth = window.speechSynthesis;

const getVoicesPromise = () => new Promise((resolve, reject) => {
  const id = setInterval(() => {
    const voices = synth.getVoices();
    if (voices && voices.length && voices.length !== 0) {
      resolve(voices);
      clearInterval(id);
    }
  }, 100);
});



// COMPONENT
const ReaderComponent = () => {
  
  let [voicesList, setVoicesList] = useState(null);
  let [currentVoice, setCurrentVoice] = useState(5);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoicesLoading, setIsVoicesLoading] = useState(true);

  useEffect(() => {
    setIsVoicesLoading(true);
    getVoicesPromise().then(voices => {
      setVoicesList(voices);
      setIsVoicesLoading(false);
      setCurrentVoice(voices.findIndex(v => v.default));
    });
  }, []);

  const stopReading = () => synth.cancel();

  const speakText = (text) => {
    const utterText = new SpeechSynthesisUtterance(inputText);
    utterText.voice = voicesList[currentVoice];
    synth.speak(utterText);
   
    utterText.onstart = () => setIsSpeaking(true);
    utterText.onend = () => setIsSpeaking(false);
  };

  if (isVoicesLoading) return <div>Loading...</div>;
  return (
    <div>
      Now is: {isSpeaking ? 'Speaking...' : 'Quiet'}<br/>
      <textarea cols="30" rows="10" value={inputText} onInput={(e)=>setInputText(e.target.value)}/><br/>
      <label>
        <span>Select the voice:</span><br/>
        <select onChange={(e)=>setCurrentVoice(e.target.value)} value={currentVoice}>
          {voicesList.map((voice, index) => <option key={index} value={index}>{voice.name}</option>)}
        </select>
      </label><br/>
      {
        !isSpeaking ? <button onClick={speakText} disabled={!inputText}>READ</button>:
        <button onClick={stopReading}>STOP</button>
      }
    </div>
  );
};

export default ReaderComponent;
