import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const currentTimeKey = 'videoplayer-current-time-sec';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const storePlayTimeThrottled = throttle(storePlayTime, 1000);

player.on('timeupdate', storePlayTimeThrottled);
player.on('loaded', restorePlayTime);

function storePlayTime({ seconds }) {
  localStorage.setItem(currentTimeKey, seconds);
}

async function restorePlayTime() {
  const currentTime = +localStorage.getItem(currentTimeKey);

  if (!Number.isFinite(currentTime) || currentTime <= 0) {
    return;
  }

  try {
    await player.setCurrentTime(currentTime);
  } catch (e) {
    console.error(e);
  }
}
