import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';
import { RiUserSearchFill } from "react-icons/ri";
import { MdFamilyRestroom } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link className={styles.navLogo} to="/"><h2>TimeBridge</h2></Link>

      <div className={styles.navMenuGroup}>
          <Link className={styles.navMenu} to="/missing"><RiUserSearchFill className={styles.navIcon}/>실종자 찾기</Link>
          <Link className={styles.navMenu} to="/"><MdFamilyRestroom className={styles.navIcon}/>가족 찾기</Link>
          <Link className={styles.navMenu} to="/"><FaHandshake className={styles.navIcon}/>매칭 조회</Link>
      </div>

      <div className={styles.navBtnGroup}>
          <Link className='btn-mint' to="/login">로그인</Link>
          <Link className='btn-white' to="/register">회원가입</Link>
      </div>
    </div>
  );
}