const $playVideo = document.getElementById('play-video');
const $delay = document.getElementById('delay');
const $timeLeftDisplay = document.getElementById('time-left');

$playVideo.addEventListener('click', () => playVideoTimer(+$delay.value));

function playVideoTimer(timeLeft) {
  setTimeLeftDisplay(timeLeft);

  if (timeLeft === 0) {
    sendPlayVideo();
    window.setTimeout(() => showTimeLeftDisplay(false), 1_000);
    return;
  }

  showTimeLeftDisplay();

  window.setTimeout(() => {
    playSound();
    playVideoTimer(timeLeft - 1)
  }, 1_000);
}

function playSound() {
  const metronome = new Audio('assets/metronome.mp3');

  metronome.play();
}

function sendPlayVideo() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'playVideo' });
  });
}

function showTimeLeftDisplay(shouldShow = true) {
  $timeLeftDisplay.style.display = shouldShow ? 'block' : 'none';
}

function setTimeLeftDisplay(timeLeft) {
  $timeLeftDisplay.textContent = timeLeft;
}