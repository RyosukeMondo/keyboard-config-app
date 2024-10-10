import json


def parse_and_update_json(input_txt, key_names, input_key_name_group, input_key_assignment):
    """
    Parses a text file, updates a JSON file based on the text file content, and exports the updated JSON.

    Args:
        input_txt (str): Path to the input text file.
        key_names (list): List of valid key names.
        input_key_name_group (str): Path to the input JSON file containing key name groups.
        input_key_assignment (str): Path to the input JSON file containing key assignments.
    """

    def find_key_in_groups(key, key_name_group):
        """Finds the actual key name from key name groups."""
        for group in key_name_group:
            if key in group:
                for k in group:
                    if k in key_assignments:
                        return k
        return None

    def split_value(value):
        if "-THAN" in value:
            value = value.replace("-THAN", "_THAN")
        parts = value.split("-")
        # replace back _THAN with -THAN
        parts = [part.replace("_THAN", "-THAN") for part in parts]
        return parts

    def parse_modifiers(modifier_str):
        """Parses a modifier string and returns a dictionary of modifiers."""
        modifiers = {
            "Win": False,
            "Ctrl": False,
            "Alt": False,
            "Shift": False
        }
        if modifier_str:
            for mod in modifier_str.split("-"):
                if mod == "S":
                    modifiers["Shift"] = True
                elif mod == "C":
                    modifiers["Ctrl"] = True
                elif mod == "A":
                    modifiers["Alt"] = True
                elif mod == "W":
                    modifiers["Win"] = True
        return modifiers

    with open(input_txt, "r", encoding='utf-8') as f:
        lines = f.readlines()

    with open(input_key_name_group, "r", encoding='utf-8') as f:
        key_name_group = json.load(f)

    with open(input_key_assignment, "r", encoding='utf-8') as f:
        key_assignments = json.load(f)

    for line in lines:
        line = line.strip()
        if not line or "=" not in line:
            continue
        else:
            # print(f"Processing line: {line}")
            pass

        try:
            key_mod, key_value = line.split(" = ")
            mod_index, key_raw = key_mod.split("-")
            # print(f"Key: {key_raw}, Mod Index: {mod_index}, Value: {key_value}")
            mod_index = int(mod_index.replace("m", ""))

            # Find the actual key name from key name groups if not found directly
            if key_raw not in key_assignments:
                key = find_key_in_groups(key_raw, key_name_group)
                if not key:
                    print(f"Missing key in mod: {key_raw} in {line}")
                    continue
            else:
                key = key_raw

            # Find the actual key name for the value from key name groups if not found directly
            key_value_parts = split_value(key_value)
            value_key_name_raw = key_value_parts[-1]
            if value_key_name_raw not in key_names:
                value_key_name = find_key_in_groups(value_key_name_raw, key_name_group)
                if not value_key_name:
                    print(f"Missing key in value: {value_key_name_raw} in {line}")
                    continue
            else:
                value_key_name = value_key_name_raw

            # Update key assignments
            key_assignment = key_assignments[key]
            mod_key_name = f"mod{mod_index}key"
            key_assignment[mod_key_name]["key_name"] = value_key_name
            key_assignment[mod_key_name]["modifiers"] = parse_modifiers(key_value[:-len(value_key_name)-1])

        except Exception as e:
            print(f"Error parsing line: {line}")
            print(e)

    # Export updated JSON
    with open("./tmp/updated_key_assignments.json", "w", encoding='utf-8') as f:
        json.dump(key_assignments, f, indent=4)

# Example usage
input_txt = "./tmp/modkeys.txt"
key_names = ["A", "Atmark", "B", "BS", "C", "Caret", "CloseBracket", "Colon", "Comma",
"Convert", "D", "Del", "E", "Eisuu", "Enter", "Esc", "F", "F1", "F10",
"F11", "F12", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "FN", "G", "H",
"Hiragana", "I", "J", "K", "Kanji", "L", "LAlt", "LCtrl", "LShift", "LWin", "M",
"Minus", "N", "NonConvert", "NumLock", "O", "OpenBracket", "P", "Period",
"Q", "R", "RCtrl", "RShift", "ReverseSolidus", "S", "Scroll", "Semicolon", "Slash",
"Snapshot", "Space", "T", "Tab", "U", "V", "W", "X", "Y", "Yen", "Z", "_0",
"_1", "_2", "_3", "_4", "_5", "_6", "_7", "_8", "_9", "Left", "Up", "Right", "Down",
"PageUp", "PageDown", "End", "Home", "Insert", "Apps", "Power", "Sleep",]

