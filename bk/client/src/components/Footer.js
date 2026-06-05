/*
  File name: footer.js
  Student’s Name: Wei Tong
  StudentID: 301034450
  Date: 20250201
*/
import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 Wei Tong's Portfolio. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

// 内联样式
const styles = {
  footer: {
    backgroundColor: '#2d3748',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
  },
};
