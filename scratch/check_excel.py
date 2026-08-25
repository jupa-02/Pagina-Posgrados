import pandas as pd
import json

file_path = '/Users/juanpablo/Desktop/Pagina posgrados/Cronogramas de Actividades Academicas Semestre II 2026.xlsx'
xls = pd.ExcelFile(file_path)

print(f"Hojas encontradas ({len(xls.sheet_names)}):")
for sheet in xls.sheet_names:
    print(f" - {sheet}")

    try:
        df = pd.read_excel(xls, sheet_name=sheet, nrows=20)
        # Buscar columnas relevantes
        print(f"   Columnas: {list(df.columns)}")
        # Print a few non-null rows
        print(df.head(5).dropna(how='all').to_string())
    except Exception as e:
        print(f"   Error reading sheet: {e}")
    print("\n" + "-"*50 + "\n")
