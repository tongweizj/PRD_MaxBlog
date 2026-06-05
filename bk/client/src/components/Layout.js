/*
  File name: layout.js
  Student’s Name: Wei Tong
  StudentID: 301034450
  Date: 20250201
*/
import React from 'react';
import Footer from './Footer';
import Header from './Header';
function Layout({ children }) {
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <Header />
      </header>

      {/* Content */}
      <main style={styles.content}>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;

// 内联样式
const styles = {
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // 使布局占满整个视口高度
  },
  header: {
    backgroundColor: '#319795',
    color: 'white',
    padding: '1rem',
    display: 'flex', // 使用 Flexbox 布局
    justifyContent: 'space-between', // Logo 在左，Nav 在右
    alignItems: 'center', // 垂直居中
  },

  content: {
    backgroundColor: '#fff',
    flex: 1, // 使内容区域占满剩余空间
    padding: '1rem',
    maxWidth: '800px', // 固定宽度
    width: '100%', // 确保宽度占满父容器
    margin: '0 auto', // 水平居中
  },
  footer: {
    backgroundColor: '#2d3748',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
  },
};
