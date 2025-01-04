// Initialize the Vimeo Player
const iframe = document.getElementById('vimeo-video');
const player = new Vimeo.Player(iframe);

// Buttons
const volUpBtn = document.getElementById('vol-up');
const volDownBtn = document.getElementById('vol-down');
const playPauseBtn = document.getElementById('play-pause');
const content = document.getElementById('content');
const container = document.getElementById('container');

function moveIframeOnSmallScreens() {
  if (window.innerWidth < 700) {
    if (iframe.parentElement !== content) {
      content.appendChild(iframe);

      // Reset styles to prevent issues
      iframe.style.position = 'static';
      iframe.style.width = '100%';
      iframe.style.height = 'auto';
      console.log('Iframe moved to #content');
      player.play()
    }
  } else {
    if (iframe.parentElement !== container) {
      container.appendChild(iframe);

      // Reset styles to prevent issues
      iframe.style.position = 'static';
      iframe.style.width = '100%';
      iframe.style.height = 'auto';
      console.log('Iframe moved back to #container');
    }
  }
}

moveIframeOnSmallScreens();

    // Recheck on window resize
    window.addEventListener('resize', moveIframeOnSmallScreens);

// Volume Control Variables
let currentVolume = 0.5; // Initial volume (50%)
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