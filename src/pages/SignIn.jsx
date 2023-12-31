import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/SignAPI";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleRegisterBtnClick = (e) => {
    e.preventDefault();
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
    isSubmitDisabled && console.log("유효성 검사 통과");
  };

  const isSubmitDisabled = !form.email.includes("@") || form.password.length < 8;

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
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-4xl font-bold mb-12 text-blue-700">Sign In</h1>
      <form className="flex flex-col w-1/4" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full mb-4">
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
        <div className="flex flex-col mb-4">
          <label htmlFor="userPassword">비밀번호</label>
          <input
            className="border rounded-lg px-2 py-1 text-sm"
            type="password"
            name="password"
            id="userPassword"
            value={form.password}
            data-testid="password-input"
            placeholder="비밀번호 8자리 이상 입력해주세요."
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <button
            className={`border rounded-lg box-border py-1 cursor-pointer w-1/2 text-white ${isSubmitDisabled ? 'bg-gray-300' : 'bg-blue-800'}`}
            data-testid="signin-button"
            disabled={isSubmitDisabled}
            onClick={() => {
              signInApi({form});
            }}
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
