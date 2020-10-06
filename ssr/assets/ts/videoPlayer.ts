const videoContainer: HTMLElement = document.querySelector('.videoPlayer');
const videoPlayer: HTMLVideoElement = document.querySelector('.videoPlayer video');
const playBtn = document.querySelector('.play-button');
const volumeBtn = document.querySelector('.volume-button');
const expandBtn = document.querySelector('.expand-button');
const currentTime = document.querySelector('.currentTime');
const totalTime = document.querySelector('.totalTime');

interface Document {
  mozCancelFullScreen: any;
  webkitExitFullscreen: any;
  fullscreenElement: any;
  mozFullScreenElement: any;
  webkitFullscreenElement: any;
  mozRequestFullScreen: any;
  webkitRequestFullscreen: any;
  msRequestFullscreen: any;
  msExitFullscreen: any;
}

interface HTMLElement {
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
  mozRequestFullscreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
}

const handlePlayClick = () => {
  if (videoPlayer?.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class = "fas fa-pause">';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class = "fas fa-play">';
  }
};
const handleVoulmeClick = () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class = "fas fa-volume-up">';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class = "fas fa-volume-mute">';
  }
};
const goFullScreen = () => {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  expandBtn.innerHTML = '<i class = "fas fa-compress">';
  expandBtn.removeEventListener('click', goFullScreen);
  expandBtn.addEventListener('click', exitFullScreen);
};
const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  expandBtn.addEventListener('click', goFullScreen);
  expandBtn.innerHTML = '<i class="fas fa-expand">';
};

const formatDate = (seconds: number): string => {
  const secondsNumber = Math.floor(seconds / 10);
  let hours: string | number = Math.floor(secondsNumber / 3600);
  let minutes: string | number = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds: string | number = secondsNumber - hours * 3600 - minutes * 60;

  hours = hours < 10 ? `0${hours}` : hours.toString();
  minutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  totalSeconds = totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds.toString();

  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

const init = () => {
  playBtn.addEventListener('click', handlePlayClick);
  volumeBtn.addEventListener('click', handleVoulmeClick);
  expandBtn.addEventListener('click', goFullScreen);
  //loadedmetadata Event를 이용해서, 동작할 함수를 지정해주면 영상이
  //늦게 로딩이 되어도 전체시간을 설정할 수 있다.
  videoPlayer.addEventListener('loadedmetadata', setTotalTime);
};
if (videoPlayer) {
  init();
}
