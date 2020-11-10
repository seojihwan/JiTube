import styled from 'styled-components';
import cancleButton from './res/cancel.svg';
import uploading_arrow from './res/uploading-arrow.svg';

interface modalState {
  isUpload: Boolean;
}

export const Modal = styled.div<modalState>`
  position: absolute;
  display: ${({ isUpload }) => (isUpload ? 'block' : 'none')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  opacity: 0.4;
  transition: opacity 0.2s;
`;

export const ModalForm = styled.form<modalState>`
  background-color: #fff;
  display: ${({ isUpload }) => (isUpload ? 'inline-block' : 'none')};
  position: fixed;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  max-width: 100%;
  height: 300px;
  max-height: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  @media (min-width: 480px) {
    width: 400px;
    height: 400px;
  }
  @media (min-width: 768px) {
    width: 550px;
    height: 550px;
  }
  @media (min-width: 1024px) {
    width: 700px;
    height: 700px;
  }
`;

export const ModalTitle = styled.div`
  display: flex;
  padding: 0 12px;
  justify-content: space-between;
  align-items: center;
  border-bottom: #e2e2e2 1px solid;
  height: 40px;
`;

export const ModalTitleName = styled.span`
  text-align: center;
`;

export const ModalTitleButton = styled.span`
  width: 20px;
  height: 20px;
  background: url(${cancleButton});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const ModalFileDragAndDrop = styled.div`
  display: flex;
  height: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: none;
  @media (min-width: 480px) {
    height: 200px;
  }
  @media (min-width: 768px) {
    height: 300px;
  }
  @media (min-width: 1024px) {
    height: 400px;
  }
`;

export const ModalUploadImage = styled.div`
  border: none;
  outline: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${uploading_arrow}) center;
  background-color: rgba(216, 216, 216, 0.2);
  background-repeat: no-repeat;
  margin-bottom: 20px;
  background-size: 25px 25px;
  cursor: pointer;
  @media (min-width: 480px) {
    width: 75px;
    height: 75px;
    background-size: 37.5px 37.5px;
  }
  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
    background-size: 50px 50px;
  }
  @media (min-width: 1024px) {
    width: 150px;
    height: 150px;
    background-size: 75px 75px;
  }
`;

export const ModalUploadDescription = styled.div`
  font-size: 8px;
  text-align: center;
  @media (min-width: 480px) {
    font-size: 12px;
  }
  @media (min-width: 768px) {
    font-size: 16px;
  }
  margin-bottom: 20px;
`;

export const ModalFileDragAndDropButton = styled.button`
  width: 80px;
  height: 27px;
  text-align: center;
  border: none;
  outline: none;
  color: #fff;
  background-color: #2b44ff;
  cursor: pointer;
`;

export const ModalVideoInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const ModalVideoTitleInput = styled.input`
  width: 50%;
  outline: none;
  border: 1px solid #ccc;
  :focus {
    border-color: #66afe9;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }
`;
export const ModalVideoDescriptionInput = styled.textarea`
  width: 50%;
  height: 100px;
  outline: none;
  resize: none;
  border: 1px solid #ccc;
  :focus {
    border-color: #66afe9;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
  }
`;

export const ModalVideoUploadButton = styled.button``;
