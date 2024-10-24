import json
import os

# Define file paths
base_json_path = r"C:\Users\ryosu\yamy\key_assignments_lr_ud.json"
swapped_json_path = r"C:\Users\ryosu\yamy\key_assignments_lr_ud2.json"

# Define swap pairs
swap_pairs = [
    ("F7", "Esc"),
    ("F6", "F7"),
    ("F5", "F6"),
    ("F4", "F5"),
    ("F3", "F4"),
    ("F2", "F3"),
    ("F1", "F2"),
    ("Esc", "F1"),

    ("Kanji", "_1"),
    ("_1", "_2"),
    ("_2", "_3"),
    ("_3", "_4"),
    ("_4", "_5"),
    ("_5", "_6"),
    ("_6", "Kanji"),

    ("Tab", "Q"),
    ("Q", "W"),
    ("W", "E"),
    ("E", "R"),
    ("R", "T"),
    ("T", "Y"),
    ("Y", "Tab"),

    ("A", "S"),
    ("S", "D"),
    ("D", "F"),
    ("F", "G"),
    ("G", "H"),
    ("H", "Eisuu"),

    ("LShift", "Z"),
    ("Z", "X"),
    ("X", "C"),
    ("C", "V"),
    ("V", "B"),
    ("B", "N"),
    ("N", "LShift"),

    ("FN", "LCtrl"),
    ("LCtrl", "LWin"),
    ("LWin", "LAlt"),
    ("LAlt", "NonConvert"),
    ("NonConvert", "Space"),
    ("Space", "FN"),
]


def load_json(file_path):
    """Load JSON data from a file."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"The file {file_path} does not exist.")
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)


def save_json(data, file_path):
    """Save JSON data to a file."""
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2)
    print(f"Swapped JSON saved to {file_path}")


def swap_keys(data, swap_pairs):
    """Swap keys in the JSON data based on the swap_pairs list."""
    data_copy = data.copy()
    for pair in swap_pairs:
        key1, key2 = pair
        # Check if both keys exist in the JSON
        if key1 in data_copy and key2 in data_copy:
            # Swap the entries
            data_copy[key1], data_copy[key2] = data_copy[key2], data_copy[key1]
            print(f"Swapped '{key1}' with '{key2}'")
        else:
            missing = []
            if key1 not in data_copy:
                missing.append(key1)
            if key2 not in data_copy:
                missing.append(key2)
            print(
                f"Cannot swap '{key1}' with '{key2}': Missing keys {', '.join(missing)}")
    return data_copy


def main():
    try:
        # Load the base JSON
        print(f"Loading base JSON from {base_json_path}")
        base_data = load_json(base_json_path)

        # Perform the key swaps
        print("Performing key swaps...")
        swapped_data = swap_keys(base_data, swap_pairs)

        # Save the swapped JSON
        save_json(swapped_data, swapped_json_path)

    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
