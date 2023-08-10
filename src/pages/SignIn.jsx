import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/API";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleRegisterBtnClick = (e) => {
    e.preventDefault();
    console.log("클릭");
    navigate('/signup');
  };
  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    })
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      console.log("유효성 검사 통과");
    }
  };

  const validateEmail = () => {
    const isValid = form.email.includes("@");
    return isValid;
  };
  const validatePassword = () => {
    const isValid = form.password.length >= 8;
    return isValid;
  };
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  const isSubmitDisabled = !validateEmail() || !validatePassword();

  const signInApi = ({ form }) => {
    const userData = {
      email: `${form.email}`,
      password: `${form.password}`,
    };
    API.post('/auth/signin', userData)
      .then((response) => {
        if(response.status === 200) {
          const accessToken = response.data['access_token'];
          localStorage.setItem("accessToken", accessToken);
          window.location.replace('/todo')
        }
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form className="flex flex-col w-1/4" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full mb-2">
          <label htmlFor="userEmail">이메일</label>
          <input
            className="border rounded-lg px-2 py-1 text-sm"
            type="text"
            id="userEmail"
            name="email"
            value={form.email}
            data-testid="email-input"
            placeholder="이메일을 입력해주세요."
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="userPassword">비밀번호</label>
          <input
            className="border rounded-lg px-2 py-1 text-sm"
            type="password"
            name="password"
            id="userPassword"
            value={form.password}
            data-testid="password-input"
            placeholder="비밀번호를 입력해주세요."
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <button
            className={`border rounded-lg box-border py-1 cursor-pointer w-1/2 text-white ${isSubmitDisabled ? 'bg-gray-300' : 'bg-blue-800'}`}
            data-testid="signin-button"
            disabled={isSubmitDisabled}
            onClick={() => signInApi({form})}
          >
            로그인
          </button>
          <button
            className="border rounded-lg py-1 cursor-pointer w-1/2 bg-blue-800 text-white"
            type="button"
            onClick={handleRegisterBtnClick}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
