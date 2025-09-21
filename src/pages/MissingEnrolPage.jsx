import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import styles from './MissingEnrolPage.module.css';

export default function MissingEnrolPage() {
    const [imageSrc, setImageSrc] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [resultImageSrc, setResultImageSrc] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file); // Save the file object
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImageSrc("");
        }
    };

    const handleImageGeneration = async () => {
        const birthDateInput = document.getElementById('birth');
        const missingBirth = birthDateInput.value;

        if (!imageFile || !missingBirth) {
            alert('이미지와 생년월일을 모두 입력해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('img', imageFile);
        formData.append('missing_birth', missingBirth);

        try {
            const response = await axios.post('/api/posts/img_aging', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            });
            const imageUrl = URL.createObjectURL(response.data);
            setResultImageSrc(imageUrl);
            alert('이미지 생성 성공!');
        } catch (error) {
            console.error('이미지 생성 실패:', error);
            alert('이미지 생성 실패!');
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // TODO: 등록 버튼 클릭 시 실제 데이터 전송 로직 추가
        console.log("Form Submitted");
    };

    return (
        <div>
            <Navbar/>
            <form onSubmit={handleFormSubmit} className={styles.container}>
                <div className={styles.descriptionGroup}>
                    <h1 className={styles.title}>실종자 등록 (본인)</h1>
                    <p className={styles.description}>실종자 본인이 실종자를 등록하는 페이지 입니다.</p>
                </div>
                <div className={styles.missingEnrolContainer}>
                    <div className={styles.imageContainer}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="input-image">
                                <div className={styles.inputImageContainer}>
                                    {imageSrc ? (
                                        <img src={imageSrc} className={styles.previewImage} alt="선택 이미지 미리보기"/>
                                    ) : (
                                        <p className={styles.description}>실종자 사진을 드래그 하거나 선택 해주세요.</p>
                                    )}
                                </div>
                            </label>
                        </div>
                        <div className={styles.infoContainer}>
                            <div className={styles.infoOneContainer}>
                                <p className={styles.infoKey}>이름</p>
                                <input
                                    type="text"
                                    id="name"
                                    className={styles.formInput}
                                    required
                                />
                            </div>
                            <div className={styles.infoOneContainer}>
                                <p className={styles.infoKey}>성별</p>
                                <select name='gender' id='gender' className={styles.select}>
                                    <option value="남">남</option>
                                    <option value="여">여</option>
                                </select>
                            </div>
                            <div className={styles.infoOneContainer}>
                                <p className={styles.infoKey}>생년월일</p>
                                <input
                                    type="date"
                                    id="birth"
                                    className={styles.formInput}
                                    required
                                />
                            </div>
                            <div className={styles.infoOneContainer}>
                                <p className={styles.infoKey}>실종날짜</p>
                                <input
                                    type="date"
                                    id="missingDate"
                                    className={styles.formInput}
                                    required
                                />
                            </div>
                            <div className={styles.infoOneContainer}>
                                <p className={styles.infoKey}>실종장소</p>
                                <select name='do' id='do' className={styles.select}>
                                    <option value="광역시도">광역시도</option>
                                </select>
                                <select name='si' id='si' className={styles.select}>
                                    <option value="시군구">시군구</option>
                                </select>
                                <select name='dong' id='dong' className={styles.select}>
                                    <option value="읍면동">읍면동</option>
                                </select>
                            </div>
                            <div className={styles.btnGroup}>
                                <button type="button" className="btn-mint" onClick={handleImageGeneration}>이미지 생성</button>
                                <button type="button" className="btn-mint" onClick={() => setResultImageSrc("")}>이미지 삭제</button>
                            </div>
                        </div>
                        <input
                            type="file"
                            id="input-image"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </div>
                    {resultImageSrc ? (
                        <img src={resultImageSrc} className={styles.outputImageContainer}/>
                    ) : (
                        <div className={styles.outputImageContainer}>
                            <p>생성 이미지</p>
                        </div>
                    )}
                </div>
                <div className={styles.enrolBtn}>
                    <button type="submit" className="btn-mint">등록</button>
                </div>
            </form>
        </div>
    );
}