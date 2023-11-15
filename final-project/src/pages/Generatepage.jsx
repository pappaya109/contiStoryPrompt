import React, { useState } from 'react'
import {useSelector} from "react-redux";
import styles from './Generatepage.module.scss'
import HeaderNav from '../features/generate/components/HeaderNav'
import ToggleBtn from '../features/ui/toggleBtn/ToggleBtn'
import CutsNumber from '../features/generate/components/CutsNumber'
import Prompts from '../features/generate/components/Prompts'
import BoxItem from '../features/ui/BoxItem/BoxItem'
import axios from 'axios'
import ColorButton from '../features/ui/button/ColorButton/ColorButton';
const Generatepage = () => {
const [image, updateImage] = useState()
const promptsList = useSelector((state) => state.cur_project.prompts);

  const generate = async (prompt) => {
    const result = await axios.get(
      `http://184.145.163.125:41226/?prompt==${prompt}`
    );
    console.log(result);
    updateImage(result.data);
  };

  return (
    <div className={styles.Wrapper}>
      <nav className={styles.navBar}>
        <HeaderNav />
      </nav>
      <div className={styles.contentsWrapper}>
        <section className={styles.designTab}>
          <ToggleBtn tab1={"생성"} tab2={"편집"} />
          <BoxItem title={"생성할 컷 수 지정"} />
          <CutsNumber />
          <BoxItem title={'콘티 내용 입력'} />
          <div className={styles.promptsBox}>
            <Prompts />
          </div>
          <ColorButton text={'생성하기'} func={generate} parameter={promptsList[0]}/>
        </section>
        <section className={styles.canvas}>
          {image? <img src={`data:image/png;base64,${image}`} alt="표시" /> : null}
        </section>
        <section className={styles.designTab}></section>
      </div>
    </div>
  );
}

export default Generatepage
