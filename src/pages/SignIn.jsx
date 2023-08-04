import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      console.log("유효성 검사 통과");
    }
  };

  const isSubmitDisabled = !validateEmail() || !validatePassword();

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form className="flex flex-col w-1/4" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full mb-2">
          <label htmlFor="userEmail">Email</label>
          <input
            className="border-2 px-2 py-1 text-sm"
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
          <label htmlFor="userPassword">Password</label>
          <input
           className="border-2 px-2 py-1 text-sm"
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
            className="border-2 box-border py-1 cursor-pointer w-1/2"
            type="submit"
            data-testid="signin-button"
            disabled={isSubmitDisabled}
          >
            Login
          </button>
          <button
            className="border-2 py-1 cursor-pointer w-1/2"
            type="button"
            onClick={handleRegisterBtnClick}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
