# add note for every mod key assign.

src\data\key_assignments.js

// sample
...
modNkey: {
    key_name: null, 
    modifiers: {Win: false, Ctrl: false, Alt: false, Shift: false},
    note: "memo", // add this
    },
...

enable input & update note in below component

src\components\keyAssign\AssignDefault.jsx
src\components\keyAssign\AssignMod.jsx

show note in stead of modifiers constructed value in key.jsx

src\components\Key.jsx

