// Create a new audio context.
const ctx = new AudioContext();
ctx.listener.setPosition(0, 0, 0);
// Create a AudioGainNode to control the main volume.
const mainVolume = ctx.createGain();
// Connect the main volume node to the context destination.
mainVolume.connect(ctx.destination);
var dynamicValues = ['ff','mf', 'pp'];
var pitchValue = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'Ab1', 'Ab2', 'Ab3', 'Ab4', 'Ab5', 'Ab6', 'Ab7', 'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'Bb0', 'Bb1', 'Bb2', 'Bb3', 'Bb4', 'Bb5', 'Bb6', 'Bb7', 'C1','C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'Db1', 'Db2', 'Db3', 'Db4', 'Db5', 'Db6', 'Db7', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'Eb1', 'Eb2', 'Eb3', 'Eb4', 'Eb5', 'Eb6', 'Eb7', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'Gb1', 'Gb2', 'Gb3', 'Gb4', 'Gb5', 'Gb6', 'Gb7'];
let intervalRef = null;

export function changeVolume(newVolume) {
  mainVolume.gain.value = newVolume;
}

export function stopMusic() {
  clearInterval(intervalRef);
}

export function startMusic() {

  var tempo = 120; // BPM (beats per minute)
  var quarterNoteTime = 60 / tempo;

  intervalRef = setInterval( () => {
    var pitchIndex = Math.round(Math.random() * 86);
    play(pitchValue[pitchIndex], -100 + (Math.random() * 200), -100 + (Math.random() * 200), ctx.currentTime);
  }, quarterNoteTime * 1000);
}

function play(pitch, xPercentage, yPercentage, time) {
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
  console.log('/samples/mp3piano/Piano.' + dynamicValues[dynamicValuesNo] + '.' + pitch + '.mp3');
  if( (pitch === 'Gb7') && (dynamicValues[dynamicValuesNo] === 'mf') ){
    console.log("we hit a Gb7 mf which doesnt exist");
    dynamicValuesNo = 0;
  }else if ( (pitch === 'Bb0') && (dynamicValues[dynamicValuesNo] === 'mf') ){
    console.log("we hit a Bb0 mf which doesnt exist");
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
      sound.source.start(time);
    }, function onFailure() {
      console.error('Failed to load audio', arguments);
    });
  };
  request.send();
};
