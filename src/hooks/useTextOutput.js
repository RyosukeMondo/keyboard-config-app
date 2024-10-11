import { useMemo } from 'react';

/**
 * Custom hook to generate formatted text output from keyAssignments.
 * @param {Object} keyAssignments - The key assignments data.
 * @returns {string} - The formatted text output.
 */
const useTextOutput = (keyAssignments) => {
  return useMemo(() => {
    let substSection = '# subst\n';
    let modSection = '# mod\n';
    let modSections = {}; // To hold #mod0, #mod1, etc.
    
    // Initialize modSections for mod0 to mod9
    for (let i = 0; i <= 9; i++) {
      modSections[`#mod${i}`] = '';
    }

    Object.entries(keyAssignments).forEach(([key, assignment]) => {
      if(key === 'FN'){
        return;
      }
      // #subst section
      const sec_text = `def subst *${key} = *${assignment.subst}`;
      const space_count = 50 - sec_text.length;
      const paddedText = `${sec_text} ${' '.repeat(space_count)}# <- ` + key + "\n";
      substSection += paddedText;

      // #mod section
      const { modifiers, is_one_shot } = assignment;
      const activeMods = Object.entries(modifiers)
        .filter(([mod, isActive]) => isActive && mod !== 'mod')
        .map(([mod]) => mod);
     
      activeMods.forEach((mod) => {
        const mod_keys = ["Alt", "Ctrl", "Shift", "Win"];
        mod_keys.forEach((mod_key) => {
          if(key.includes(mod_key)){
            if(mod_key === "Win"){
              modSection += `mod Windows -= ${key}\n`;
            } else {
              modSection += `mod ${mod_key} -= ${key}\n`;
            }
          }
        });
        const sec_text = `mod ${mod} += ${key}`;
        const space_count = 50 - sec_text.length;
        modSection += `${sec_text}${' '.repeat(space_count)}# <- ${assignment.subst}\n`;
      });

      // check if mod is not undefined
      if(modifiers.mod !== -1 && modifiers.mod !== undefined) {
        console.log(modifiers.mod);
        if (is_one_shot) {
          modSection += `mod mod${modifiers.mod} = !!${key}\n`;
        } else {
          modSection += `mod mod${modifiers.mod} = ${key}\n`;
        }
      }

      // #modX sections
      for (let i = 0; i <= 9; i++) {
        const modKey = assignment[`mod${i}key`];
        if (modKey && modKey.key_name) {
          const keyCombination = `*${assignment.subst}`;
          const key_part = modKey.key_name;
          // construct the modKey_part with combining with "-" with each modifier
          const modkey_part = Object.entries(modKey.modifiers)
            .filter(([mod, isActive]) => isActive)
            .map(([mod]) => mod[0].toUpperCase())
            .join('-');

          const targetCombination = `${modkey_part === '' ? "" : "" + modkey_part + "-"}${key_part}`;

          modSections[`#mod${i}`] += `key *W-*A-*S-*C-m${i}-${keyCombination} = *W-*A-*S-*C-${targetCombination}\n`;
        }
      }
    });

    // Combine all sections
    let finalOutput = `${substSection}\n${modSection}\n`;
    for (let i = 0; i <= 9; i++) {
      if (modSections[`#mod${i}`]) {
        finalOutput += `${modSections[`#mod${i}`]}\n`;
      }
    }

    return finalOutput.trim();
  }, [keyAssignments]);
};

export default useTextOutput;