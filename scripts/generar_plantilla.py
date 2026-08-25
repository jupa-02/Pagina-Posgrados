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

df = pd.DataFrame(columns=columns)
output_path = '/Users/juanpablo/Desktop/Pagina posgrados/Plantilla_Cronograma_IPAS.xlsx'

writer = pd.ExcelWriter(output_path, engine='xlsxwriter')
# No escribimos el header de pandas por defecto para tener más control
df.to_excel(writer, sheet_name='Cronograma', startrow=5, header=False, index=False)

workbook = writer.book
worksheet = writer.sheets['Cronograma']

# Formato institucional para el encabezado principal
title_format = workbook.add_format({
    'bold': True,
    'font_size': 14,
    'valign': 'vcenter',
    'font_color': '#213363',
    'bg_color': '#F4F4F4'
})
subtitle_format = workbook.add_format({
    'bold': True,
    'font_size': 11,
    'valign': 'vcenter',
    'font_color': '#213363',
    'bg_color': '#F4F4F4'
})

# Escribir los textos institucionales
worksheet.merge_range('B1:L1', 'UNIVERSIDAD DE CARTAGENA', title_format)
worksheet.merge_range('B2:L2', 'FACULTAD DE CIENCIAS ECONÓMICAS', subtitle_format)
worksheet.merge_range('B3:L3', 'DEPARTAMENTO DE POSTGRADOS Y EDUCACIÓN CONTINUA', subtitle_format)
worksheet.merge_range('B4:L4', 'FORMATO ESTANDARIZADO DE CRONOGRAMA DE ACTIVIDADES ACADÉMICAS', subtitle_format)

# Insertar el logo
worksheet.insert_image('A1', '/Users/juanpablo/Desktop/Pagina posgrados/public/logo-udec.png', 
                       {'x_scale': 0.15, 'y_scale': 0.15, 'x_offset': 10, 'y_offset': 10})

# Formato de la cabecera de la tabla
header_format = workbook.add_format({
    'bold': True,
    'text_wrap': True,
    'valign': 'top',
    'fg_color': '#213363',
    'font_color': 'white',
    'border': 1
})

# Escribir la cabecera de la tabla en la fila 5 (índice 4, pero empezamos datos en startrow=5, así que cabecera en fila 4)
for col_num, value in enumerate(df.columns.values):
    worksheet.write(5, col_num, value, header_format)

# Ajustar altura de las filas institucionales
worksheet.set_row(0, 30)
worksheet.set_row(1, 20)
worksheet.set_row(2, 20)
worksheet.set_row(3, 20)
worksheet.set_row(4, 10) # Fila en blanco como separador
worksheet.set_row(5, 45) # Cabecera de la tabla (más alta para el text_wrap)

# Ajustar el ancho de las columnas
worksheet.set_column('A:A', 35)
worksheet.set_column('B:B', 15)
worksheet.set_column('C:E', 20)
worksheet.set_column('F:F', 20)
worksheet.set_column('G:G', 30)
worksheet.set_column('H:I', 15)
worksheet.set_column('J:L', 25)

# Añadir validaciones de datos para las filas de datos (fila 6 a la 50)
for col_letter in ['C', 'D', 'F', 'J']:
    worksheet.data_validation(f'{col_letter}7:{col_letter}50', {
        'validate': 'list',
        'source': ['Sí', 'No'],
        'input_message': 'Seleccione Sí o No'
    })

worksheet.data_validation('E7:E50', {
    'validate': 'list',
    'source': ['Presencial', 'Híbrida', 'Virtual']
})

writer.close()
print(f"Plantilla institucional generada exitosamente en: {output_path}")
