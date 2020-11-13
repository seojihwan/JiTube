import styled from 'styled-components';

export const UserWrapper = styled.div`
  width: 66%;
  min-width: 150px;
`;
export const UserTitle = styled.h3`
  padding: 20px 0;
`;
export const UserThumbnailWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    margin: 1px;
  }
`;
export const ThumbnailWithDeleteButton = styled.div``;

export const MoreButton = styled.button`
  position: absolute;
  width: 10px;
  height: 10px;
  width: 10px;
  bottom: 0;
  right: 0;
`;
