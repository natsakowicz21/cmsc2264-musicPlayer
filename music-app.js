const carousel = [...document.querySelectorAll('.carousel img')];

let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');

    if(carouselImageIndex >= carousel.length - 1){
        carouselImageIndex = 0;
    } else{
        carouselImageIndex++;
    }

    carousel[carouselImageIndex].classList.toggle('active');
}

setInterval(() => {
    changeCarousel();
}, 3000);


const song = document.querySelector('#song');
const thumbnail = document.querySelector('#thumbnail');
const songArtist = document.querySelector('.song-artist');
const songTitle = document.querySelector('.song-title');
const progressBar = document.querySelector('#progress-bar');
let pPause = document.querySelector('#play-pause');

songIndex = 0;
songs = ['./assets/music/bankroll.mp3', './assets/music/letgo.mp3', './assets/music/ok.mp3', './assets/music/taj.mp3'];
thumbnails = ['./assets/images/bankroll.jpg', './assets/images/letgo.jfif' , './assets/images/ok.jfif' , './assets/images/taj.jfif'];
songArtists = ['Brockhampton ft. A$AP Ferg, A$AP Rocky', 'Aaron May' , 'Seven Phoenix, Szczyl' , 'BLR, POOK'];
songTitles = ["BANKROLL", "Let Go" , "WSZYSTKO OK" , "Taj"];

let playing = true;
function playPause() {
    if (playing) {
        const song = document.querySelector('#song');

        song.play();
        playing = false;
    } else {

        song.pause();
        playing = true;
    }
}

song.addEventListener('ended', function(){
    nextSong();
});

function nextSong() {
    songIndex++;
    if (songIndex > 4) {
        songIndex = 0;
    }
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 4;
    }
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
}

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){
        sec  = `0${sec}`;
    }
    return `${min}:${sec}`;
}

setInterval(updateProgressValue, 500);

function changeProgressBar() {
    song.currentTime = progressBar.value;
}

