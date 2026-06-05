/*
  File name: about.js
  Student’s Name: Wei Tong
  StudentID: 301034450
  Date: 20250201
*/

import React from 'react';
import Layout from '../components/Layout';

function About() {
  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>About Me</h2>

        {/* 内容区域 */}
        <div style={styles.content}>
          {/* 个人照片 */}
          <div style={styles.imageContainer}>
            <img src="/max-avator.jpg" alt="Profile" style={styles.image} />
          </div>

          {/* 个人信息 */}
          <div style={styles.infoContainer}>
            {/* 真实姓名 */}
            <h3 style={styles.legalName}>Wei Tong</h3>

            {/* 个人介绍 */}
            <p style={styles.bio}>
              Hello! My name is Wei Tong, and I am a passionate software developer with over 5 years
              of experience in building web applications. I specialize in front-end development
              using modern technologies like React, JavaScript, and CSS. I am always eager to learn
              new skills and take on challenging projects that push me to grow both personally and
              professionally.
            </p>

            {/* 简历链接  download="WeiTong_Resume.pdf" */}
            <a href="/resume.pdf" target="_blank" style={styles.resumeLink}>
              Download My Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;

// 内联样式
const styles = {
  container: {
    maxWidth: '800px', // 限制内容宽度
    margin: '0 auto', // 水平居中
    padding: '2rem 1rem', // 上下留白
  },
  title: {
    fontSize: '2rem',
    color: '#2C7A7B', // 主题色
    textAlign: 'center',
    marginBottom: '2rem',
  },
  content: {
    display: 'flex',
    flexDirection: 'row', // 横向排列
    alignItems: 'flex-start', // 顶部对齐
    gap: '2rem', // 图片和文字之间的间距
  },
  imageContainer: {
    flexShrink: 0, // 防止图片被压缩
  },
  image: {
    width: '200px', // 图片宽度
    height: 'auto', // 高度自适应
    borderRadius: '8px', // 圆角
  },
  infoContainer: {
    flex: 1, // 占据剩余空间
  },
  legalName: {
    fontSize: '1.5rem',
    color: '#2C7A7B', // 主题色
    marginBottom: '1rem',
  },
  bio: {
    fontSize: '1rem',
    color: '#4A5568', // 灰色文字
    lineHeight: '1.6', // 行高
    marginBottom: '1.5rem',
  },
  resumeLink: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#319795', // 主题色
    borderRadius: '8px',
    textDecoration: 'none', // 移除链接下划线
    transition: 'background-color 0.2s ease-in-out',
    ':hover': {
      backgroundColor: '#2C7A7B', // 悬停时颜色变深
    },
  },
};
