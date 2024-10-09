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
    { key_name: 'Esc', width: width_min, height: height_min },
    { key_name: 'F1', width: width_min, height: height_min },
    { key_name: 'F2', width: width_min, height: height_min },
    { key_name: 'F3', width: width_min, height: height_min },
    { key_name: 'F4', width: width_min, height: height_min },
    { key_name: 'F5', width: width_min, height: height_min },
    { key_name: 'F6', width: width_min, height: height_min },
    { key_name: 'F7', width: width_min, height: height_min },
    { key_name: 'F8', width: width_min, height: height_min },
    { key_name: 'F9', width: width_min, height: height_min },
    { key_name: 'F10', width: width_min, height: height_min },
    { key_name: 'F11', width: width_min, height: height_min },
    { key_name: 'F12', width: width_min, height: height_min },
    { key_name: 'Snapshot', width: width_min, height: height_min },
    { key_name: 'Scroll', width: width_min, height: height_min },
    { key_name: 'NumLock', width: width_min, height: height_min },
    { key_name: 'Del', width: width_min, height: height_min },
  ],
  // Second row
  [
    { key_name: 'Kanji', width: width_max, height: height_mid },
    { key_name: '_1', width: width_max, height: height_mid },
    { key_name: '_2', width: width_max, height: height_mid },
    { key_name: '_3', width: width_max, height: height_mid },
    { key_name: '_4', width: width_max, height: height_mid },
    { key_name: '_5', width: width_max, height: height_mid },
    { key_name: '_6', width: width_max, height: height_mid },
    { key_name: '_7', width: width_max, height: height_mid },
    { key_name: '_8', width: width_max, height: height_mid },
    { key_name: '_9', width: width_max, height: height_mid },
    { key_name: '_0', width: width_max, height: height_mid },
    { key_name: 'Minus', width: width_max, height: height_mid },
    { key_name: 'Caret', width: width_max, height: height_mid },
    { key_name: 'Yen', width: width_max, height: height_mid },
    { key_name: 'BS', width: width_max, height: height_mid },
  ],
  // Third row
  [
    { key_name: 'Tab', width: width_tab, height: height_mid },
    { key_name: 'Q', width: width_max, height: height_mid },
    { key_name: 'W', width: width_max, height: height_mid },
    { key_name: 'E', width: width_max, height: height_mid },
    { key_name: 'R', width: width_max, height: height_mid },
    { key_name: 'T', width: width_max, height: height_mid },
    { key_name: 'Y', width: width_max, height: height_mid },
    { key_name: 'U', width: width_max, height: height_mid },
    { key_name: 'I', width: width_max, height: height_mid },
    { key_name: 'O', width: width_max, height: height_mid },
    { key_name: 'P', width: width_max, height: height_mid },
    { key_name: 'Atmark', width: width_max, height: height_mid },
    { key_name: 'OpenBracket', width: width_max, height: height_mid },
    { key_name: '', width: width_tab, height: height_mid },
  ],
  // Fourth row
  [
    { key_name: 'Eisuu', width: width_caps, height: height_mid },
    { key_name: 'A', width: width_max, height: height_mid },
    { key_name: 'S', width: width_max, height: height_mid },
    { key_name: 'D', width: width_max, height: height_mid },
    { key_name: 'F', width: width_max, height: height_mid },
    { key_name: 'G', width: width_max, height: height_mid },
    { key_name: 'H', width: width_max, height: height_mid },
    { key_name: 'J', width: width_max, height: height_mid },
    { key_name: 'K', width: width_max, height: height_mid },
    { key_name: 'L', width: width_max, height: height_mid },
    { key_name: 'Semicolon', width: width_max, height: height_mid },
    { key_name: 'Colon', width: width_max, height: height_mid },
    { key_name: 'CloseBracket', width: width_max, height: height_mid },
    { key_name: 'Enter', width: width_enter, height: height_mid },
  ],
  // Fifth row
  [
    { key_name: 'LShift', width: width_left_shift, height: height_mid },
    { key_name: 'Z', width: width_max, height: height_mid },
    { key_name: 'X', width: width_max, height: height_mid },
    { key_name: 'C', width: width_max, height: height_mid },
    { key_name: 'V', width: width_max, height: height_mid },
    { key_name: 'B', width: width_max, height: height_mid },
    { key_name: 'N', width: width_max, height: height_mid },
    { key_name: 'M', width: width_max, height: height_mid },
    { key_name: 'Comma', width: width_max, height: height_mid },
    { key_name: 'Period', width: width_max, height: height_mid },
    { key_name: 'Slash', width: width_max, height: height_mid },
    { key_name: 'ReverseSolidus', width: width_max, height: height_mid },
    { key_name: 'RShift', width: width_caps, height: height_mid },
  ],
  // Sixth row
  [
    { key_name: 'FN', width: width_mid, height: height_max },
    { key_name: 'LCtrl', width: width_mid, height: height_max },
    { key_name: 'LWin', width: width_mid, height: height_max },
    { key_name: 'LAlt', width: width_mid, height: height_max },
    { key_name: 'NonConvert', width: width_mid, height: height_max },
    { key_name: 'Space', width: width_space, height: height_max },
    { key_name: 'Hiragana', width: width_mid, height: height_max },
    { key_name: 'Convert', width: width_mid, height: height_max },
    { key_name: 'RCtrl', width: width_arrow, height: height_max },
    { key_name: '', width: width_mid, height: height_max },
    { key_name: '↑', width: width_arrow, height: height_max },
    { key_name: '', width: width_arrow, height: height_max },
  ],
  // Last row
  [
    { key_name: '', width: 16.9, height: height_max },
    { key_name: '←', width: width_arrow, height: height_max },
    { key_name: '↓', width: width_arrow, height: height_max },
    { key_name: '→', width: width_arrow, height: height_max },
  ]
];

export default keyConfig;
