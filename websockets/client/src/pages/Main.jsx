import { useState, useEffect, useRef } from 'react';
import Messages from '../components/Messages';
import Controls from '../components/Controls';
import Header from '../components/Header';

const MainPage = () => {
  const [messagesList, setMessagesList] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3030');
    return () => ws.current.close();
  }, []);

  useEffect(() => {
    if (!ws.current) return;
    ws.current.onmessage = (event) => {
      try {
        const parse = JSON.parse(event.data);
        if (parse && parse.type) {
          setMessagesList([...messagesList, parse]);
        }
      } catch(err) {
        console.error(err);
      }
    };
  }, [messagesList]);

  const sendHendler = (inputMessage) => ws.current.send(inputMessage);

  return (
    <div className="center-page">
      <div className="chat" style={{width: '600px'}}>
        <Header/>
        <Messages items={messagesList}/>
        <Controls sendHandler={sendHendler}/>
      </div>
    </div>
  );
};

export default MainPage;