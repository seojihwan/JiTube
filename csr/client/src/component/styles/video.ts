import styled from 'styled-components';
import play_button from './res/play-button.svg';
import pause from './res/pause.svg';
import mute from './res/mute.svg';
import volume_up from './res/volume-up.svg';

interface PlayButtonProps {
  isPlay: boolean;
}

interface VolumeButtonProps {
  isMute: boolean;
}

interface ProgresBarProps {
  percent: number;
}

interface VolumeInputProps {
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

export const ProgressBar = styled.div`
  position: absolute;
  width: 98%;
  bottom: 30px;
  display: flex;
  flex-basis: 100%;
  height: 5px;
  transition: height 0.3s;
  background: rgba(227, 225, 219, 0.2);
  cursor: pointer;
`;

export const Progress_filled = styled.div<ProgresBarProps>`
  flex: 0;
  background-color: red;
  flex-basis: ${(props) => `${props.percent}%`};
`;

export const Controller = styled.div`
  position: absolute;
  display: flex;
  width: 98%;
  bottom: 0;
  align-items: center;
  cursor: pointer;
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

export const VolumeInput = styled.input`
  -webkit-appearance: none;
  height: 1px;
  margin: 0px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
  background: #ffffff;
  border-radius: 1.3px;
  ::-webkit-slider-thumb {
    height: 10px;
    width: 10px;
    border-radius: 10px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-bottom: -1.5px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  }
  outline: none;
  cursor: pointer;
`;