key_eq = ["$AMPERSAND", "$APOSTROPHE", "$ASTERISK", "$CIRCUMFLEX_ACCENT", "$COLON", "$COMMA",
"$COMMERCIAL_AT", "$CapsLock", "$DIGIT_EIGHT", "$DIGIT_FIVE", "$DIGIT_FOUR", "$DIGIT_NINE",
"$DIGIT_ONE", "$DIGIT_SEVEN", "$DIGIT_SIX", "$DIGIT_THREE", "$DIGIT_TWO", "$DIGIT_ZERO",
"$DOLLAR_SIGN", "$EQUALS_SIGN", "$EXCLAMATION_MARK", "$FULL_STOP", "$GRAVE_ACCENT", "$GREATER-THAN_SIGN", "$HYPHEN-MINUS",
"$LATIN_CAPITAL_LETTER_A", "$LATIN_CAPITAL_LETTER_B", "$LATIN_CAPITAL_LETTER_C", "$LATIN_CAPITAL_LETTER_D", "$LATIN_CAPITAL_LETTER_E", "$LATIN_CAPITAL_LETTER_F", "$LATIN_CAPITAL_LETTER_G", "$LATIN_CAPITAL_LETTER_H", "$LATIN_CAPITAL_LETTER_I", "$LATIN_CAPITAL_LETTER_J", "$LATIN_CAPITAL_LETTER_K", "$LATIN_CAPITAL_LETTER_L", "$LATIN_CAPITAL_LETTER_M", "$LATIN_CAPITAL_LETTER_N", "$LATIN_CAPITAL_LETTER_O", "$LATIN_CAPITAL_LETTER_P", "$LATIN_CAPITAL_LETTER_Q", "$LATIN_CAPITAL_LETTER_R", "$LATIN_CAPITAL_LETTER_S", "$LATIN_CAPITAL_LETTER_T", "$LATIN_CAPITAL_LETTER_U", "$LATIN_CAPITAL_LETTER_V", "$LATIN_CAPITAL_LETTER_W", "$LATIN_CAPITAL_LETTER_X", "$LATIN_CAPITAL_LETTER_Y", "$LATIN_CAPITAL_LETTER_Z",
"$LATIN_SMALL_LETTER_A", "$LATIN_SMALL_LETTER_B", "$LATIN_SMALL_LETTER_C", "$LATIN_SMALL_LETTER_D", "$LATIN_SMALL_LETTER_E", "$LATIN_SMALL_LETTER_F", "$LATIN_SMALL_LETTER_G", "$LATIN_SMALL_LETTER_H", "$LATIN_SMALL_LETTER_I", "$LATIN_SMALL_LETTER_J", "$LATIN_SMALL_LETTER_K", "$LATIN_SMALL_LETTER_L", "$LATIN_SMALL_LETTER_M", "$LATIN_SMALL_LETTER_N", "$LATIN_SMALL_LETTER_O", "$LATIN_SMALL_LETTER_P", "$LATIN_SMALL_LETTER_Q", "$LATIN_SMALL_LETTER_R", "$LATIN_SMALL_LETTER_S", "$LATIN_SMALL_LETTER_T", "$LATIN_SMALL_LETTER_U", "$LATIN_SMALL_LETTER_V", "$LATIN_SMALL_LETTER_W", "$LATIN_SMALL_LETTER_X", "$LATIN_SMALL_LETTER_Y", "$LATIN_SMALL_LETTER_Z",
"$LEFT_CURLY_BRACKET", "$LEFT_PARENTHESIS", "$LEFT_SQUARE_BRACKET", "$LESS-THAN_SIGN", "$LOW_LINE",
"$NUMBER_SIGN", "$PERCENT_SIGN", "$PLUS_SIGN", "$QUESTION_MARK", "$QUOTATION_MARK", "$REVERSE_SOLIDUS",
"$RIGHT_CURLY_BRACKET", "$RIGHT_PARENTHESIS", "$RIGHT_SQUARE_BRACKET", "$SEMICOLON",
"$SOLIDUS", "$SPACE", "$TILDE", "$ToggleIME", "$VERTICAL_LINE"]

key_names.extend(key_eq)

input_key_name_group = "./tmp/key_name_group.json"
input_key_assignment = "./tmp/keyAssignments.json"

parse_and_update_json(input_txt, key_names, input_key_name_group, input_key_assignment)