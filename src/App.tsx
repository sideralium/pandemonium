import './App.scss';
import { Background } from './components/Background';

const App = () => {
  return (
    <>
      <Background inverted={false} stars={400} />
    </>
  );
}

export default App;
