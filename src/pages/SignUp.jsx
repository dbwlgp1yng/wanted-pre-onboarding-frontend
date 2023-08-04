import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { signUpApi } from "../api/signUpApi"; 

export default function SignUp() {
  //const navigate = useNavigate();
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
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form className="flex flex-col w-1/4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userEmail">이메일</label>
          <input
            type="text"
            id="userEmail"
            name="email"
            value={form.email}
            data-testid="email-input"
            placeholder="이메일을 입력해주세요."
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="userPassword">비밀번호</label>
          <input
            type="password"
            name="password"
            id="userPassword"
            value={form.password}
            data-testid="password-input"
            placeholder="비밀번호를 입력해주세요."
            onChange={handleChange}
          />
          {/* <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            placeholder="비밀번호가 맞지 않습니다."
            onChange={handleChange}
          /> */}
        </div>
        <button
          type="submit"
          data-testid="signup-button"
          disabled={isSubmitDisabled}
          onClick={signUpApi({form})}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
