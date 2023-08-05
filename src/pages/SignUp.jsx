import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../utils/API";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    })
  };

  const validateEmail = () => {
    const isValid = form.email.includes("@");
    return isValid;
  };
  const validatePassword = () => {
    const isValid = form.password.length >= 8;
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(form.password !== form.confirmPassword) {
    //   return alert('비밀번호가 일치하지 않습니다.');
    // }
  };

  const isSubmitDisabled = !validateEmail() || !validatePassword();

  const signUpApi = ({ form }) => {
    const userData = {
      email: `${form.email}`,
      password: `${form.password}`,
    };
    API.post('/auth/signup', userData)
        .then((response) => {
            if(response.status === 201) {
              navigate('/signin');
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
        <div>
          <button
            className={`border rounded-lg box-border py-1 cursor-pointer w-full text-white ${isSubmitDisabled ? 'bg-gray-300' : 'bg-blue-800'}`}
            type="submit"
            data-testid="signup-button"
            disabled={isSubmitDisabled}
            onClick={() => signUpApi({form})}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

