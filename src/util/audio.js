// Create a new audio context.
const ctx = new AudioContext();
ctx.listener.setPosition(0, 0, 0);
// Create a AudioGainNode to control the main volume.
const mainVolume = ctx.createGain();
// Connect the main volume node to the context destination.
mainVolume.connect(ctx.destination);
const dynamicValues = ['ff','mf', 'pp'];const noteValue = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];
const tempo = 60; // BPM (beats per minute)
const key = 'Bb'; // Key to determine valid notes.
let currentKeyArray = [];

function generateInKeyNotes(key) {
  let index = noteValue.indexOf(key);
  const scalePattern = [2, 2, 1, 2, 2, 2, 1]; //hard-coded as major scale

  currentKeyArray.push(key);

  for (let i = 0; i < scalePattern.length; i++) {
    index += scalePattern[i];
    //loop back over array if necessary
    index = index % noteValue.length;
    currentKeyArray.push(noteValue[index]);
  }
}

const noteLengthValues = [
  60 / (tempo / 4),   //whole
  60 / (tempo / 2),   //half
  60 / tempo,         //quarter
  60 / (tempo / 0.5), //eighth
  60 / (tempo / 0.25) //sixteenth
]

let intervalRef = null;

export function changeVolume(newVolume) {
  mainVolume.gain.value = newVolume;
}

export function stopMusic() {
  clearInterval(intervalRef);
}

export function startMusic() {

  generateInKeyNotes(key);

  intervalRef = setInterval( () => {
    const note = currentKeyArray[Math.round(Math.random() * (currentKeyArray.length - 1))];
    const octave = Math.round(Math.random() * 7);
    const pitch =  note + octave;
    play(pitch, -100 + (Math.random() * 200), -100 + (Math.random() * 200), ctx.currentTime, getRandomNoteValue() );
  }, getRandomNoteValue() );
}

function getRandomNoteValue() {
  const noteLen = noteLengthValues[Math.round(Math.random() * (noteLengthValues.length - 1))];
  return noteLen * 1000;
}

function play(pitch, xPercentage, yPercentage, startTime, endTime) {
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
  if( (pitch === 'Gb7') && (dynamicValues[dynamicValuesNo] === 'mf') ){
    dynamicValuesNo = 0;
  }else if ( (pitch === 'Bb0') && (dynamicValues[dynamicValuesNo] === 'mf') ){
    dynamicValuesNo = 0;
  }
  let request = new XMLHttpRequest();
  request.open('GET', chrome.extension.getURL('/samples/mp3piano/Piano.' + dynamicValues[dynamicValuesNo] + '.' + pitch + '.mp3'), true);

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
