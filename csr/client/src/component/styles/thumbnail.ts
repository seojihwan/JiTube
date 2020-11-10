import styled from 'styled-components';

export const ThumbnailWrapper = styled.div`
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
export const ThumbnailAdminAvatar = styled.div`
  padding-right: 10px;
`;
export const ThumbnailContents = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  div {
    color: #030303;
  }
  span {
    color: #606060;
  }
`;
