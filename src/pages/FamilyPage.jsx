import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import FamilyCard from "../components/FamilyCard";
import Pagination from '../components/Pagination';

import styles from './FamilyPage.module.css';

export default function FamilyPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [cardData, setCardData] = useState([]);
    const [totalPages, setTotalPages] = useState(); // 임시로 설정, API 응답에 따라 변경 예정

    // URL 쿼리 파라미터에서 현재 페이지를 가져옵니다.
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        const fetchFamilyPosts = async () => {
            try {
                // API 호출 시 currentPage 대신 URL에서 가져온 값을 사용합니다.
                const response = await axios.post(`/api/posts/all_missing_search_family?pageNum=${currentPage}`);
                const familyData = response.data.posts;

                // API 응답 구조에 맞게 데이터 변환
                const transformedData = familyData.map(item => {
                    return {
                        id: item.fp_id,
                        originalImage: item.face_img_origin,
                        genImage: item.face_img_aging,
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
                console.error("Error fetching family posts data:", error);
                setCardData([]);
            }
        };

        fetchFamilyPosts();
    }, [currentPage]); // currentPage가 변경될 때마다 API를 다시 호출합니다.

    // 페이지 변경 핸들러: URL 쿼리를 업데이트합니다.
    const handlePageChange = (page) => {
        setSearchParams({ page: page });
    };

    // 페이지네이션 그룹을 계산하는 함수
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
                    <h1 className={styles.missingTitle}>가족 찾기</h1>
                    <p className={styles.missingDescription}>가족들이 등록한 실종자 게시판 입니다.</p>
                </div>
                <Searchbar/>
                <div className={styles.enrolBtn}>
                    <Link className="btn-mint" to="/family-enrol">실종자 등록</Link>
                </div>
                <div className={styles.conditionContainer}>
                    {/* 조건 검색 UI가 여기에 들어갑니다. */}
                </div>
                <div className={styles.cardListContainer}>
                    {cardData.map((item) => (
                        <FamilyCard 
                            key={item.id}
                            originalImage={getImageUrl(item.originalImage)}
                            genImage={getImageUrl(item.genImage)}
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
        </div>
    );
}