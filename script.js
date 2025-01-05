// Initialize the Vimeo Player
let iframe = document.createElement('iframe');
const content = document.getElementById('videoContainer');

iframe.setAttribute('src', 'https://player.vimeo.com/video/1043780051?autoplay=1&muted=1&title=0&byline=0&portrait=0&background=1');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'autoplay; fullscreen;');
  iframe.setAttribute('id', 'vimeo-video');
  iframe.setAttribute('class', 'bgVid');

  document.querySelector('body').appendChild(iframe);

function moveIframeOnSmallScreens() {
  if (window.innerWidth < 700) {
    if (iframe.parentElement !== content) {
      content.appendChild(iframe);

      // Reset styles to prevent issues
      iframe.style.position = 'static';
      iframe.style.width = '100%';
      iframe.style.height = 'auto';
    }
  }
}

moveIframeOnSmallScreens();

const player = new Vimeo.Player(iframe);
const soundOffButton = document.querySelector(".soundOff");
const soundOnButton = document.querySelector(".soundOn");
let currentVolume = 0.8; 

soundOffButton.addEventListener("click", function () {
  player.play();
  player.setVolume(0);
});

// Handle Sound On
soundOnButton.addEventListener("click", function () {
  player.play();
  player.setVolume(currentVolume);
});

// Buttons
const volUpBtn = document.getElementById('vol-up');
const volDownBtn = document.getElementById('vol-down');
const playPauseBtn = document.getElementById('play-pause');

player.setVolume(currentVolume);

// Volume Up Button
volUpBtn.addEventListener('click', () => {
  currentVolume = Math.min(currentVolume + 0.1, 1.0); // Max volume is 1.0
  player.setVolume(currentVolume)
  //.then(() => { console.log(`Volume increased to ${Math.round(currentVolume * 100)}%`);});
});

// Volume Down Button
volDownBtn.addEventListener('click', () => {
  currentVolume = Math.max(currentVolume - 0.1, 0.0); // Min volume is 0.0
  player.setVolume(currentVolume)
 // .then(() => { console.log(`Volume decreased to ${Math.round(currentVolume * 100)}%`);});
});

// Play/Pause Button
let isPlaying = true;
playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    player.pause().then(() => { playPauseBtn.textContent = '▶'; });
  } else {
    player.play().then(() => { playPauseBtn.textContent = '⏸'; });
  }
  isPlaying = !isPlaying;
});