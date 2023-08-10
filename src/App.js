import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Todo from './pages/Todo';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


function App() {
  const handleRootPath = (path) => {
    const isToken = localStorage.getItem('accessToken') === null ? false : true;
    switch(path) {
      case '/': 
        if(isToken) {
          return <Navigate to='/todo'></Navigate>
        } else {
          return <Navigate to='/signin'></Navigate>
        }
      case '/signin': 
        if(isToken) {
          return <Navigate to='/todo'></Navigate>
        } else {
          return <SignIn />
        }
      case '/signup': 
        if(isToken) {
          return <Navigate to='/todo'></Navigate>
        } else {
          return <SignUp />
        }
      case '/todo': 
        if(isToken) {
          return <Todo />
        } else {
          return <Navigate to='/signin'></Navigate>
        }
      default :
        console.log('path가 없습니다.');
    }
  }
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={handleRootPath("/")} />
          <Route path='/signin' element={handleRootPath("/signin")} />
          <Route path='/signup' element={handleRootPath("/signup")} />
          <Route path='/todo' element={handleRootPath("/todo")} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
