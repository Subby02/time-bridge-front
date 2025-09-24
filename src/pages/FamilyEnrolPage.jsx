import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import styles from './FamilyEnrolPage.module.css';


export default function MissingEnrolPage() {
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [resultImageSrc, setResultImageSrc] = useState("");
  const [missingSituation, setMissingSituation] = useState("");
  const [missingExtraEvidence, setMissingExtraEvidence] = useState("");
  const sessionId = "a2592bf9-7793-4753-acfd-2125576d986a";

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

  const handleFormSubmit = async (e) => {
      e.preventDefault();

      // 폼 필드에서 데이터 가져오기
      const name = document.getElementById('name').value;
      const gender = document.getElementById('gender').value;
      const birth = document.getElementById('birth').value;
      const missingDate = document.getElementById('missingDate').value;
      const missing_place = `${document.getElementById('do').value} ${document.getElementById('si').value} ${document.getElementById('dong').value}`;

      // 필수 필드 유효성 검사
      if (!name || !birth || !missingDate || !imageFile || !resultImageSrc) {
          alert('모든 필수 정보를 입력하고, 이미지 생성을 먼저 진행해 주세요.');
          return;
      }

      const formData = new FormData();
      formData.append('type', 1);
      formData.append('name', name);
      formData.append('img_origin', imageFile); // 원본 이미지
      
      // 생성된 이미지가 있을 경우에만 추가
      if (resultImageSrc) {
          // URL을 fetch하여 Blob으로 변환 후 FormData에 추가
          const agingImageBlob = await fetch(resultImageSrc).then(res => res.blob());
          formData.append('img_aging', agingImageBlob, 'aged_image.png');
      }
      
      // 임의의 세션 ID 생성
      formData.append('session_id', sessionId);
      
      formData.append('gender', gender);
      formData.append('birth', birth);
      formData.append('missingDate', missingDate);
      formData.append('missing_situation', missingSituation);
      formData.append('missing_extra_evidence', missingExtraEvidence);
      formData.append('missing_place', missing_place);
      formData.append('photo_age', 0); // 연령 추정치는 0으로 고정

      try {
          const response = await axios.post('/api/posts/upload', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          console.log('등록 성공:', response.data);
          alert('실종자 정보가 성공적으로 등록되었습니다!');
      } catch (error) {
          console.error('등록 실패:', error.response ? error.response.data : error.message);
          alert('등록 실패!');
      }
  };
  return (
    <div>
      <Navbar/>
      <form onSubmit={handleFormSubmit} className={styles.container}>
          <div className={styles.descriptionGroup}>
              <h1 className={styles.title}>실종자 등록 (가족)</h1>
              <p className={styles.description}>가족이 실종자를 등록하는 페이지 입니다.</p>
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
                  {resultImageSrc ? (
                      <img src={resultImageSrc} className={styles.outputImageContainer}/>
                  ) : (
                      <div className={styles.outputImageContainer}>
                          <p>생성 이미지</p>
                      </div>
                  )}
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
                  {/* --- 새로운 필드 추가 --- */}
                  <div className={styles.infoOneContainer}>
                      <p className={styles.infoKey}>실종 상황</p>
                      <textarea
                          id="missingSituation"
                          className={styles.textArea}
                          value={missingSituation}
                          onChange={(e) => setMissingSituation(e.target.value)}
                          rows="4"
                      />
                  </div>
                  <div className={styles.infoOneContainer}>
                      <p className={styles.infoKey}>인상착의</p>
                      <textarea
                          id="missingExtraEvidence"
                          className={styles.textArea}
                          value={missingExtraEvidence}
                          onChange={(e) => setMissingExtraEvidence(e.target.value)}
                          rows="4"
                      />
                  </div>
                  {/* --- 기존 버튼 그룹 --- */}
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
          <div className={styles.enrolBtn}>
              <button type="submit" className="btn-mint">등록</button>
          </div>
      </form>
  </div>
  );
}