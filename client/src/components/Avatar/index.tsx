import React from 'react';
import { Image } from './styles';

interface AvatarProps {
  src: string;
}
export const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return <Image src={src} />;
};
