import styled from 'styled-components';
import trash from './res/trash.svg';

export const ThumbnailWrapper = styled.div`
  position: relative;
  a {
    display: flex;
    flex-wrap: wrap;
    text-decoration: none;
  }

  width: 100%;
  @media (min-width: 480px) {
    width: 48%;
    margin: 4px;
  }
  @media (min-width: 768px) {
    width: 30%;
    margin: 8px;
  }
  @media (min-width: 1024px) {
    width: 23%;
    margin: 10px;
  }
  :hover button {
    opacity: 1;
  }
`;
export const ThumbnailImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.2%;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
  margin: 10px 0;
`;
export const ThumbnailAvatarContentsWrapper = styled.div`
  display: flex;
`;
export const ThumbnailAdminAvatar = styled.div`
  display: inline-block;
  padding-right: 10px;
`;
export const ThumbnailContents = styled.div`
  display: flex;
  flex-direction: column;
  div {
    color: #030303;
  }
  span {
    color: #606060;
  }
`;
export const DeleteButton = styled.button`
  position: absolute;
  border: none;
  outline: none;
  width: 20px;
  height: 30px;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-image: url(${trash});
  background-position: center;
  background-size: 18px 18px;
  background-repeat: no-repeat;
  transition: opcaity 0.3s transform 0.3s;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
