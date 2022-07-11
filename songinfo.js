export const masterPlayButton = document.getElementById('master-play');
export const nextButton = document.getElementById('next');
export const previousButton = document.getElementById('previous');
export const duration = document.getElementById('duration');
export const current = document.getElementById('current-time')
export const progressBar = document.getElementById('progress-bar');
export const bottomTitle = document.getElementById('bottom-title');
export const playBtnList = document.getElementsByClassName('current-song');
export const about = document.getElementById('about');
export const closeButton = document.getElementsByClassName('closebtn')[0];

const songList = [
    "Linkin Park - Burning In The Skies",
    "Nirvana - On A Plain",
    "Led Zeppelin - Kashmir",
    "The Beatles - Strawberry Fields Forever",
    "Oasis - Don't Look Back In Anger",
    "Audioslave - Show Me How To Live",
    "Eminem - Rap God",
    "Gorillaz - Saturnz Barz",
    "Red Hot Chilli Peppers - Under The Bridge",
    "Smashing Pumpkins - Tonight Tonight",
    "Blink 182 - I Miss You",
    "Queen - Under Pressure",
    "Metallica - For Whom The Bells Toll",
    "Foo Fighters - Everlong",
    "AC/DC - Thunderstruck",
    "Soundgarden - Spoonman"
]

const song = document.getElementsByClassName('song');
export let songs = [];
for(let i = 1; i <= 16; i++) {
    let json = {
        song: songList[i-1],
        filePath: `music/mayur-${i}.mp3`,
        playButton: song[i-1].getElementsByClassName('fa-solid')[0]
    }
    songs.push(json);
}