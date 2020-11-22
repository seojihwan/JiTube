import React, { useCallback, useRef, useState } from 'react';

import { VideoPlayer } from '../components/videoPlayer';
import { endpoint } from '../apis';

interface VideoPlayerContainerProps {
  src: string;
}

const secondsToTime = (sec: number) => {
  sec = Math.floor(sec);
  const hour = Math.floor(sec / 3600);
  return (
    (hour ? hour + ':' : '') +
    Math.floor((sec - (sec %= 60)) / 60) +
    (9 < sec ? ':' : ':0') +
    sec
  );
};

export const VideoPlayerContainer: React.FC<VideoPlayerContainerProps> = ({
  src,
}) => {
  const [isPlay, setIsPlay] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [beforeVolume, setBeforeVolume] = useState(0.5);
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [isProgressBarMouseEnter, setIsProgressBarMouseEnter] = useState(false);
  const [isProgressBarMouseDown, setIsProgressBarMouseDown] = useState(false);
  const [isVolumeMouseOver, setIsVolumeMouseOver] = useState(false);
  const [isVolumeBarMouseDown, setIsVolumeBarMouseDown] = useState(false);

  const video = useRef<HTMLVideoElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
  const volumeInput = useRef<HTMLInputElement>(null);
  const volumeButton = useRef<HTMLButtonElement>(null);

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

  const handleEnded = useCallback(() => {
    setIsPlay(true);
  }, [isPlay]);

  const handleTimeUpdate = useCallback(() => {
    if (video.current) {
      const progressPercent =
        (video.current.currentTime / video.current.duration) * 100;
      setProgressBarPercent(progressPercent);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsProgressBarMouseDown(false);
    setIsVolumeBarMouseDown(false);
  }, []);

  const handleProgressBarMouseLeave = useCallback(() => {
    setIsProgressBarMouseEnter(false);
  }, []);

  const handleProgressBarMouseDown = useCallback(() => {
    setIsProgressBarMouseDown(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      if (isProgressBarMouseDown && video.current && progressBar.current) {
        const time =
          (e.nativeEvent.offsetX / (progressBar.current.offsetWidth || 1)) *
          video.current.duration;
        video.current.currentTime = time;
      }

      if (video.current && isVolumeBarMouseDown && volumeInput.current) {
        let volumeInputValue = Number(
          e.nativeEvent.offsetX / (volumeInput.current.offsetWidth || 1)
        );
        if (volumeInputValue > 1) {
          volumeInputValue = 1;
        } else if (volumeInputValue < 0) {
          volumeInputValue = 0;
        }
        if (!volumeInputValue) {
          setIsMute(true);
        } else {
          setIsMute(false);
        }
        video.current.volume = volumeInputValue;
        setVolume(volumeInputValue);
        setBeforeVolume(volumeInputValue);
      }
    },
    [isProgressBarMouseDown, isVolumeBarMouseDown]
  );

  const handleProgressBarMouseEnter = useCallback(() => {
    setIsProgressBarMouseEnter(true);
  }, []);

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

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (video.current) {
        setVolume(Number(e.target.value));
        video.current.volume = volume;
      }
      if (!volume) {
        setIsMute(true);
      } else {
        setIsMute(false);
      }
      setBeforeVolume(volume);
    },
    [volume]
  );

  const handleVolumeBarDown = useCallback(() => {
    setIsVolumeBarMouseDown(true);
  }, []);

  const handleVolumeClick = useCallback(() => {
    if (isMute) {
      setVolume(beforeVolume);
    } else {
      setBeforeVolume(Number(volumeInput?.current?.value || 0.5));
      setVolume(0);
    }
    setIsMute(!isMute);
    if (video?.current) {
      video.current.volume = volume;
    }
  }, [isMute]);

  const handleVolumeOnMouseOver = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      setIsVolumeMouseOver(true);
    },
    []
  );
  const handleVolumeOnMouseLeave = useCallback(() => {
    setIsVolumeMouseOver(false);
  }, []);

  return (
    <VideoPlayer onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <VideoPlayer.video
        autoPlay={true}
        ref={video}
        src={endpoint + src}
        onTimeUpdate={handleTimeUpdate}
        onClick={handleClick}
        onEnded={handleEnded}
      />
      <VideoPlayer.progressBar
        ref={progressBar}
        onMouseDown={handleProgressBarMouseDown}
        onMouseLeave={handleProgressBarMouseLeave}
        onClick={handleProgressBarClick}
        onMouseEnter={handleProgressBarMouseEnter}
        isProgressBarMouseDown={isProgressBarMouseDown}
        isProgressBarMouseEnter={isProgressBarMouseEnter}
      >
        <VideoPlayer.progress_filled percent={progressBarPercent} />
      </VideoPlayer.progressBar>
      <VideoPlayer.controller
        onMouseOver={handleVolumeOnMouseOver}
        onMouseLeave={handleVolumeOnMouseLeave}
      >
        <VideoPlayer.playButton isPlay={isPlay} onClick={handleClick} />
        <VideoPlayer.volumeButton
          ref={volumeButton}
          isMute={isMute}
          onClick={handleVolumeClick}
        />
        <VideoPlayer.volumeInputWrapper isVolumeMouseOver={isVolumeMouseOver}>
          <VideoPlayer.volumeInputCover percent={volume * 100} />
          <VideoPlayer.volumeInput
            type="range"
            ref={volumeInput}
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            onMouseDown={handleVolumeBarDown}
          ></VideoPlayer.volumeInput>
        </VideoPlayer.volumeInputWrapper>
        <VideoPlayer.videoTime isVolumeMouseOver={isVolumeMouseOver}>
          <VideoPlayer.videoCurrentTime>
            {video ? secondsToTime(Number(video.current?.currentTime)) : ''}
          </VideoPlayer.videoCurrentTime>
          <VideoPlayer.videoDuration>
            {video
              ? ` / ` + secondsToTime(Number(video.current?.duration))
              : ''}
          </VideoPlayer.videoDuration>
        </VideoPlayer.videoTime>
      </VideoPlayer.controller>
    </VideoPlayer>
  );
};
