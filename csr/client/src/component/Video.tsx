import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Video,
  Controller,
  VideoWrapper,
  PlayButton,
  VolumeButton,
  VolumeInput,
  ProgressBar,
  Progress_filled,
} from './styles';
const endpoint = 'http://localhost:4000';

interface Iprops {
  src: string;
}
export const VideoPlayer: React.FC<Iprops> = ({ src }) => {
  const [isPlay, setIsPlay] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [beforeVolume, setBeforeVolume] = useState(0.5);
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [progressBarMouseDown, setProgressBarMouseDown] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
  const volumeProgress = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLVideoElement | HTMLButtonElement>) => {
      e.preventDefault();
      if (isPlay) {
        video?.current?.play();
      } else {
        video?.current?.pause();
      }
      setIsPlay(!isPlay);
    },
    [isPlay]
  );

  const handleTimeUpdate = useCallback(() => {
    if (video.current) {
      const progressPercent =
        (video.current.currentTime / video.current.duration) * 100;
      setProgressBarPercent(progressPercent);
    }
  }, []);

  const handleProgressBarMouseUp = useCallback(() => {
    setProgressBarMouseDown(false);
  }, []);

  const handleProgressBarMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setProgressBarMouseDown(true);
    },
    []
  );
  const handleProgressBarMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (progressBarMouseDown && video.current) {
        const time =
          (e.nativeEvent.offsetX / (progressBar.current?.offsetWidth || 1)) *
          video.current.duration;
        video.current.currentTime = time;
      }
    },
    [progressBarMouseDown]
  );
  const handleProgressBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (video.current) {
        const time =
          (e.nativeEvent.offsetX / (progressBar.current?.offsetWidth || 1)) *
          video.current.duration;
        video.current.currentTime = time;
      }
    },
    []
  );

  const handlevolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVolume(Number(e.target.value));
    },
    []
  );

  const handleVolumeClick = useCallback(() => {
    if (isMute) {
      setVolume(beforeVolume);
    } else {
      setBeforeVolume(Number(volumeProgress?.current?.value || 0.5));
      setVolume(0);
    }
    setIsMute(!isMute);
    if (video?.current) {
      video.current.volume = volume;
    }
  }, [isMute]);

  return (
    <VideoWrapper>
      <Video
        autoPlay={true}
        ref={video}
        src={endpoint + src}
        onTimeUpdate={handleTimeUpdate}
        onClick={handleClick}
      />
      <ProgressBar
        ref={progressBar}
        onMouseUp={handleProgressBarMouseUp}
        onMouseDown={handleProgressBarMouseDown}
        onMouseMove={handleProgressBarMouseMove}
        onMouseLeave={handleProgressBarMouseUp}
        onClick={handleProgressBarClick}
      >
        <Progress_filled percent={progressBarPercent}></Progress_filled>
      </ProgressBar>
      <Controller>
        <PlayButton isPlay={isPlay} onClick={handleClick} />
        <VolumeButton isMute={isMute} onClick={handleVolumeClick} />
        <VolumeInput
          type="range"
          ref={volumeProgress}
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handlevolumeChange}
        ></VolumeInput>
      </Controller>
    </VideoWrapper>
  );
};
