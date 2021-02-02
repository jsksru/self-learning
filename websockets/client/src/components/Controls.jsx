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
        <input type="text" autoComplete="off" value={messageText} onInput={(e) => setMessageText(e.target.value)} style={{flexGrow: 1}}/>
        <button type="submit" disabled={messageText.trim().length === 0}>SEND</button>
      </div>
    </form>
  );
};

export default Controls;