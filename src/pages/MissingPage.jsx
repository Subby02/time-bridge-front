import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'; // useSearchParams 추가
import axios from 'axios';

import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import MissingCard from "../components/MissingCard";
import Pagination from '../components/Pagination';
import Footer from "../components/Footer";

import styles from './MissingPage.module.css';

export default function MissingPage() {
    const [searchParams, setSearchParams] = useSearchParams(); // searchParams 훅 사용
    const [cardData, setCardData] = useState([]);
    const [totalPages, setTotalPages] = useState(); 

    // URL 쿼리에서 'page' 값을 가져와 현재 페이지로 설정
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        const fetchMissingPersons = async () => {
            try {
                // API 호출 시 currentPage 대신 URL에서 가져온 값을 사용
                const response = await axios.post(`/api/posts/all_missing_search_missing?pageNum=${currentPage}`);
                const missingData = response.data.posts; 

                const transformedData = missingData.map(item => {
                    return {
                        id: item.mp_id,
                        originalImage: item.face_img_origin,
                        name: item.missing_name,
                        gender: item.gender_id,
                        birth: item.missing_birth,
                        place: item.missing_place,
                        date: item.missing_date,
                    };
                });
                
                setCardData(transformedData);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error("Error fetching missing persons data:", error);
                setCardData([]);
            }
        };

        fetchMissingPersons();
    }, [currentPage]); // currentPage가 변경될 때마다 API를 다시 호출합니다.

    // 페이지 변경 핸들러: URL 쿼리를 업데이트
    const handlePageChange = (page) => {
        setSearchParams({ page: page });
    };

    const calculatePageGroup = () => {
        const groupSize = 10;
        const startGroupPage = Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
        let endGroupPage = startGroupPage + groupSize - 1;

        if (endGroupPage > totalPages) {
            endGroupPage = totalPages;
        }

        return { startPage: startGroupPage, endPage: endGroupPage };
    };

    const { startPage, endPage } = calculatePageGroup();

    const getImageUrl = (path) => {
        if (!path) return null;
        return `http://202.31.202.8/images/${path}`;
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
                            originalImage={getImageUrl(item.originalImage)}
                            name={item.name}
                            gender={item.gender === 1 ? '남' : '여'}
                            birth={item.birth}
                            place={item.place}
                            date={item.date}
                        />
                    ))}
                </div>
                <Pagination
                    startPage={startPage}
                    endPage={endPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            <Footer/>
        </div>
    );
}