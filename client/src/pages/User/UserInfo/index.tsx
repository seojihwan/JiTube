import React from 'react';
import { Container, UserImage, UserName } from './styles';
import { endpoint } from '../../../apis';

interface UserInfoProps {
  imageUrl: string;
  name: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ imageUrl, name }) => {
  return (
    <Container>
      <UserImage src={endpoint + imageUrl} />
      <UserName>{name}</UserName>
    </Container>
  );
};
