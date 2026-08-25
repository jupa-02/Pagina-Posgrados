import json
import sys
import os

def main():
    file_path = 'scripts/extracted_solicitudes.json'
    
    # Read existing
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except:
                data = []
    else:
        data = []
        
    # Parse new from stdin
    input_str = sys.stdin.read()
    if not input_str.strip():
        return
        
    try:
        new_records = json.loads(input_str)
        if isinstance(new_records, list):
            data.extend(new_records)
        else:
            data.append(new_records)
    except Exception as e:
        print("Error parsing JSON:", e)
        return
        
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
if __name__ == '__main__':
    main()
