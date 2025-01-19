import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <main className={styles.main}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1 className={styles.mainHeading}>欢迎来到老年人服务平台</h1>
          <p className={styles.subHeading}>为您提供最贴心的专属服务。</p>
          <div className={styles.buttons}>
            <Link href="/profile" className={styles.button}>
              个人信息填写
            </Link>
            <Link href="/tasks" className={styles.button}>
              日程规划
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
