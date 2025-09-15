import Navbar from "../components/Navbar";

import styles from './FamilyEnrolPage.module.css';


export default function MissingEnrolPage() {
  return (
    <div>
        <Navbar/>
        <div className={styles.container}>
            <div className={styles.descriptionGroup}>
              <h1 className={styles.title}>실종자 등록 (가족)</h1>
              <p className={styles.description}>가족이 실종자를 등록하는 페이지 입니다.</p>
            </div>
            <div className={styles.missingEnrolContainer}> 
               <div className={styles.imageContainer}>
                <div className={styles.inputContainer}>
                  <label for="input-image">
                  <div className={styles.inputImageContainer}><p className={styles.description}>실종자 사진을 드래그 하거나 선택 해주세요.</p></div>
                  </label>
                  <div className={styles.btnGroup}>
                    <button className="btn-mint">이미지 생성</button>
                    <button className="btn-mint">이미지 삭제</button>
                  </div>
                </div>
                <img src="../public/no-image.jpg" className={styles.outputImageContainer}></img>
                <input type="file" id="input-image" accept="image/*" style={{display:"none"}}/>
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
              </div>
            </div>
            <div className={styles.enrolBtn}>
              <button className="btn-mint">등록</button>
            </div>
        </div>
    </div>
  );
}