import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios를 import 합니다.

import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/login', {
        user_id: username,
        user_pw: password,
      });

      // API 응답에 따라 로그인 처리
      if (response.data.success) { // 예시: API 응답에 success 필드가 있다고 가정
        console.log('로그인 성공:', response.data);
        alert('로그인에 성공했습니다.');
        navigate('/'); // 로그인 성공 후 홈페이지로 이동
      } else {
        console.log('로그인 실패:', response.data);
        alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해 주세요.');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      alert('로그인 중 오류가 발생했습니다. 서버 상태를 확인해 주세요.');
    }
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