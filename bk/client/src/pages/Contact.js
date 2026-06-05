/*
  File name: contact.js
  Student’s Name: Wei Tong
  StudentID: 301034450
  Date: 20250201
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: '',
  });

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData); // 打印表单数据到控制台
    alert('Thank you for your message! You will be redirected to the Home Page.');
    navigate('/'); // 重定向到主页
  };

  return (
    <Layout>
      <div style={styles.container}>
        {/* 标题 */}
        <h2 style={styles.title}>Contact Me</h2>

        {/* 联系信息面板 */}
        <div style={styles.contactPanel}>
          <h3 style={styles.contactTitle}>Contact Information</h3>
          <p style={styles.contactText}>
            <strong>Email:</strong> tongweizj@gmail.com
          </p>
          <p style={styles.contactText}>
            <strong>Phone:</strong> +1 (639) 916-0122
          </p>
          <p style={styles.contactText}>
            <strong>Address:</strong> 27 Richwood Dr, Markham, ON L3P 3Y7
          </p>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="firstName" style={styles.label}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="lastName" style={styles.label}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="contactNumber" style={styles.label}>
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="message" style={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              style={styles.textarea}
              required
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Contact;

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
  contactPanel: {
    backgroundColor: '#f7fafc', // 浅灰色背景
    borderRadius: '8px', // 圆角
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 阴影
  },
  contactTitle: {
    fontSize: '1.5rem',
    color: '#2C7A7B', // 主题色
    marginBottom: '1rem',
  },
  contactText: {
    fontSize: '1rem',
    color: '#4A5568', // 灰色文字
    marginBottom: '0.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem', // 表单项之间的间距
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem', // 标签和输入框之间的间距
  },
  label: {
    fontSize: '1rem',
    color: '#4A5568', // 灰色文字
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #e2e8f0', // 边框颜色
    borderRadius: '8px', // 圆角
    outline: 'none', // 移除默认轮廓
    ':focus': {
      borderColor: '#319795', // 聚焦时边框颜色
    },
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #e2e8f0', // 边框颜色
    borderRadius: '8px', // 圆角
    outline: 'none', // 移除默认轮廓
    resize: 'vertical', //
  },
  submitButton: {
    backgroundColor: '#fbeee0',
    border: '2px solid #422800',
    borderRadius: '30px',
    boxShadow: '#422800 4px 4px 0 0',
    color: '#422800',
    cursor: 'pointer',
    display: 'inline-block',
    fontWeight: '600',
    fontSize: '18px',
    padding: '0 18px',
    lineHeight: '50px',
    textAlign: 'center',
    textDecoration: 'none',
    userSelect: 'none',
    touchAction: 'manipulation',
  },
};
