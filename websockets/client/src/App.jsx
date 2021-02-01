import checkAuth from './utils/checkAuth';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';

function App() {
  if (checkAuth()) return <MainPage/>;
  return <LoginPage/>
}

export default App;
