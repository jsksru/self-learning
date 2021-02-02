import { useState } from 'react';

const LoginPage = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('name', name);
    localStorage.setItem('auth', 'true');
    window.location.reload();
  };

  return (
    <div className="center-page">
      <div>
        <h1>Enter to chat</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Your name:</span><br/>
            <input type="text"
                   autoComplete="off"
                   value={name}
                   onInput={(e) => setName(e.target.value)}
                   required
                   min="3"
                   max="10"
            />
          </label>
          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;