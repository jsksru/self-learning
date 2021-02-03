import { useState } from 'react';

const Controls = ({ sendHandler }) => {
  const [messageText, setMessageText] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    sendHandler(messageText);
    setMessageText('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="controls" style={{display: 'flex'}}>
        <input className="text-input"
               type="text"
               autoComplete="off"
               value={messageText}
               onInput={(e) => setMessageText(e.target.value)}
               placeholder="Your text here..."
        />
        <button type="submit" className="button" disabled={messageText.trim().length === 0}>SEND</button>
      </div>
    </form>
  );
};

export default Controls;