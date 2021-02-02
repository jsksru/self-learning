import { logout } from '../utils/auth'

const Header = () => {

  const exitHandler = () => {
    logout();
  };

  return (
    <div className="header" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <h1>Chat</h1>
      <div>Users online: 1</div>
      <button onClick={exitHandler}>Exit</button>
    </div>
  );
};

export default Header;