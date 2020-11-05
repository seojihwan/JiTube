import styled from 'styled-components';

export const ThumbnailWrapper = styled.div`
  a {
    display: flex;
    flex-wrap: wrap;
    text-decoration: none;
  }
  > a > img {
    width: 100%;
    margin-bottom: 10px;
  }
  width: 80%;
  margin: 10%;

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
