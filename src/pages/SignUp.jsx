import React from "react";

export default function SignUp() {
  return (
    <div>
      회원가입 페이지
      <form action="">
        <input type="text" data-testid="email-input" placeholder="이메일을 입력해주세요." />
        <input type="text" data-testid="password-input" placeholder="비밀번호를 입력해주세요." />
        <button type="submit" data-testid="signup-button">회원가입</button>
      </form>
    </div>
  );
}
