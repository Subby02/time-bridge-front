import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import MissingCard from "../components/MissingCard";
import Pagination from '../components/Pagination';

import styles from './MissingPage.module.css';

export default function MissingPage() {
    const [cardData, setCardData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10); // 임시로 설정, API 응답에 따라 변경 예정

    useEffect(() => {
        const fetchMissingPersons = async () => {
            try {
                const response = await axios.post(`/api/posts/all_missing_search_missing?pageNum=${currentPage}`);
                const missingData = response.data; // API 응답에서 데이터 배열을 가져옵니다.

                // API 응답 구조에 맞게 데이터 변환
                const transformedData = missingData.map(item => {
                    return {
                        id: item.mp_id,
                        originalImage: item.face_img_origin,
                        genImage: item.face_img_aging,
                        name: item.missing_name,
                        gender: item.gender,
                        birth: item.missing_birth,
                        place: item.missing_place,
                        date: item.missing_date,
                    };
                });
                
                setCardData(transformedData);
                // totalPages는 서버 응답에서 받아와야 하지만, 현재 API 명세에는 없으므로 임시로 10페이지로 설정
                // 실제 API에 전체 페이지 정보가 포함되어 있다면 setTotalPages로 업데이트하세요.
                // setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching missing persons data:", error);
                // API 호출 실패 시 빈 배열로 설정
                setCardData([]);
            }
        };

        fetchMissingPersons();
    }, [currentPage]); // currentPage가 변경될 때마다 API를 다시 호출합니다.

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Navbar/>
            <div className={styles.container}>
                <div className={styles.missingDescriptionGroup}>
                    <h1 className={styles.missingTitle}>실종자 찾기</h1>
                    <p className={styles.missingDescription}>실종자 본인이 등록한 실종자 게시판 입니다.</p>
                </div>
                <Searchbar/>
                <div className={styles.enrolBtn}>
                  <Link className="btn-mint" to="/missing-enrol">실종자 등록</Link>
                </div>
                <div className={styles.conditionContainer}>
                    {/* 조건 검색 UI가 여기에 들어갑니다. */}
                </div>
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
                <Pagination
                    startPage={1}
                    endPage={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}