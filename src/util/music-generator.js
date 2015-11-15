const dynamicValues = ['ff','mf', 'pp'];const noteValue = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];
const tempo = 60; // BPM (beats per minute)
const key = 'Bb'; // Key to determine valid notes.
let currentKeyArray = [];

const noteLengthValues = [
  60 / (tempo / 4),   //whole
  60 / (tempo / 2),   //half
  60 / tempo,         //quarter
  60 / (tempo / 0.5), //eighth
  60 / (tempo / 0.25) //sixteenth
]

export function generateInKeyNotes() {
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

export function getRandomPanValue() {
  return -100 + (Math.random() * 200);
}

export function getRandomNoteUrl() {
  const note = currentKeyArray[Math.round(Math.random() * (currentKeyArray.length - 1))];
  const octave = Math.round(Math.random() * 7);
  const dynamicValue = dynamicValues[Math.round(Math.random() * (dynamicValues.length - 1))];
  return '/samples/mp3piano/Piano.' + dynamicValue + '.' + note + octave + '.mp3';
}

export function getRandomNoteLength() {
  const noteLen = noteLengthValues[Math.round(Math.random() * (noteLengthValues.length - 1))];
  return noteLen * 1000;
}
