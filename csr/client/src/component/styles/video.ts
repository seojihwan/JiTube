import styled from 'styled-components';
import play_button from './res/play-button.svg';
import pause from './res/pause.svg';
import mute from './res/mute.svg';
import volume_up from './res/volume-up.svg';

interface PlayButtonProps {
  isPlay: boolean;
}

interface ProgresBarProps {
  isProgressBarMouseDown: boolean;
  isProgressBarMouseEnter: boolean;
}

interface ProgresBarFilledProps {
  percent: number;
}

interface ProgresBarFilledProps {
  percent: number;
}

interface VolumeMouseOverProps {
  isVolumeMouseOver: boolean;
}

interface VolumeButtonProps {
  isMute: boolean;
}

interface VolumeInputCoverProps {
  percent: number;
}

export const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;

export const Video = styled.video`
  width: 100%;
`;

export const ProgressBar = styled.div<ProgresBarProps>`
  position: absolute;
  width: 98%;
  bottom: 30px;
  display: flex;
  flex-basis: 100%;
  height: 5px;
  transform: ${({ isProgressBarMouseDown, isProgressBarMouseEnter }) =>
    isProgressBarMouseDown || isProgressBarMouseEnter
      ? 'scale3d(1, 1, 1)'
      : 'scale3d(1, 0.7, 1)'};
  transition: transform 0.2s;
  background: rgba(227, 225, 219, 0.2);
  cursor: pointer;
`;

export const Progress_filled = styled.div<ProgresBarFilledProps>`
  background-color: red;
  flex-basis: ${({ percent }) => `${percent}%`};
`;

export const Controller = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 98%;
  bottom: 0;
  align-items: center;
`;

export const PlayButton = styled.button<PlayButtonProps>`
  width: 20px;
  height: 20px;
  margin: 5px;
  border: none;
  outline: none;
  background-color: transparent;
  background-image: ${(props) =>
    props.isPlay ? `url(${play_button})` : `url(${pause})`};
  background-size: cover;
  transition: background 0.5s;
  cursor: pointer;
`;

export const VolumeButton = styled.button<VolumeButtonProps>`
  width: 20px;
  height: 20px;
  margin: 5px;
  border: none;
  outline: none;
  background-color: transparent;
  background-image: ${(props) =>
    props.isMute ? `url(${mute})` : `url(${volume_up})`};
  background-size: cover;
  transition: background 0.5s;
  cursor: pointer;
`;

export const VolumeInputWrapper = styled.span<VolumeMouseOverProps>`
  display: flex;
  position: relative;
  width: 50px;
  height: 3px;
  margin-left: 10px;
  opacity: ${({ isVolumeMouseOver }) => (isVolumeMouseOver ? 1 : 0)};
  transition: opacity 0.2s;
`;
export const VolumeInput = styled.input`
  -webkit-appearance: none;
  position: absolute;
  height: 3px;
  width: 50px;
  margin: 0px;
  background: rgba(227, 225, 219, 0.2);
  border-radius: 1.3px;
  ::-webkit-slider-thumb {
    height: 12px;
    width: 12px;
    border-radius: 10px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  }
  outline: none;
  cursor: pointer;
`;

export const VolumeInputCover = styled.div<VolumeInputCoverProps>`
  height: 3px;
  background: #fff;
  flex-basis: ${({ percent }) => `${percent}%`};
`;

export const VideoTime = styled.span<VolumeMouseOverProps>`
  padding-left: 10px;
  color: #fff;
  font-size: 12px;
  transform: ${({ isVolumeMouseOver }) =>
    isVolumeMouseOver ? 'translateX(0px)' : 'translateX(-65px)'};
  transition: transform 0.3s;
`;
export const VideoCurrentTime = styled.span``;
export const VideoDuration = styled.span``;
