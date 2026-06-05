/*
  File name: services.js
  Student’s Name: Wei Tong
  StudentID: 301034450
  Date: 20250201
*/

import React from 'react';
import Layout from '../components/Layout';

function Services() {
  // 服务数据
  const services = [
    {
      id: 1,
      name: 'Web Development',
      image: '/photo1.jpg',
      description:
        "I specialize in building responsive and user-friendly websites using modern technologies like React, JavaScript, and CSS. Whether it's a personal blog or a corporate site, I can bring your vision to life.",
    },
    {
      id: 2,
      name: 'Mobile App Development',
      image: '/photo2.jpg',
      description:
        'I develop cross-platform mobile applications using frameworks like React Native. From concept to deployment, I ensure your app is fast, reliable, and easy to use.',
    },
    {
      id: 3,
      name: 'General Programming',
      image: '/photo3.jpg',
      description:
        'I offer general programming services, including scripting, automation, and backend development. I work with languages like Python, JavaScript, and Java to solve complex problems.',
    },
    {
      id: 4,
      name: 'DevOps & Cloud',
      image: '/photo4.jpg',
      description:
        'Ensure applications are fault-tolerant & ultra-reliable with our DevOps & Security engineers.',
    },
  ];

  return (
    <Layout>
      <div style={styles.container}>
        {/* 标题 */}
        <h2 style={styles.title}>My Services</h2>

        {/* 服务列表 */}
        <div style={styles.servicesContainer}>
          {services.map((service) => (
            <div key={service.id} style={styles.serviceCard}>
              {/* 服务图片 */}
              <img src={service.image} alt={service.name} style={styles.serviceImage} />

              {/* 服务名称 */}
              <h3 style={styles.serviceName}>{service.name}</h3>

              {/* 服务描述 */}
              <p style={styles.serviceDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Services;

// 内联样式
const styles = {
  container: {
    maxWidth: '1200px', // 限制内容宽度
    margin: '0 auto', // 水平居中
    padding: '2rem 1rem', // 上下留白
  },
  title: {
    fontSize: '2rem',
    color: '#2C7A7B', // 主题色
    textAlign: 'center',
    marginBottom: '2rem',
  },
  servicesContainer: {
    display: 'flex',
    flexDirection: 'row', // 横向排列
    flexWrap: 'wrap', // 允许换行
    justifyContent: 'center', // 水平居中
    gap: '2rem', // 服务之间的间距
  },
  serviceCard: {
    flex: '1 1 300px', // 每个服务卡片的最小宽度为 300px
    maxWidth: '350px', // 限制卡片的最大宽度
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 阴影
    padding: '1rem',
    textAlign: 'center',
  },
  serviceImage: {
    width: '100%', // 图片宽度占满卡片
    height: '200px', // 固定高度
    objectFit: 'cover', // 图片填充
    borderRadius: '8px', // 圆角
    marginBottom: '1rem',
  },
  serviceName: {
    fontSize: '1.25rem',
    color: '#2C7A7B', // 主题色
    marginBottom: '0.5rem',
  },
  serviceDescription: {
    fontSize: '1rem',
    color: '#4A5568', // 灰色文字
    lineHeight: '1.6', // 行高
  },
};
