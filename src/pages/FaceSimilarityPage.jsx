import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Navbar from "../components/Navbar";
import Pagination from '../components/Pagination';
import Searchbar from '../components/Searchbar';

import { RiUserSearchFill } from "react-icons/ri";
import { MdFamilyRestroom } from "react-icons/md";

import styles from './FaceSimilarityPage.module.css';

export default function FaceSimilarityPage() {

    const [activeType, setActiveType] = useState('실종자');

    // 버튼 클릭 핸들러
    const handleTypeClick = (type) => {
        setActiveType(type);
    };

    return (
        <div>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.descriptionGroup}>
                    <h1 className={styles.title}>얼굴 유사도 순위 조회</h1>
                    <p className={styles.description}>가족이 등록한 이미지를 기반으로 나이 변환하여 생성된 이미지와 실종자가 올린 이미지의 얼굴 유사도를 순위로 확인 할 수 있습니다.</p>
                </div>
                <div className={styles.conditionContainer}>
                    <div className={styles.typeContainer}>
                        <button onClick={() => handleTypeClick('실종자')} className={activeType === '실종자' ? styles.typeActivatedBtn : styles.typeBtn}><RiUserSearchFill className={styles.icon}/>실종자</button>
                        <button onClick={() => handleTypeClick('가족')} className={activeType === '가족' ? styles.typeActivatedBtn : styles.typeBtn}><MdFamilyRestroom className={styles.icon}/>가족</button>
                    </div>
                    <Searchbar/>
                </div>
            </div>
        </div>
    );
}