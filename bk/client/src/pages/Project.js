/*
  File name: project.js
  Student’s Name: Wei Tong
  StudentID: 301034450
  Date: 20250201
*/

import React from 'react';
import Layout from '../components/Layout';

function Projects() {
  // 项目数据
  const projects = [
    {
      id: 1,
      name: 'Project 1: React Tongji Bistro',
      image: '/photo1.jpg',
      description:
        'Developed a full-stack e-commerce website using React and Node.js. My role included designing the front-end interface and integrating payment gateways.',
    },
    {
      id: 2,
      name: 'Project 2: Task Management App',
      image: '/photo2.jpg',
      description:
        'Built a task management application with a team of 4 developers. I was responsible for implementing the back-end API using Express.js and MongoDB.',
    },
    {
      id: 3,
      name: 'Project 3: Mobile Vocabulary App',
      image: '/photo3.jpg',
      description:
        'Designed and developed a mobile vocabulary app to help users learn new words efficiently. The app features flashcards, quizzes, and progress tracking. Built with Flutter and Firebase.',
    },
    {
      id: 4,
      name: 'Project 4: Portfolio Website',
      image: '/photo4.jpg',
      description:
        'Designed and developed a personal portfolio website to showcase my skills and projects. Used React and Chakra UI for the front-end. The website helped me secure multiple freelance opportunities.',
    },
  ];

  return (
    <Layout>
      <div style={styles.container}>
        {/* 标题 */}
        <h2 style={styles.title}>My Projects</h2>

        {/* 项目列表 */}
        <div style={styles.projectsContainer}>
          {projects.map((project) => (
            <div key={project.id} style={styles.projectCard}>
              {/* 项目图片 */}
              <img src={project.image} alt={project.name} style={styles.projectImage} />

              {/* 项目名称 */}
              <h3 style={styles.projectName}>{project.name}</h3>

              {/* 项目描述 */}
              <p style={styles.projectDescription}>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Projects;

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
  projectsContainer: {
    display: 'flex',
    flexDirection: 'row', // 横向排列
    flexWrap: 'wrap', // 允许换行
    justifyContent: 'center', // 水平居中
    gap: '2rem', // 项目之间的间距
  },
  projectCard: {
    flex: '1 1 300px', // 每个项目卡片的最小宽度为 300px
    maxWidth: '350px', // 限制卡片的最大宽度
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 阴影
    padding: '1rem',
    textAlign: 'center',
  },
  projectImage: {
    width: '100%', // 图片宽度占满卡片
    height: 'auto', // 高度自适应
    borderRadius: '8px', // 圆角
    marginBottom: '1rem',
  },
  projectName: {
    fontSize: '1.25rem',
    color: '#2C7A7B', // 主题色
    marginBottom: '0.5rem',
  },
  projectDescription: {
    fontSize: '1rem',
    color: '#4A5568', // 灰色文字
    lineHeight: '1.6', // 行高
  },
};
