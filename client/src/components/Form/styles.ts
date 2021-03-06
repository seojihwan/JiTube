import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  justify-content: center;
  width: 350px;
  margin: auto;
`;
export const Input = styled.input`
  display: block;
  outline: none;
  height: 34px;
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 3px;
  margin-bottom: 15px;
  :focus {
    border-color: #66afe9;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }
`;
export const Button = styled.button`
  color: #fff;
  height: 34px;
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  background-color: #007bff;
  border-radius: 2px;
  outline: none;
`;

export const VideoPageWrapper = styled.div`
  width: 66%;
  padding-left: 10px;
`;
