import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
//

// this component is used to create a new user
function Register(props) {
  let navigate = useNavigate();
  //
  const [user, setUser] = useState({
    _id: '',
    username: '',
    email: '',
    password: '',
  });

  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = '/api/api/users';

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      email: user.email,
      username: user.username,
      password: user.password,
    };
    //use promises
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/');
      })
      .catch((error) => setShowLoading(false));
  };
  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Form onSubmit={saveUser}>
        <Form.Group>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            name="username"
            id="username"
            placeholder="Enter user name"
            value={user.username}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            id="email"
            rows="3"
            placeholder="Enter email"
            value={user.email}
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={user.password}
            onChange={onChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}
//
export default Register;
