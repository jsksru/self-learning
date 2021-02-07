import Reader from './components/Reader';
import Recognizer from './components/Recognizer';

const App = () => {
  return (
    <div style={{display: 'flex', justifyContent:'center', gap: 30, padding: 50}}>
      <Reader/>
      <Recognizer/>
    </div>
  );
};

export default App;
