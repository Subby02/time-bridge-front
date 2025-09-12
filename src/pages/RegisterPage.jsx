import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 로직 처리
    console.log('Username:', username);
    console.log('Password:', password);
    // 로그인 성공 후 홈페이지로 이동
    navigate('/login');
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleLogin} className={styles.registerForm}>
        <h2 className={styles.formTitle}>회원가입</h2>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.formLabel}>아이디</label>
          <input
            type="text"
            id="username"
            className={styles.formInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>이메일</label>
          <input
            type="email"
            id="email"
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>이름</label>
          <input
            type="text"
            id="name"
            className={styles.formInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="birth" className={styles.formLabel}>생년월일</label>
          <input
            type="date"
            id="birth"
            className={styles.formInput}
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>비밀번호</label>
          <input
            type="password"
            id="password"
            className={styles.formInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="passwordCheck" className={styles.formLabel}>비밀번호 확인</label>
          <input
            type="password"
            id="passwordCheck"
            className={styles.formInput}
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
          />
        </div>
        <div className={styles.formLinks}>
          <Link to="/login" className={styles.link}>로그인</Link>
        </div>
        <button type="submit" className="btn" disabled={true}>회원가입</button>
      </form>
    </div>
  );
}