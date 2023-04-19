import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing, Register, Error, Main, ProtectedRoute } from './pages';
import { Quiz, Result } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />

        <Route path="/landing" element={<Landing />} />
        <Route path="/Register" element={<Register />} />

        {/* catch this route if all the routes above not match */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
