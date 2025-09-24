import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from "../components/Navbar";
import Pagination from '../components/Pagination';
import FaceSimilarityCard from '../components/FaceSimilarityCard';

import { RiUserSearchFill } from "react-icons/ri";
import { MdFamilyRestroom } from "react-icons/md";

import styles from './FaceSimilarityPage.module.css';

export default function FaceSimilarityPage() {
    const [activeType, setActiveType] = useState('실종자');
    const [data, setData] = useState({
        missing_posts: [],
        family_posts: []
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [similarityLists, setSimilarityLists] = useState([]); // 새로운 상태 추가

    // API 호출 및 데이터 로딩 (초기 실종자/가족 목록)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('api/posts/register_missing_search');
                const apiData = response.data;
                setData(apiData);
                
                // 초기 선택된 사용자 설정
                if (apiData.missing_posts.length > 0) {
                    setSelectedUser(apiData.missing_posts[0]);
                }
            } catch (error) {
                console.error('초기 API 호출 중 오류 발생:', error);
            }
        };

        fetchData();
    }, []);

    // selectedUser가 변경될 때마다 유사도 API 호출
    useEffect(() => {
        if (selectedUser) {
            const fetchSimilarityData = async () => {
                try {
                    const id = selectedUser.mp_id || selectedUser.fp_id;
                    const response = await axios.post(`/api/posts/image_similarity`, null, {
                        params: {
                            missingId: id,
                        },
                    });
                    setSimilarityLists(response.data); // 응답 데이터로 상태 업데이트
                } catch (error) {
                    console.error('유사도 API 호출 중 오류 발생:', error);
                    setSimilarityLists([]); // 오류 발생 시 목록 초기화
                }
            };

            fetchSimilarityData();
        }
    }, [selectedUser, activeType]);

    // 버튼 클릭 핸들러
    const handleTypeClick = (type) => {
        setActiveType(type);
        setSelectedUser(type === '실종자' ? data.missing_posts[0] : data.family_posts[0]);
    };

    // 사용자 선택 핸들러
    const handleUserSelect = (event) => {
        const selectedId = event.target.value;
        let user;
        if (activeType === '실종자') {
            user = data.missing_posts.find(item => item.mp_id === selectedId);
        } else {
            user = data.family_posts.find(item => item.fp_id === selectedId);
        }
        setSelectedUser(user);
    };

    // 이미지 URL을 결합하는 유틸리티 함수
    const getImageUrl = (path) => {
        if (!path) return null;
        return `http://202.31.202.8/images/${path}`;
    };

    const userList = activeType === '실종자' ? data.missing_posts : data.family_posts;
    // 이제 similarityLists 상태를 사용하여 유사도 카드 렌더링
    
    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.descriptionGroup}>
                    <h1 className={styles.title}>얼굴 유사도 순위 조회</h1>
                    <p className={styles.description}>가족이 등록한 이미지를 기반으로 나이 변환하여 생성된 이미지와 실종자가 올린 이미지의 얼굴 유사도를 순위로 확인 할 수 있습니다.</p>
                </div>
                <div className={styles.conditionContainer}>
                    <div className={styles.typeContainer}>
                        <button onClick={() => handleTypeClick('실종자')} className={activeType === '실종자' ? styles.typeActivatedBtn : styles.typeBtn}><RiUserSearchFill className={styles.icon} />실종자</button>
                        <button onClick={() => handleTypeClick('가족')} className={activeType === '가족' ? styles.typeActivatedBtn : styles.typeBtn}><MdFamilyRestroom className={styles.icon} />가족</button>
                    </div>
                    <select
                        name='user'
                        id='user'
                        className={styles.select}
                        onChange={handleUserSelect}
                        value={selectedUser ? (selectedUser.mp_id || selectedUser.fp_id) : ''}
                    >
                        {userList.map((item) => (
                            <option key={item.mp_id || item.fp_id} value={item.mp_id || item.fp_id}>
                                {item.missing_name} ({item.gender_id === 1 ? '남' : '여'})
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.faceSimilarityCardsContainer}>
                    <div className={styles.selectedUserContainer}>
                        {selectedUser && (
                            <>
                                <p className={styles.cardNameText}>{selectedUser.missing_name} ({selectedUser.gender_id === 1 ? '남' : '여'})</p>
                                <div className={styles.cardTextGroup}>
                                    <div className={styles.keyTextGroup}>
                                        <p className={styles.cardKeyText}>생년월일</p>
                                        <p className={styles.cardKeyText}>실종장소</p>
                                        <p className={styles.cardKeyText}>실종날짜</p>
                                    </div>
                                    <div className={styles.valueTextGroup}>
                                        <p className={styles.cardValueText}>{selectedUser.missing_birth}</p>
                                        <p className={styles.cardValueText}>{selectedUser.missing_place}</p>
                                        <p className={styles.cardValueText}>{selectedUser.missing_date}</p>
                                    </div>
                                </div>
                                <div className={styles.imageContainer}>
                                    <img src={getImageUrl(selectedUser.face_img_origin)} className={styles.cardImage}/>
                                    {selectedUser.face_img_aging && 
                                        <img src={getImageUrl(selectedUser.face_img_aging)} className={styles.cardImage} />
                                    }
                                </div>
                            </>
                        )}
                    </div>
                    <div className={styles.faceSimilarityCardList}>
                        {similarityLists.length > 0 ? (
                            similarityLists.map((item, index) => (
                                <FaceSimilarityCard 
                                    key={item.id}
                                    rank={index + 1}
                                    similarity={item.similarity_score}
                                    originalImage={getImageUrl(item.original_image_path)}
                                    genImage={getImageUrl(item.gen_image_path)}
                                    name={item.name}
                                    gender={item.gender}
                                    birth={item.birth_date}
                                    place={item.missing_place}
                                    date={item.missing_date}
                                />
                            ))
                        ) : (
                            <p>유사도 순위 정보가 없습니다.</p>
                        )}
                        <Pagination startPage={1} endPage={5} />
                    </div>
                </div>
            </div>
        </div>
    );
}