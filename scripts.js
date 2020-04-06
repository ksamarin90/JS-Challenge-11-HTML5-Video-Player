const play = document.querySelector('.player__button');
const playButton = document.querySelector('.play__button');
const playButtonIcon = document.querySelector('.play__button__icon');

const video = document.getElementById('video');
const videoPosition = document.querySelector('.progress__filled')
const progress = document.querySelector('.progress')
const skipButtons = document.querySelectorAll('[data-skip]')
const ranges = document.querySelectorAll('.player__slider')

const fullscreen =document.querySelector('.fullscreen__icon')

const handleVideo = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause()
    }
}

const changeButton = () => {
    if (video.paused) {
        play.innerText = '►';
        playButtonIcon.src = 'play.svg';
    } else if (!video.paused) {
        play.innerText = '||';
        playButtonIcon.src = 'pause.svg';
    }
}

const skipTime = (event) => {
    const skipValue = event.target.dataset.skip;
    console.log(video.currentTime);
    video.currentTime += +skipValue;
    console.log(video.currentTime);
}

function handleRange() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    videoPosition.style.flexBasis = `${percent}%`
}

function changeVideo(event) {
    const scrub = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrub;
}

function openFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
    }
  }

play.addEventListener('click', () => handleVideo());
playButtonIcon.addEventListener('click', () => handleVideo());

video.addEventListener('play', () => changeButton());
video.addEventListener('pause', () => changeButton());
video.addEventListener('timeupdate', handleProgress);

let mouseDown = false
progress.addEventListener('click', event => changeVideo(event));
progress.addEventListener('mousemove', event => mouseDown && changeVideo(event));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mouseleave', () => mouseDown = false);


skipButtons.forEach(button => button.addEventListener('click', (event) => skipTime(event)));
ranges.forEach(range => range.addEventListener('change', handleRange));

fullscreen.addEventListener('click', openFullscreen)