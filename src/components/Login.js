import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify"; // Import the toast function

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background-color: var(--background-color);
  box-shadow: 0 5px 15px var(--shadow-color);
  text-align: center;
  margin: auto; /* Center align within the body */

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Header = styled.h2`
  margin-bottom: 10px;
  font-size: 24px;
  color: var(--text-color);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const Label = styled.label`
  margin-bottom: 5px;
  text-align: left;
  color: var(--text-color);
  display: block;
`;

const Input = styled.input`
  padding: 12px;
  width: calc(100% - 24px); /* Adjusted width */
  margin-left: 12px; /* Centering the input field */
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 16px;
  color: var(--text-color);
  transition: border 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px var(--primary-color-hover);
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
    width: calc(100% - 20px); /* Adjusted width for smaller screens */
    margin-left: 10px;
  }
`;

const Select = styled.select`
  padding: 12px;
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  font-size: 16px;
  color: var(--text-color);
  transition: border 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 5px var(--primary-color-hover);
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: var(--primary-color-hover);
    transform: translateY(-2px);
  }

  &:active {
    background-color: var(--primary-color-hover);
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  input {
    margin-right: 10px;
  }
`;

const ForgotPassword = styled.a`
  margin-top: 10px;
  font-size: 14px;
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Login = ({ setUser }) => {
  const [employeeId, setEmployeeId] = useState("emp1");
  const [password, setPassword] = useState("12345");
  const [role, setRole] = useState("employee");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    toast.info("Authentication temporarily removed for testing purposes.");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeId.trim() === "" || password.trim() === "") {
      setError("Please enter both employee ID and password.");
      return;
    }
    setUser({ employeeId, password, role });
  };

  return (
    <Container>
      <Header>Login</Header>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="employeeId">Employee ID:</Label>
          <Input
            type="text"
            id="employeeId"
            placeholder="Enter your Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="role">Role:</Label>
          <Select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </Select>
        </FormGroup>
        <RememberMe>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <Label htmlFor="rememberMe">Remember Me</Label>
        </RememberMe>
        <Button type="submit">Sign In</Button>
        <ErrorMessage>{error}</ErrorMessage>
      </Form>
      <ForgotPassword href="#">Forgot Password?</ForgotPassword>
    </Container>
  );
};

export default Login;
