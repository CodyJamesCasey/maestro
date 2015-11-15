// A map to keep track of the audio
const audioCache = new Map();

// Create a new audio context.
const ctx = new AudioContext();
ctx.listener.setPosition(0, 0, 0);
// Create a AudioGainNode to control the main volume.
const mainVolume = ctx.createGain();
// Connect the main volume node to the context destination.
mainVolume.connect(ctx.destination);
var fortissimo = ['ff','mf', 'pp'];
export function play(pitch, xPercentage, yPercentage, zPercentage ) {
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
  sound.panner.setPosition(xPercentage / 100, yPercentage / 100, zPercentage / 100);
  console.log("x percentage: ", xPercentage / 100);
  console.log("y percentage: ", yPercentage / 100);
  console.log("z percentage: ", zPercentage / 100);

  // Make the sound source loop.
  sound.source.loop = false;
  // Check if the cache has the current pitch in memory already
  if (audioCache.has(pitch)) {
    let buffer = audioCache.get(pitch);
    sound.buffer = buffer;
    // Make the sound source use the buffer and start playing it
    sound.source.buffer = buffer;
    sound.source.start(ctx.currentTime);
  } else {
    let request = new XMLHttpRequest();
    request.open('GET', chrome.extension.getURL('/samples/mp3piano/Piano.ff.' + pitch + '.mp3'), true);
    let fortissimoNo = Math.round((Math.random()*2));
    console.log( fortissimoNo );
    console.log('/samples/mp3piano/Piano.' + fortissimo[fortissimoNo] + '.' + pitch + '.mp3');
    request.responseType = 'arraybuffer';
    request.onload = function(e) {
      // Create a buffer from the response ArrayBuffer.
      ctx.decodeAudioData(this.response, function onSuccess(buffer) {
        // Store the sound in the audioCache
        audioCache.set(pitch, buffer);
        sound.buffer = buffer;
        // Make the sound source use the buffer and start playing it
        sound.source.buffer = buffer;
        sound.source.start(ctx.currentTime);
      }, function onFailure() {
        console.error('Failed to load audio', arguments);
      });
    };
    request.send();
  }
};
