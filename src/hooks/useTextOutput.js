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
        const sec_text = `mod ${mod} += ${assignment.subst}`;
        const space_count = 50 - sec_text.length;
        modSection += `${sec_text}${' '.repeat(space_count)}# <- ${key}\n`;
      });

      // check if mod is not undefined
      if(modifiers.mod && modifiers.mod !== -1 ) {
        if (is_one_shot) {
          modSection += `mod mod${modifiers.mod} = !!${assignment.subst}\n`;
        } else {
          modSection += `mod mod${modifiers.mod} = ${assignment.subst}\n`;
        }
      }

      // #modX sections
      for (let i = 0; i <= 9; i++) {
        const modKey = assignment[`mod${i}key`];
        if (modKey && modKey.key_name) {
          // Construct the key combination string
          const modifiersList = Object.entries(modKey.modifiers)
            .filter(([mod, isActive]) => isActive)
            .map(([mod]) => mod)
            .join('-');

          const keyCombination = `*${assignment.subst}`;
          //modifiersList 
          //  ? `*${key}-*${modifiersList}-${assignment.subst}` 
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