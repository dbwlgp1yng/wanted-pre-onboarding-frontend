import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Todo from './pages/Todo';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const isToken = localStorage.getItem('accessToken') !== null;

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={isToken ? <Navigate to="/todo" /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={isToken ? <Navigate to="/todo" /> : <SignIn />} />
        <Route path="/signup" element={isToken ? <Navigate to="/todo" /> : <SignUp />} />
        <Route path="/todo" element={isToken ? <Todo /> : <Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
