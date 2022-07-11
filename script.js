import {
  masterPlayButton,
  nextButton,
  previousButton,
  duration,
  current,
  progressBar,
  bottomTitle,
  playBtnList,
  songs,
  about,
  closeButton,
} from "./songinfo.js";
import { NEXT_SONG, PREVIOUS_SONG } from "./config.js";

const playBtnArray = Array.from(playBtnList);
let music = new Audio("music/mayur-1.mp3");
let songIndex = 0;
let isPlaying = false; //initial flag

///////////////////////////////////////////////////
// Play pause functionalities of music
///////////////////////////////////////////////////

function play() {
  music.play();
  isPlaying = true;
}

function pause() {
  music.pause();
  isPlaying = false;
}

function handletogglePlay() {
  togglePlay(songs[songIndex].playButton);
}
////////////////////////////////////////////////////////
// Implementation for the seekbar movement during a song
////////////////////////////////////////////////////////

function progressUpdate(e) {
  const currentTime = e.srcElement.currentTime;
  const durationTime = e.srcElement.duration;
  const progressPercentage = (currentTime / durationTime) * 100;
  //update seekbar width for progress bar
  progressBar.value = `${progressPercentage}`;
  //calculate currentTime in mins and secs
  const currentTimeMinutes = Math.floor(currentTime / 60);
  const currentTimeSeconds = Math.floor(currentTime % 60); //current rem secs

  const durationMinutes = Math.floor(durationTime / 60);
  const durationSeconds = Math.floor(durationTime % 60); //remaining seconds in the song
  if (durationSeconds) {
    if (durationSeconds < 10) {
      duration.textContent = `${durationMinutes}:0${durationSeconds}`;
    } else {
      duration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
  }
  //currentTime updating
  if (currentTimeSeconds < 10) {
    current.textContent = `${currentTimeMinutes}:0${currentTimeSeconds}`;
  } else {
    current.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
  }
  if (music.ended) {
    nextSong(); //immediately play next song once current song ends
  }
}

// clicking and dragging to a random position

function setProgressBar(e) {
  const totalWidth = e.srcElement.clientWidth;
  const currentWidth = e.offsetX;
  const durationTime = music.duration;
  const currentSeconds = (currentWidth / totalWidth) * durationTime;
  music.currentTime = currentSeconds; // modify the current timestamp of song
}

// Loading the song to bottom song container after reload

function loadFirstSong() {
  bottomTitle.textContent = songs[0].song;
  const durationTime = music.duration;
  const durationMinutes = Math.floor(durationTime / 60);
  const durationSeconds = Math.floor(durationTime % 60); //remaining seconds in the song
  if (durationSeconds) {
    if (durationSeconds < 10) {
      duration.textContent = `${durationMinutes}:0${durationSeconds}`;
    } else {
      duration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
  }
}
///////////////////////////////////////
// Previous & Next song functionalities
///////////////////////////////////////

function getValidSongState(state) {
  if (state === "NEXT") {
    if (songIndex + 1 > 15) {
      songIndex = 0;
    } else {
      songIndex++;
    }
  } else if (state === "PREVIOUS") {
    if (songIndex - 1 < 0) {
      songIndex = 15;
    } else {
      songIndex--;
    }
  }
  return [songIndex, songs[songIndex].playButton];
}

function nextSong() {
  setPreviousPlayButtonState(songs[songIndex].playButton);
  loadSong(getValidSongState(NEXT_SONG)[1]);
}

function previousSong() {
  setPreviousPlayButtonState(songs[songIndex].playButton);
  loadSong(getValidSongState(PREVIOUS_SONG)[1]);
}

//////////////////////////////////////////////////////////////////////////
// functionalities of playing, pausing & loading songs in bottom container
//////////////////////////////////////////////////////////////////////////

// Set the last active play button icon to "play" as next/previous song is played
function setPreviousPlayButtonState(lastPlayButton) {
  if (lastPlayButton.classList.contains("fa-pause")) {
    lastPlayButton.classList.replace("fa-pause", "fa-play");
  }
}

function togglePlay(currentPlayButton) {
  if (!isPlaying) {
    play();
    masterPlayButton.classList.replace("fa-play", "fa-pause");
    currentPlayButton.classList.replace("fa-play", "fa-pause");
  } else {
    pause();
    masterPlayButton.classList.replace("fa-pause", "fa-play");
    currentPlayButton.classList.replace("fa-pause", "fa-play");
  }
}

function loadSong(currentPlayButton) {
  bottomTitle.textContent = songs[songIndex].song;
  music.src = `music/mayur-${songIndex + 1}.mp3`;
  play();
  masterPlayButton.classList.replace("fa-play", "fa-pause");
  currentPlayButton.classList.replace("fa-play", "fa-pause");
}

function handlePlayButtons() {
  for (let i = 0; i < 16; i++) {
    playBtnArray[i].addEventListener("click", currentPlayButton);
  }
}

// 3 cases come to mind
// 1. A play button is pressed again and again, meaning the current and last buttons are same
// 2. A play button is pressed, and the song starts playing, while another play button is pressed mid-song
// 3. A play button is pressed, and paused, then another button is pressed while the current song is paused

function currentPlayButton(element) {
  setPreviousPlayButtonState(songs[songIndex].playButton);
  songIndex = Number(element.target.id) - 1;
  const currentPlayButton = songs[songIndex].playButton;
  if (bottomTitle.textContent === songs[songIndex].song) {
    togglePlay(currentPlayButton);
  } // no need to update music src if title already there, just toggle play
  else {
    loadSong(currentPlayButton);
  }
}
///////////////////////////////////////////
// Now for the functions regarding overlays
///////////////////////////////////////////

function getToHome() {
  window.location.reload();
}

function openAbout() {
  document.getElementById("overlay").style.width = "100%";
}

function closeAbout() {
  document.getElementById("overlay").style.width = "0%";
}
/////////////////////////////////////////////////////////
// Main callbacks for handling all the events on the page
/////////////////////////////////////////////////////////

const init = function controlPlayer() {
  window.addEventListener("load", loadFirstSong);
  music.addEventListener("timeupdate", progressUpdate);
  masterPlayButton.addEventListener("click", handletogglePlay);
  progressBar.addEventListener("click", setProgressBar);
  nextButton.addEventListener("click", nextSong);
  previousButton.addEventListener("click", previousSong);
  home.addEventListener("click", getToHome);
  about.addEventListener("click", openAbout);
  closeButton.addEventListener("click", closeAbout);
  handlePlayButtons();
};

init();
