import './Navbar.css'
import { Link } from 'react-router-dom';
import { RiUserSearchFill } from "react-icons/ri";
import { MdFamilyRestroom } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";

export default function Navbar() {
  return (
    <div>
      <div className="navbar">
        <Link className='nav-logo' to="/"><h2>TimeBridge</h2></Link>

        <div className='nav-menu-group'>
            <Link className="nav-menu" to="/"><RiUserSearchFill className='nav-icon'/>실종자 찾기</Link>
            <Link className="nav-menu" to="/"><MdFamilyRestroom className='nav-icon'/>가족 찾기</Link>
            <Link className="nav-menu" to="/"><FaHandshake className='nav-icon'/>매칭 조회</Link>
        </div>

        <div className='nav-btn-group'>
            <Link className='login-btn' to="/login">로그인</Link>
            <Link className='signup-btn'  to="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
}