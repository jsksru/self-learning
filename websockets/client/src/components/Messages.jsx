import PublicMessage from './PublicMessage';
import InfoMessage from './InfoMessage';

const messageType = (message, index) => {
  if (message.type && message.type === 'MESSAGE') {
    return <PublicMessage author={message.from} text={message.text} time={message.time} key={index}/>;
  }

  if (message.type && message.type === 'CONNECTED') {
    return <InfoMessage key={index}>{message.user} вошел(ла) в чат</InfoMessage>;
  }

  if (message.type && message.type === 'DISCONNECTED') {
    return <InfoMessage key={index}>{message.user} покинул(а) чат</InfoMessage>;
  }

  if (message.type && message.type === 'CLIENTS') {
    return (
      <div key={index}>
        <h4>Clients:</h4>
        <ul>
          {message.clients.map((c,i) => <li key={i}>{c.id}<br/>{c.userAgent}<br/>{c.ip}</li>)}
        </ul>
      </div>
    );
  }

  return;
};

const Messages = ({ items }) => {
  return (
    <div className="messages">
      <div className="messages-list">
        {items.map(messageType)}
      </div>
    </div>
  );
};

export default Messages;