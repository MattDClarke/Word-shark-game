var ENGLISH_WORDS = [
  "anthropomorphism",
  "stomachache",
  "fever",
  "doctor",
  "medicine",
  "rest", 
  "cold",
  "can",
  "encyclopedia",
  "supercalafragalisticexpialadocious"
];

function randomWord() {
  return ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
}

export { randomWord };
