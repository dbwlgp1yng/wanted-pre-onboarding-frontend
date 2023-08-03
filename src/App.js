import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Todo from './pages/Todo';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <Navigate to='/signin'></Navigate> } />
          <Route path='/signin' element={ <SignIn /> } />
          <Route path='/signup' element={ <SignUp /> } />
          <Route path='/todo' element={ <Todo /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
