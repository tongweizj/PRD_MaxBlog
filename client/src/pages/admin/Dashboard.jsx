import React, { Component } from 'react';
//
// this is the home page component
function Dashboard(props) {
  return (
    <div>
      <h2> Student Enrollment System - Teacher Portal</h2>
      <p>
        This is your dedicated teaching management platform. <br />
        Here, you can easily manage course details and student rosters, publish courses, and monitor
        all students' enrollment status in real time. <br />
        Handle teaching tasks efficiently with a clear overview of student selections, allowing you
        to focus more energy on instruction itself.
      </p>
    </div>
  );
}
// withRouter will pass updated match, location, and history props
// to the wrapped component whenever it renders.
export default Dashboard;
