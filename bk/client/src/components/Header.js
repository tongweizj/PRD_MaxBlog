/*
  File name: header.js
  Student’s Name: Wei Tong
  StudentID: 301034450
  Date: 20250201
*/
import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <>
      {/* Logo */}
      <div style={styles.logo}>
        <span style={styles.logoLetter}>M</span>
        <span style={styles.logoLetter}>A</span>
        <span style={styles.logoLetter}>X</span>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <Link to="/" style={styles.navItem}>
            <a href="/">Home</a>
          </Link>
          <Link to="/projects" style={styles.navItem}>
            <a href="/projects">Projects</a>
          </Link>
          <Link to="/services" style={styles.navItem}>
            <a href="/services">Services</a>
          </Link>
          <Link to="/about" style={styles.navItem}>
            <a href="/about">About</a>
          </Link>
          <Link to="/contact" style={styles.navItem}>
            <a href="/contact">Contact</a>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Header;
// 内联样式
const styles = {
  header: {
    backgroundColor: '#1E3A8A', // 时髦的深蓝色
    color: 'white',
    padding: '1rem',
    display: 'flex', // 使用 Flexbox 布局
    justifyContent: 'space-between', // Logo 在左，Nav 在右
    alignItems: 'center', // 垂直居中
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 阴影
  },
  logo: {
    display: 'flex',
    gap: '4px', // 字母之间的间距
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  logoLetter: {
    display: 'inline-block',
    padding: '0.5rem',
    backgroundColor: '#2563EB', // 亮蓝色
    borderRadius: '8px', // 圆角
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // 阴影
    transition: 'transform 0.2s ease-in-out', // 过渡动画
    ':hover': {
      transform: 'scale(1.1)', // 悬停时放大
    },
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem', // 导航项之间的间距
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: 0,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
    padding: '0.5rem 1rem',
    borderRadius: '8px', // 圆角
    transition: 'background-color 0.2s ease-in-out, transform 0.2s ease-in-out', // 过渡动画
    ':hover': {
      backgroundColor: '#2563EB', // 悬停时背景色
      transform: 'translateY(-2px)', // 悬停时上移
    },
  },
};
