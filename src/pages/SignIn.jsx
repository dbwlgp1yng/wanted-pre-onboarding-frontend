import React from "react";
import { useState } from "react";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  });

  const validateEmail = () => {
    const isValid = form.email.includes("@");
    //console.log(`@ 포함인지 ${isValid}`);
    return isValid;
  };
  const validatePassword = () => {
    const isValid = form.password.length >= 8;
    return isValid;
  };

  const isEmailValid = validateEmail();
  console.log(`isEmailValid ${isEmailValid}`)
  const isPasswordValid = validatePassword();
  console.log(`isPasswordValid ${isPasswordValid}`)
  
  const handleChangeEmail = (e) => {
    return setForm({
      ...form,
      email: e.target.value,
      emailError: isEmailValid ? "" : '이메일 주소에는 "@"가 포함되어야 합니다.',
    });
  };
  const handleChangePassword = (e) => {
    return setForm({
      ...form,
      password: e.target.value,
      passwordError: isPasswordValid ? "" : "비밀번호는 8자 이상이어야 합니다.",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      console.log("유효성 검사 통과");
    }
  };

  const isSubmitDisabled = !validateEmail() || !validatePassword();
  //console.log(`disabled ${isSubmitDisabled}`);

  return (
    <div>
      로그인 페이지
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userEmail">이메일</label>
          <input
            type="text"
            id="userEmail"
            name="email"
            value={form.email}
            data-testid="email-input"
            placeholder="이메일을 입력해주세요."
            onChange={handleChangeEmail}
          />
          {form.emailError && (
            <span style={{ color: "red" }}>{form.emailError}</span>
          )}
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
            onChange={handleChangePassword}
          />
          {form.passwordError && (
            <span style={{ color: "red" }}>{form.passwordError}</span>
          )}
        </div>
        <button
          type="submit"
          data-testid="signin-button"
          disabled={isSubmitDisabled}
        >
          로그인
        </button>
      </form>
    </div>
  );
}
