import { isAuth } from './utils/auth';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';

function App() {
  if (isAuth()) return <MainPage/>;
  return <LoginPage/>;
}

export default App;
