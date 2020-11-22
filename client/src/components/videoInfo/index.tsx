import React, { HTMLAttributes, ImgHTMLAttributes } from 'react';
import {
  Container,
  DetailInfo,
  Title,
  ViewCount,
  Date,
  AdminInfo,
  AdminIcon,
  AdminName,
  Description,
} from './styles/videoInfo';

interface IVideoInfo {
  title: React.FC<HTMLAttributes<HTMLHeadingElement>>;
  detailInfo: React.FC<HTMLAttributes<HTMLDivElement>>;
  viewCount: React.FC<HTMLAttributes<HTMLSpanElement>>;
  date: React.FC<HTMLAttributes<HTMLSpanElement>>;
  adminInfo: React.FC<HTMLAttributes<HTMLDivElement>>;
  adminIcon: React.FC<ImgHTMLAttributes<HTMLImageElement>>;
  adminName: React.FC<HTMLAttributes<HTMLDivElement>>;
  description: React.FC<HTMLAttributes<HTMLDivElement>>;
}
export const VideoInfo: React.FC<HTMLAttributes<HTMLDivElement>> &
  IVideoInfo = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

VideoInfo.title = ({ children, ...restProps }) => {
  return <Title {...restProps}>{children}</Title>;
};
VideoInfo.detailInfo = ({ children, ...restProps }) => {
  return <DetailInfo {...restProps}>{children}</DetailInfo>;
};
VideoInfo.viewCount = ({ children, ...restProps }) => {
  return <ViewCount {...restProps}>{children}</ViewCount>;
};
VideoInfo.date = ({ children, ...restProps }) => {
  return <Date {...restProps}>{children}</Date>;
};
VideoInfo.adminInfo = ({ children, ...restProps }) => {
  return <AdminInfo {...restProps}>{children}</AdminInfo>;
};
VideoInfo.adminIcon = ({ children, ...restProps }) => {
  return <AdminIcon {...restProps}>{children}</AdminIcon>;
};
VideoInfo.adminName = ({ children, ...restProps }) => {
  return <AdminName {...restProps}>{children}</AdminName>;
};
VideoInfo.description = ({ children, ...restProps }) => {
  return <Description {...restProps}>{children}</Description>;
};
