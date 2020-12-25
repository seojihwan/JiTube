import React, {
  HTMLAttributes,
  InputHTMLAttributes,
  MediaHTMLAttributes,
  RefAttributes,
} from 'react';
import {
  Container,
  Video,
  Controller,
  PlayButton,
  VolumeInputWrapper,
  VolumeButton,
  VolumeInput,
  VolumeInputCover,
  ProgressBar,
  Progress_filled,
  VideoTime,
  VideoCurrentTime,
  VideoDuration,
  ProgressBarProps,
  ProgressBarFilledProps,
  PlayButtonProps,
  VolumeButtonProps,
  VolumeInputCoverProps,
  VolumeMouseOverProps,
} from './styles/video';

interface IVideoPlayer {
  video: React.FC<
    MediaHTMLAttributes<HTMLVideoElement> & RefAttributes<HTMLVideoElement>
  >;
  progressBar: React.FC<
    HTMLAttributes<HTMLDivElement> &
      RefAttributes<HTMLDivElement> &
      ProgressBarProps
  >;
  progress_filled: React.FC<
    HTMLAttributes<HTMLDivElement> & ProgressBarFilledProps
  >;
  controller: React.FC<HTMLAttributes<HTMLDivElement>>;
  playButton: React.FC<HTMLAttributes<HTMLButtonElement> & PlayButtonProps>;
  volumeButton: React.FC<
    HTMLAttributes<HTMLButtonElement> &
      RefAttributes<HTMLButtonElement> &
      VolumeButtonProps
  >;
  volumeInputWrapper: React.FC<
    HTMLAttributes<HTMLSpanElement> & VolumeMouseOverProps
  >;
  volumeInputCover: React.FC<
    HTMLAttributes<HTMLDivElement> & VolumeInputCoverProps
  >;
  volumeInput: React.FC<
    InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>
  >;
  videoTime: React.FC<HTMLAttributes<HTMLDivElement> & VolumeMouseOverProps>;
  videoCurrentTime: React.FC<HTMLAttributes<HTMLDivElement>>;
  videoDuration: React.FC<HTMLAttributes<HTMLDivElement>>;
}

export const VideoPlayer: React.FC<HTMLAttributes<HTMLDivElement>> &
  IVideoPlayer = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

VideoPlayer.video = ({ children, ...restProps }) => {
  return <Video {...restProps}>{children}</Video>;
};

VideoPlayer.progressBar = ({ children, ...restProps }) => {
  return <ProgressBar {...restProps}>{children}</ProgressBar>;
};

VideoPlayer.progress_filled = ({ children, ...restProps }) => {
  return <Progress_filled {...restProps}>{children}</Progress_filled>;
};

VideoPlayer.controller = ({ children, ...restProps }) => {
  return <Controller {...restProps}>{children}</Controller>;
};

VideoPlayer.playButton = ({ children, ...restProps }) => {
  return <PlayButton {...restProps}>{children}</PlayButton>;
};

VideoPlayer.volumeButton = ({ children, ...restProps }) => {
  return <VolumeButton {...restProps}>{children}</VolumeButton>;
};

VideoPlayer.volumeInputWrapper = ({ children, ...restProps }) => {
  return <VolumeInputWrapper {...restProps}>{children}</VolumeInputWrapper>;
};

VideoPlayer.volumeInput = ({ children, ...restProps }) => {
  return <VolumeInput {...restProps}>{children}</VolumeInput>;
};

VideoPlayer.volumeInputCover = ({ children, ...restProps }) => {
  return <VolumeInputCover {...restProps}>{children}</VolumeInputCover>;
};

VideoPlayer.videoTime = ({ children, ...restProps }) => {
  return <VideoTime {...restProps}>{children}</VideoTime>;
};

VideoPlayer.videoCurrentTime = ({ children, ...restProps }) => {
  return <VideoCurrentTime {...restProps}>{children}</VideoCurrentTime>;
};

VideoPlayer.videoDuration = ({ children, ...restProps }) => {
  return <VideoDuration {...restProps}>{children}</VideoDuration>;
};
