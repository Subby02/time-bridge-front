import './Navbar.css'
import { Link } from 'react-router-dom';
import { RiUserSearchFill } from "react-icons/ri";
import { MdFamilyRestroom } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";

export default function Navbar() {
  return (
    <div>
      <div className="navbar">
        <Link className='navLogo' to="/"><h2>TimeBridge</h2></Link>

        <div className='navMenuGroup'>
            <Link className="navMenu" to="/"><RiUserSearchFill className='navIcon'/>실종자 찾기</Link>
            <Link className="navMenu" to="/"><MdFamilyRestroom className='navIcon'/>가족 찾기</Link>
            <Link className="navMenu" to="/"><FaHandshake className='navIcon'/>매칭 조회</Link>
        </div>

        <div className='navBtnGroup'>
            <Link className='btn' to="/login">로그인</Link>
            <Link className='btn' to="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
}