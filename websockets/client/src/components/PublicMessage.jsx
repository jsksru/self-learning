const PublicMessage = ({author, text, time}) => {
  const messageTime = new Date(time).toLocaleTimeString('ru-RU', { hour: 'numeric', minute: '2-digit' });

  return (
    <div className="message">
        <div className="author">{author}</div>
        <div className="text">{text}</div>
        <div className="time">{messageTime}</div>
    </div>
  );
};

export default PublicMessage;