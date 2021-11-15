const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const throttle = require('lodash.throttle');

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const prevPlayTime = localStorage.getItem('videoplayer-current-time');
const onTimeUpdate = event => localStorage.setItem('videoplayer-current-time', event.seconds);

player
  .setCurrentTime(prevPlayTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });

player.on('timeupdate', throttle(onTimeUpdate, 1000));
