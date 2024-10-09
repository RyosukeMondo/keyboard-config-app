let width_min = 1.137;
let width_mid = 1.32;
let width_max = 1.30;
let width_tab = 2;
let width_caps = 2.3;
let width_enter = 1.7;
let width_left_shift = 3.1;
let width_space = 5.5;
let width_arrow = 1.24;
let height_min = 0.75;
let height_mid = 1.26;
let height_max = 1.43;
let keyConfig = [
  // Top row
  [
    { letter: 'Esc', width: width_min, height: height_min },
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
    { letter: 'Snapshot', width: width_min, height: height_min },
    { letter: 'Scroll', width: width_min, height: height_min },
    { letter: 'NumLock', width: width_min, height: height_min },
    { letter: 'Del', width: width_min, height: height_min },
  ],
  // Second row
  [
    { letter: 'Kanji', width: width_max, height: height_mid },
    { letter: '_1', width: width_max, height: height_mid },
    { letter: '_2', width: width_max, height: height_mid },
    { letter: '_3', width: width_max, height: height_mid },
    { letter: '_4', width: width_max, height: height_mid },
    { letter: '_5', width: width_max, height: height_mid },
    { letter: '_6', width: width_max, height: height_mid },
    { letter: '_7', width: width_max, height: height_mid },
    { letter: '_8', width: width_max, height: height_mid },
    { letter: '_9', width: width_max, height: height_mid },
    { letter: '_0', width: width_max, height: height_mid },
    { letter: 'Minus', width: width_max, height: height_mid },
    { letter: 'Caret', width: width_max, height: height_mid },
    { letter: 'Yen', width: width_max, height: height_mid },
    { letter: 'BS', width: width_max, height: height_mid },
  ],
  // Third row
  [
    { letter: 'Tab', width: width_tab, height: height_mid },
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
    { letter: 'Atmark', width: width_max, height: height_mid },
    { letter: 'OpenBracket', width: width_max, height: height_mid },
    { letter: '', width: width_tab, height: height_mid },
  ],
  // Fourth row
  [
    { letter: 'Eisuu', width: width_caps, height: height_mid },
    { letter: 'A', width: width_max, height: height_mid },
    { letter: 'S', width: width_max, height: height_mid },
    { letter: 'D', width: width_max, height: height_mid },
    { letter: 'F', width: width_max, height: height_mid },
    { letter: 'G', width: width_max, height: height_mid },
    { letter: 'H', width: width_max, height: height_mid },
    { letter: 'J', width: width_max, height: height_mid },
    { letter: 'K', width: width_max, height: height_mid },
    { letter: 'L', width: width_max, height: height_mid },
    { letter: 'Semicolon', width: width_max, height: height_mid },
    { letter: 'Colon', width: width_max, height: height_mid },
    { letter: 'CloseBracket', width: width_max, height: height_mid },
    { letter: 'Enter', width: width_enter, height: height_mid },
  ],
  // Fifth row
  [
    { letter: 'LShift', width: width_left_shift, height: height_mid },
    { letter: 'Z', width: width_max, height: height_mid },
    { letter: 'X', width: width_max, height: height_mid },
    { letter: 'C', width: width_max, height: height_mid },
    { letter: 'V', width: width_max, height: height_mid },
    { letter: 'B', width: width_max, height: height_mid },
    { letter: 'N', width: width_max, height: height_mid },
    { letter: 'M', width: width_max, height: height_mid },
    { letter: 'Comma', width: width_max, height: height_mid },
    { letter: 'Period', width: width_max, height: height_mid },
    { letter: 'Slash', width: width_max, height: height_mid },
    { letter: 'ReverseSolidus', width: width_max, height: height_mid },
    { letter: 'RShift', width: width_caps, height: height_mid },
  ],
  // Sixth row
  [
    { letter: 'FN', width: width_mid, height: height_max },
    { letter: 'LCtrl', width: width_mid, height: height_max },
    { letter: 'LWin', width: width_mid, height: height_max },
    { letter: 'LAlt', width: width_mid, height: height_max },
    { letter: 'NonConvert', width: width_mid, height: height_max },
    { letter: 'Space', width: width_space, height: height_max },
    { letter: 'Hiragana', width: width_mid, height: height_max },
    { letter: 'Convert', width: width_mid, height: height_max },
    { letter: 'RCtrl', width: width_arrow, height: height_max },
    { letter: '', width: width_mid, height: height_max },
    { letter: '↑', width: width_arrow, height: height_max },
    { letter: '', width: width_arrow, height: height_max },
  ],
  // Last row
  [
    { letter: '', width: 16.9, height: height_max },
    { letter: '←', width: width_arrow, height: height_max },
    { letter: '↓', width: width_arrow, height: height_max },
    { letter: '→', width: width_arrow, height: height_max },
  ]
];

export default keyConfig;
