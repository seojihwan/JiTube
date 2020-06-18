const videoContainer = document.querySelector(".videoPlayer");
const videoPlayer = document.querySelector(".videoPlayer video");
const playBtn = document.querySelector(".play-button");
const volumeBtn = document.querySelector(".volume-button");
const expandBtn = document.querySelector(".expand-button");
const currentTime = document.querySelector(".currentTime");
const totalTime = document.querySelector(".totalTime");

const handlePlayClick = () => {
  if (videoPlayer.paused) {
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
  expandBtn.removeEventListener("click", goFullScreen);
  expandBtn.addEventListener("click", exitFullScreen);
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
  expandBtn.addEventListener("click", goFullScreen);
  expandBtn.innerHTML = '<i class="fas fa-expand">';
};

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
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
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVoulmeClick);
  expandBtn.addEventListener("click", goFullScreen);
  //loadedmetadata Event를 이용해서, 동작할 함수를 지정해주면 영상이
  //늦게 로딩이 되어도 전체시간을 설정할 수 있다.
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
};
if (videoPlayer) {
  init();
}
