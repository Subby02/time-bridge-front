import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import MissingCard from "../components/MissingCard";
import Pagination from '../components/Pagination';

import styles from './MissingPage.module.css';

const cardData = [
  {
    id: 1,
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
    originalImage: '../public/no-image.jpg',
    genImage: '../public/no-image.jpg',
    name: '김철수',
    gender: '남',
    birth: '1991년 2월 2일',
    place: '부산',
    date: '2023년 11월 1일'
  },
  {
    id: 3,
    originalImage: '../public/no-image.jpg',
    genImage: '../public/no-image.jpg',
    name: '박영희',
    gender: '여',
    birth: '1992년 3월 3일',
    place: '대구',
    date: '2023년 11월 10일'
  },
  {
    id: 4,
    originalImage: '../public/no-image.jpg',
    genImage: '../public/no-image.jpg',
    name: '이민호',
    gender: '남',
    birth: '1988년 4월 4일',
    place: '광주',
    date: '2023년 11월 15일'
  },
  {
    id: 5,
    originalImage: '../public/no-image.jpg',
    genImage: '../public/no-image.jpg',
    name: '최은지',
    gender: '여',
    birth: '1995년 5월 5일',
    place: '제주',
    date: '2023년 11월 20일'
  },
  {
    id: 6,
    originalImage: '../public/no-image.jpg',
    genImage: '../public/no-image.jpg',
    name: '윤지훈',
    gender: '남',
    birth: '1993년 6월 6일',
    place: '강릉',
    date: '2023년 11월 25일'
  },
  {
    id: 7,
    originalImage: '../public/no-image.jpg',
    genImage: '../public/no-image.jpg',
    name: '장미나',
    gender: '여',
    birth: '1994년 7월 7일',
    place: '대전',
    date: '2023년 12월 1일'
  },
  {
    id: 8,
    originalImage: '../public/no-image.jpg',
    genImage: '../public/no-image.jpg',
    name: '정우성',
    gender: '남',
    birth: '1987년 8월 8일',
    place: '수원',
    date: '2023년 12월 5일'
  },
  {
    id: 9,
    originalImage: '../public/no-image.jpg',
    genImage: '../public/no-image.jpg',
    name: '한지원',
    gender: '여',
    birth: '1996년 9월 9일',
    place: '인천',
    date: '2023년 12월 10일'
  },
  {
    id: 10,
    originalImage: '../public/no-image.jpg',
    genImage: '../public/no-image.jpg',
    name: '조은비',
    gender: '여',
    birth: '1997년 10월 10일',
    place: '전주',
    date: '2023년 12월 15일'
  },
  {
    id: 11,
    originalImage: '../public/no-image.jpg',
    genImage: '../public/no-image.jpg',
    name: '서준영',
    gender: '남',
    birth: '1998년 11월 11일',
    place: '울산',
    date: '2023년 12월 20일'
  },
  {
    id: 12,
    originalImage: '../public/no-image.jpg',
    genImage: '../public/no-image.jpg',
    name: '구민서',
    gender: '여',
    birth: '1999년 12월 12일',
    place: '창원',
    date: '2023년 12월 25일'
  }
];

export default function MissingPage() {
  return (
    <div>
        <Navbar/>
        <div className={styles.container}>
          <div className={styles.missingDescriptionGroup}>
            <h1 className={styles.missingTitle}>실종자 찾기</h1>
            <p className={styles.missingDescription}>가족들이 등록한 실종자 게시판</p>
          </div>
          <Searchbar/>
          <div className={styles.cardListContainer}>
              {cardData.map((item) => (
                  <MissingCard 
                      key={item.id}
                      originalImage={item.originalImage}
                      genImage={item.genImage}
                      name={item.name}
                      gender={item.gender}
                      birth={item.birth}
                      place={item.place}
                      date={item.date}
                  />
              ))}
          </div>
          <Pagination startPage={1} endPage={10}/>
        </div>
    </div>
  );
}