import { generateInKeyNotes, getRandomPanValue, getRandomNoteUrl, getRandomNoteLength } from './music-generator';

// Create a new audio context.
const ctx = new AudioContext();
ctx.listener.setPosition(0, 0, 0);
// Create a AudioGainNode to control the main volume.
const mainVolume = ctx.createGain();
// Connect the main volume node to the context destination.
mainVolume.connect(ctx.destination);

let intervalRef = null;

export function changeVolume(newVolume) {
  mainVolume.gain.value = newVolume;
}

export function stopMusic() {
  clearInterval(intervalRef);
}

export function startMusic() {

  generateInKeyNotes();

  intervalRef = setInterval( () => {
    const url =  getRandomNoteUrl();
    play(url, getRandomPanValue(), getRandomPanValue(), ctx.currentTime, getRandomNoteLength() );
  }, getRandomNoteLength() );
}

function play(url, xPercentage, yPercentage, startTime, endTime) {
  // Create an object with a sound source and a volume control.

  const sound = {
    source: ctx.createBufferSource(),
    volume: ctx.createGain(),
    panner: ctx.createPanner()
  };
  // Connect the sound source to the volume control.
  sound.source.connect(sound.volume);
  // Instead of hooking up the volume to the main volume, hook it up to the panner.
  sound.volume.connect(sound.panner);
  // And hook up the panner to the main volume.
  sound.panner.connect(mainVolume);
  // Setup the audio position of the sound
  //set z index to zero for 2d sound
  sound.panner.setPosition(xPercentage / 100, yPercentage / 100, 0.5);
  let dynamicValuesNo = Math.round((Math.random()*2));
  // Make the sound source loop.
  sound.source.loop = false;
  let request = new XMLHttpRequest();
  request.open('GET', chrome.extension.getURL(url), true);

  request.responseType = 'arraybuffer';
  request.onload = function(e) {
    // Create a buffer from the response ArrayBuffer.
    ctx.decodeAudioData(this.response, function onSuccess(buffer) {
      sound.buffer = buffer;
      // Make the sound source use the buffer and start playing it
      sound.source.buffer = buffer;
      sound.source.start(startTime);
      sound.source.stop(endTime);
    }, function onFailure() {
      console.error('Failed to load audio', arguments);
    });
  };
  request.send();
};
