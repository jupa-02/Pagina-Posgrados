import pandas as pd
import xlsxwriter

# Definir la estructura de la plantilla
columns = [
    "Nombre del Programa (Ej. Especialización en Finanzas)",
    "Número de Estudiantes (Ej. 30)",
    "Requiere Proyector (Sí/No)",
    "Requiere Software/Sala Cómputo (Sí/No)",
    "Modalidad (Presencial/Híbrida/Virtual)",
    "Trae Docente Foráneo/Invitado (Sí/No)",
    "Nombre del Docente",
    "Fecha Inicio (DD/MM/YYYY)",
    "Fecha Fin (DD/MM/YYYY)",
    "Requiere Accesibilidad Física (Sí/No)",
    "Tipo de Accesibilidad (Ej. Rampa, Ascensor, Ninguna)",
    "Franja Horaria Especial (Opcional)"
]

# Crear un DataFrame vacío con estas columnas
df = pd.DataFrame(columns=columns)

# Ruta donde se guardará
output_path = '/Users/juanpablo/Desktop/Pagina posgrados/Plantilla_Cronograma_IPAS.xlsx'

# Usar el engine xlsxwriter para darle formato bonito
writer = pd.ExcelWriter(output_path, engine='xlsxwriter')
df.to_excel(writer, sheet_name='Cronograma', index=False)

# Obtener el workbook y worksheet para aplicar formatos
workbook = writer.book
worksheet = writer.sheets['Cronograma']

# Formato de la cabecera
header_format = workbook.add_format({
    'bold': True,
    'text_wrap': True,
    'valign': 'top',
    'fg_color': '#213363', # Azul UdeC (o similar al branding)
    'font_color': 'white',
    'border': 1
})

# Escribir la cabecera con el formato
for col_num, value in enumerate(df.columns.values):
    worksheet.write(0, col_num, value, header_format)

# Ajustar el ancho de las columnas
worksheet.set_column('A:A', 35) # Programa
worksheet.set_column('B:B', 15) # Num Estudiantes
worksheet.set_column('C:E', 20) # Sí/Nos
worksheet.set_column('F:F', 20) # Docente foraneo
worksheet.set_column('G:G', 30) # Nombre Docente
worksheet.set_column('H:I', 15) # Fechas
worksheet.set_column('J:L', 25) # Accesibilidad

# Añadir validaciones de datos (Listas desplegables) para las primeras 20 filas
# Sí / No
for col_letter in ['C', 'D', 'F', 'J']:
    worksheet.data_validation(f'{col_letter}2:{col_letter}20', {
        'validate': 'list',
        'source': ['Sí', 'No'],
        'input_message': 'Seleccione Sí o No'
    })

# Modalidad
worksheet.data_validation('E2:E20', {
    'validate': 'list',
    'source': ['Presencial', 'Híbrida', 'Virtual']
})

writer.close()
print(f"Plantilla generada exitosamente en: {output_path}")
