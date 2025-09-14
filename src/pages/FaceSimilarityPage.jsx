import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Navbar from "../components/Navbar";
import Pagination from '../components/Pagination';
import Searchbar from '../components/Searchbar';
import FaceSimilarityCard from '../components/FaceSimilarityCard';

import { RiUserSearchFill } from "react-icons/ri";
import { MdFamilyRestroom } from "react-icons/md";

import styles from './FaceSimilarityPage.module.css';

const userLists = [
    {
        id: 0,
        originalImage: '../public/no-image.jpg',
        genImage: '../public/no-image.jpg',
        name: '홍길동',
        gender: '남',
        birth: '1990년 1월 1일',
    },
    {
        id: 1,
        originalImage: '../public/no-image.jpg',
        genImage: '../public/no-image.jpg',
        name: '김철수',
        gender: '남',
    },
    {
        id: 2,
        originalImage: '../public/no-image.jpg',
        genImage: '../public/no-image.jpg',
        name: '박영희',
        gender: '여',
    },
    {
        id: 3,
        originalImage: '../public/no-image.jpg',
        genImage: '../public/no-image.jpg',
        name: '이민호',
        gender: '남',
    },
]; 

const similarityLists= [
    {
        id: 1,
        rank: 1,
        similarity: 95.2,
        originalImage: '../public/no-image.jpg',
        genImage: '../public/no-image.jpg',
        name: '홍길동',
        gender: '남',
        birth: '1990년 1월 1일',
        place: '서울',
        date: '2023년 10월 26일'
    },
    {
        id: 2,
        rank: 2,
        similarity: 90.5,
        originalImage: '../public/no-image.jpg',
        genImage: '../public/no-image.jpg',
        name: '김철수',
        gender: '남',
        birth: '1991년 2월 2일',
        place: '부산',
        date: '2023년 11월 1일'
    },
    {
        id: 4,
        rank: 3,
        similarity: 88.7,
        originalImage: '../public/no-image.jpg',
        genImage: '../public/no-image.jpg',
        name: '이민호',
        gender: '남',
        birth: '1988년 4월 4일',
        place: '광주',
        date: '2023년 11월 15일'
    },
    {
        id: 6,
        rank: 4,
        similarity: 85.3,
        originalImage: '../public/no-image.jpg',
        genImage: '../public/no-image.jpg',
        name: '윤지훈',
        gender: '남',
        birth: '1993년 6월 6일',
        place: '강릉',
        date: '2023년 11월 25일'
    },
    {
        id: 8,
        rank: 5,
        similarity: 82.1,
        originalImage: '../public/no-image.jpg',
        genImage: '../public/no-image.jpg',
        name: '정우성',
        gender: '남',
        birth: '1987년 8월 8일',
        place: '수원',
        date: '2023년 12월 5일'
    },
    {
        id: 11,
        rank: 6,
        similarity: 78.9,
        originalImage: '../public/no-image.jpg',
        genImage: '../public/no-image.jpg',
        name: '서준영',
        gender: '남',
        birth: '1998년 11월 11일',
        place: '울산',
        date: '2023년 12월 20일'
    },
]; 

const selectUserCard = {
    originalImage: '../public/no-image.jpg',
    genImage: '../public/no-image.jpg',
    name: '홍길동',
    gender: '남',
    birth: '1990년 1월 1일',
    place: '서울',
    date: '2023년 10월 26일'
};

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
                    <select name='user' id='user' className={styles.select}>
                        {userLists.map((item) => (
                            <option value={item.id}>{item.name} ({item.gender})</option>
                        ))}
                    </select>
                </div>
                <div className={styles.faceSimilarityCardsContainer}>
                    <div className={styles.selectedUserContainer}>
                        <p className={styles.cardNameText}>{selectUserCard.name} ({selectUserCard.gender})</p>
                        <div className={styles.cardTextGroup}>
                            <div className={styles.keyTextGroup}>
                                <p className={styles.cardKeyText}>생년월일</p>
                                <p className={styles.cardKeyText}>실종장소</p>
                                <p className={styles.cardKeyText}>실종날짜</p>
                            </div>
                            <div className={styles.valueTextGroup}>
                                <p className={styles.cardValueText}>{selectUserCard.birth}</p>
                                <p className={styles.cardValueText}>{selectUserCard.place}</p>
                                <p className={styles.cardValueText}>{selectUserCard.date}</p>
                            </div>
                        </div>
                        <img src={selectUserCard.originalImage} className={styles.cardImage} />
                        <img src={selectUserCard.genImage} className={styles.cardImage} />
                    </div>
                    <div className={styles.faceSimilarityCardList}>
                        {similarityLists.map((item) => (
                            <FaceSimilarityCard rank={item.rank} similarity={item.similarity} originalImage={item.originalImage} genImage={item.genImage} name={item.name} gender={item.gender} birth={item.birth} place={item.place} date={item.date}></FaceSimilarityCard>  
                        ))}
                        <Pagination startPage={1} endPage={5}></Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
}