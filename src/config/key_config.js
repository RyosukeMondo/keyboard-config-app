let width_min = 1.14;
let width_mid = 1.32;
let width_max = 1.30;
let height_min = 0.75;
let height_mid = 1.26;
let height_max = 1.43;
let keyConfig = [
  // Top row
  [
    { letter: 'Esc', width: 1.1, height: height_min },
    { letter: 'F1', width: width_min, height: height_min },
    { letter: 'F2', width: width_min, height: height_min },
    { letter: 'F3', width: width_min, height: height_min },
    { letter: 'F4', width: width_min, height: height_min },
    { letter: 'F5', width: width_min, height: height_min },
    { letter: 'F6', width: width_min, height: height_min },
    { letter: 'F7', width: width_min, height: height_min },
    { letter: 'F8', width: width_min, height: height_min },
    { letter: 'F9', width: width_min, height: height_min },
    { letter: 'F10', width: width_min, height: height_min },
    { letter: 'F11', width: width_min, height: height_min },
    { letter: 'F12', width: width_min, height: height_min },
    { letter: 'PSc', width: width_min, height: height_min },
    { letter: 'ScL', width: width_min, height: height_min },
    { letter: 'Brk', width: width_min, height: height_min },
    { letter: 'Del', width: width_min, height: height_min },
  ],
  // Second row
  [
    { letter: '半角', width: width_max, height: height_mid },
    { letter: '1', width: width_max, height: height_mid },
    { letter: '2', width: width_max, height: height_mid },
    { letter: '3', width: width_max, height: height_mid },
    { letter: '4', width: width_max, height: height_mid },
    { letter: '5', width: width_max, height: height_mid },
    { letter: '6', width: width_max, height: height_mid },
    { letter: '7', width: width_max, height: height_mid },
    { letter: '8', width: width_max, height: height_mid },
    { letter: '9', width: width_max, height: height_mid },
    { letter: '0', width: width_max, height: height_mid },
    { letter: '-', width: width_max, height: height_mid },
    { letter: '^', width: width_max, height: height_mid },
    { letter: '¥', width: width_max, height: height_mid },
    { letter: 'BK', width: 1.3, height: height_mid },
  ],
  // Third row
  [
    { letter: 'Tab', width: 2, height: height_mid },
    { letter: 'Q', width: width_max, height: height_mid },
    { letter: 'W', width: width_max, height: height_mid },
    { letter: 'E', width: width_max, height: height_mid },
    { letter: 'R', width: width_max, height: height_mid },
    { letter: 'T', width: width_max, height: height_mid },
    { letter: 'Y', width: width_max, height: height_mid },
    { letter: 'U', width: width_max, height: height_mid },
    { letter: 'I', width: width_max, height: height_mid },
    { letter: 'O', width: width_max, height: height_mid },
    { letter: 'P', width: width_max, height: height_mid },
    { letter: '@', width: width_max, height: height_mid },
    { letter: '[', width: width_max, height: height_mid },
    { letter: '', width: 2, height: height_mid },
  ],
  // Fourth row
  [
    { letter: 'Caps', width: 2.3, height: height_mid },
    { letter: 'A', width: width_max, height: height_mid },
    { letter: 'S', width: width_max, height: height_mid },
    { letter: 'D', width: width_max, height: height_mid },
    { letter: 'F', width: width_max, height: height_mid },
    { letter: 'G', width: width_max, height: height_mid },
    { letter: 'H', width: width_max, height: height_mid },
    { letter: 'J', width: width_max, height: height_mid },
    { letter: 'K', width: width_max, height: height_mid },
    { letter: 'L', width: width_max, height: height_mid },
    { letter: ';', width: width_max, height: height_mid },
    { letter: ':', width: width_max, height: height_mid },
    { letter: ']', width: width_max, height: height_mid },
    { letter: 'Enter', width: 1.7, height: height_mid },
  ],
  // Fifth row
  [
    { letter: 'Shift', width: 3.1, height: height_mid },
    { letter: 'Z', width: width_max, height: height_mid },
    { letter: 'X', width: width_max, height: height_mid },
    { letter: 'C', width: width_max, height: height_mid },
    { letter: 'V', width: width_max, height: height_mid },
    { letter: 'B', width: width_max, height: height_mid },
    { letter: 'N', width: width_max, height: height_mid },
    { letter: 'M', width: width_max, height: height_mid },
    { letter: ',', width: width_max, height: height_mid },
    { letter: '.', width: width_max, height: height_mid },
    { letter: '/', width: width_max, height: height_mid },
    { letter: '\\', width: width_max, height: height_mid },
    { letter: 'Shift', width: 2.30, height: height_mid },
  ],
  // Sixth row
  [
    { letter: 'FN', width: width_mid, height: height_max },
    { letter: 'Ctrl', width: width_mid, height: height_max },
    { letter: 'Win', width: width_mid, height: height_max },
    { letter: 'Alt', width: width_mid, height: height_max },
    { letter: 'Ctrl', width: width_mid, height: height_max },
    { letter: 'Space', width: 5.5, height: height_max },
    { letter: '変換', width: width_mid, height: height_max },
    { letter: 'Kana', width: width_mid, height: height_max },
    { letter: 'Ctrl', width: width_mid, height: height_max },
    { letter: '', width: 1.25, height: height_max },
    { letter: '↑', width: 1.25, height: height_max },
    { letter: '', width: 1.25, height: height_max },
  ],
  // Last row
  [
    { letter: '', width: 16.9, height: height_max },
    { letter: '←', width: 1.25, height: height_max },
    { letter: '↓', width: 1.25, height: height_max },
    { letter: '→', width: 1.25, height: height_max },
  ]
];

export default keyConfig;
