/*
  File name: home.js
  Student’s Name: Wei Tong
  StudentID: 301034450
  Date: 20250201
*/

import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function Home() {
  return (
    <Layout>
      <div style={styles.container}>
        {/* 欢迎信息 */}
        <h2 style={styles.welcomeMessage}>Welcome to Wei Tong's Portfolio!</h2>

        {/* subText 和图片 */}
        <div style={styles.content}>
          <div style={styles.textContainer}>
            <p style={styles.subText}>
              My name is Wei Tong, I am a fullstack developer and product manager!
              <br />
              Feel free to explore and learn more about me and my projects.
            </p>
          </div>
          <div style={styles.imageContainer}>
            <img src="/max.png" alt="Placeholder" style={styles.image} />
          </div>
        </div>

        {/* 跳转链接/按钮 */}
        <div style={styles.linksContainer}>
          <Link to="/about" style={styles.link}>
            <button style={styles.button}>About Me</button>
          </Link>
          <Link to="/projects" style={styles.link}>
            <button style={styles.button}>My Projects</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Home;

// 内联样式
const styles = {
  container: {
    textAlign: 'center', // 内容居中
  },
  welcomeMessage: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#2C7A7B', // 主题色
  },
  content: {
    display: 'flex', // 使用 Flexbox 布局
    justifyContent: 'center', // 水平居中
    alignItems: 'flex-start', // 顶部对齐
    gap: '2rem', // subText 和图片之间的间距
    marginBottom: '2rem', // 与按钮的间距
  },
  textContainer: {
    maxWidth: '400px', // 限制 subText 的宽度
    textAlign: 'left', // 文字左对齐
  },
  subText: {
    fontSize: '1.2rem',
    color: '#4A5568', // 灰色文字
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'flex-end', // 图片底部对齐
  },
  image: {
    width: '200px', // 图片宽度
    height: 'auto', // 高度自适应
    borderRadius: '8px', // 圆角
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem', // 按钮之间的间距
  },
  link: {
    textDecoration: 'none', // 移除链接下划线
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#319795', // 主题色
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
    ':hover': {
      backgroundColor: '#2C7A7B', // 悬停时颜色变深
    },
  },
};
