import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 로직 처리
    console.log('Username:', username);
    console.log('Password:', password);
    // 로그인 성공 후 홈페이지로 이동
    navigate('/');
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h2 className={styles.formTitle}>로그인</h2>
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
        <div className={styles.formLinks}>
          <Link to="/register" className={styles.link}>회원가입</Link>
          <Link to="/" className={styles.link}>아이디/비밀번호 찾기</Link>
        </div>
        <button type="submit" className="btn-mint">로그인</button>
      </form>
    </div>
  );
}