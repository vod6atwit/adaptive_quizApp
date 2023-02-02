import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Register, Error, Main } from './pages';
import { Quiz, Result } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />

        <Route path="/landing" element={<Landing />} />
        <Route path="/Register" element={<Register />} />

        {/* catch this route if all the routes above not match */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
