const tempo = 60; // BPM (beats per minute)
const key = 'Bb'; // Key to determine valid notes.
let currentKeyArray = [];

const dynamicValues = ['ff','mf', 'pp'];
const noteValue = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];
const noteLengthValues = [
  60 / (tempo / 4),   //whole
  60 / (tempo / 2),   //half
  60 / tempo,         //quarter
  60 / (tempo / 0.5), //eighth
  60 / (tempo / 0.25) //sixteenth
];

const musicTypes = [
  'note',
  'interval',
  'chord'
];

const chordTypes = [
  [4, 3],     //major
  [4, 3, 3],  //seventh
  [4, 3, 4],  //major seventh
  [3, 4],     //minor
  [3, 4, 3]   //minor seventh
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

function getRandomPanValue() {
  return -100 + (Math.random() * 200);
}

function getNoteUrl(note, octave, dynamicValue) {
  return '/samples/mp3piano/Piano.' + dynamicValue + '.' + note + octave + '.mp3';
}

export function getRandomNoteLength() {
  const noteLen = noteLengthValues[Math.round(Math.random() * (noteLengthValues.length - 1))];
  return noteLen * 1000;
}

function generateNote() {
  const note = currentKeyArray[Math.round(Math.random() * (currentKeyArray.length - 1))];
  const octave = Math.round(Math.random() * 7);
  const dynamicValue = dynamicValues[Math.round(Math.random() * (dynamicValues.length - 1))];

  return {
    note: note,
    octave: octave,
    dynamicValue: dynamicValue,
    url: getNoteUrl(note, octave, dynamicValue),
    xPan: getRandomPanValue(),
    yPan: getRandomPanValue(),
    duration: getRandomNoteLength()
  }
}

function generateInterval() {
  const notes = [];

  notes.push(generateNote());
  notes.push(notes[0]);
  notes[1].url = getRandomNoteUrl();

  return notes;
}

function generateChord() {
  const notes = [];

  const root = generateNote();
  notes.push(root);

  let currentInterval = 0;


  const chordType = chordTypes[Math.round(Math.random() * (chordTypes.length - 1))];

  for (let i = 0; i < chordType.length; i++) {
    currentInterval += chordType[i];
    let newNote = JSON.parse(JSON.stringify(root));
    newNote.note = noteValue[(noteValue.indexOf(root.note) + currentInterval) % noteValue.length];
    newNote.url = getNoteUrl(newNote.note, newNote.octave, newNote.dynamicValue);
    notes.push(newNote);
    console.log(newNote.note);
  }

  return notes;
}

export function getMusic() {
  //randomly decide between notes, intervals, and chords
  var musicType = musicTypes[Math.round(Math.random() * (musicTypes.length - 1))];
  console.log(musicType);
  var music = [];

  switch(musicType) {
    case 'note':
      return [generateNote()];
      break;
    case 'interval':
      return [generateNote()];
      break;
    case 'chord':
      return generateChord();
      break;
  }

  return music;
}
