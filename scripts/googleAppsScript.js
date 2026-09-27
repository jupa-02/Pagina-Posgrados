function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheetType = data.type; // 'inscripcion', 'contacto', 'empresa'
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Obtener o crear la hoja correspondiente
    let sheet = ss.getSheetByName(sheetType);
    if (!sheet) {
      sheet = ss.insertSheet(sheetType);
      // Crear cabeceras dependiendo del tipo
      if (sheetType === 'inscripcion') {
        sheet.appendRow(['Fecha', 'Nombres', 'Apellidos', 'Tipo_Doc', 'Documento', 'Email', 'Telefono', 'Curso_Titulo', 'Metodo_Pago', 'Nit_Empresa']);
      } else if (sheetType === 'contacto') {
        sheet.appendRow(['Fecha', 'Nombre', 'Telefono', 'Email', 'Programa_Interes', 'Dudas']);
      } else if (sheetType === 'empresa') {
        sheet.appendRow(['Fecha', 'Nombre_Empresa', 'Nit', 'Sector', 'Num_Empleados', 'Cargo_Contacto', 'Nombre_Contacto', 'Email', 'Telefono', 'Plan_Interes', 'Mensaje']);
      }
    }
    
    const timestamp = new Date();
    
    // Añadir fila
    if (sheetType === 'inscripcion') {
      sheet.appendRow([timestamp, data.nombres, data.apellidos, data.tipoDoc, data.documento, data.email, data.telefono, data.cursoTitulo, data.metodoPago, data.empresaNit || 'N/A']);
      
      // Enviar correo de bienvenida/confirmación
      MailApp.sendEmail({
        to: data.email,
        subject: "¡Qué emoción tenerte aquí! - Educación Continua UdeC",
        htmlBody: \`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <div style="text-align: center; padding: 20px 0;">
              <h2 style="color: #8B0000; margin: 0;">Bienvenido(a) a la Universidad de Cartagena, \${data.nombres}.</h2>
            </div>
            <p>Estimado(a) \${data.nombres},</p>
            <p>Le extendemos una cordial bienvenida a la comunidad académica de la <strong>Facultad de Ciencias Económicas de la Universidad de Cartagena</strong>. Confirmamos de manera oficial la recepción de su solicitud de admisión para el programa <strong>"\${data.cursoTitulo}"</strong>.</p>
            <p>Ha dado el primer paso hacia una experiencia académica superior. Comprendemos que su tiempo y su proyección profesional son de suma importancia; por ello, garantizamos un programa riguroso que cumpla con los más altos estándares de calidad.</p>
            
            <div style="background-color: #f0f7ff; border-left: 4px solid #0056b3; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #0056b3; font-size: 16px;">Material Exclusivo de Referencia</h3>
              <p style="margin-bottom: 0; font-size: 14px;">Previo al inicio formal de su proceso de matrícula, le invitamos a consultar nuestro <strong>Reporte Exclusivo de Tendencias y Futuro del Empleo</strong>. <a href="#" style="color: #0056b3; font-weight: bold;">Acceda al documento aquí</a>.</p>
            </div>

            <p><strong>Siguientes pasos en su proceso de admisión:</strong></p>
            <p>Un asesor académico especializado se pondrá en contacto con usted a la mayor brevedad para guiarle en la formalización de su matrícula y proporcionarle los accesos correspondientes a nuestra plataforma institucional.</p>
            
            <div style="background-color: #fcf8e3; border: 1px solid #faebcc; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <h3 style="margin-top: 0; color: #8a6d3b; font-size: 15px;">Beneficio de Matrícula Anticipada (Válido por 48 horas)</h3>
              <p style="margin-bottom: 0; color: #8a6d3b; font-size: 14px;">Al formalizar su matrícula en un plazo máximo de 48 horas, la Universidad le otorgará <strong>acceso becado a la Masterclass certificada de "Liderazgo Estratégico"</strong> como complemento integral a su formación.</p>
            </div>

            <div style="background-color: #f9f9f9; border-left: 4px solid #8B0000; padding: 15px; margin: 20px 0;">
              <p style="margin: 0;"><strong>¿No quieres esperar? (Atención Inmediata):</strong><br>
              Escríbenos directamente a nuestro canal prioritario de WhatsApp o <a href="#" style="color: #8B0000; font-weight: bold;">agenda una llamada en nuestro Calendario</a> en el horario que prefieras.</p>
              <a href="https://wa.me/573000000000?text=Hola,%20acabo%20de%20pre-inscribirme%20al%20curso%20\${encodeURIComponent(data.cursoTitulo)}%20y%20quiero%20continuar%20mi%20proceso%20para%20obtener%20el%20bono." style="display: inline-block; margin-top: 15px; background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Hablar por WhatsApp</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
            <p style="font-size: 13px; color: #666; font-style: italic; text-align: center;">"Únete a los más de 5,000 profesionales que han potenciado su carrera. El 85% de nuestros egresados reportan mejoras laborales en su primer año tras finalizar su programa con nosotros."</p>

            <p>Agradecemos su confianza en nuestros más de 200 años de trayectoria académica.</p>
            <p>Atentamente,<br><strong>Dirección de Posgrados y Educación Continua<br>Universidad de Cartagena</strong></p>
          </div>
        \`
      });
      
    } else if (sheetType === 'contacto') {
      sheet.appendRow([timestamp, data.nombre, data.telefono, data.email, data.programa, data.duda]);
      
      MailApp.sendEmail({
        to: data.email,
        subject: "¡Hola! Hemos recibido tu consulta - Posgrados UdeC",
        htmlBody: \`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <div style="padding: 20px 0;">
              <h2 style="color: #8B0000; margin: 0;">Confirmación de Recepción de Consulta</h2>
            </div>
            <p>Estimado(a) <strong>\${data.nombre}</strong>,</p>
            <p>Le agradecemos su interés en la Facultad de Ciencias Económicas. Confirmamos la recepción oficial de su solicitud de información correspondiente al programa <strong>"\${data.programa || 'nuestra oferta académica'}"</strong>.</p>
            <p>Comprendemos la importancia que reviste la elección de un programa de posgrado para su trayectoria profesional. Nuestro comité de admisiones se encuentra evaluando sus inquietudes para brindarle la asesoría más precisa y pertinente.</p>
            <p>A la brevedad, un asesor académico especializado se comunicará al número <strong>\${data.telefono}</strong> para orientarle de manera detallada y asistirle en el proceso de admisión institucional.</p>
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 14px; color: #666;">¿Tienes una duda urgente y quieres respuesta inmediata?</p>
              <a href="https://wa.me/573000000000?text=Hola,%20acabo%20de%20dejar%20mis%20datos%20en%20la%20página%20y%20tengo%20algunas%20dudas." style="display: inline-block; background-color: #8B0000; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Contáctanos por WhatsApp</a>
            </div>
            <p>Quedamos a su entera disposición.</p>
            <p>Cordialmente,<br><strong>Departamento de Admisiones<br>Universidad de Cartagena</strong></p>
          </div>
        \`
      });
      
    } else if (sheetType === 'empresa') {
      sheet.appendRow([timestamp, data.nombreEmpresa, data.nit, data.sector, data.numEmpleados, data.cargoContacto, data.nombreContacto, data.email, data.telefono, data.planInteres, data.mensaje]);
      
      MailApp.sendEmail({
        to: data.email,
        subject: "Alianza Estratégica: Solicitud Corporativa Recibida - UdeC Empresas",
        htmlBody: \`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <div style="padding: 20px 0;">
              <h2 style="color: #8B0000; margin: 0;">Desarrollo Estratégico Corporativo para \${data.nombreEmpresa}</h2>
            </div>
            <p>Estimado(a) \${data.nombreContacto},</p>
            <p>Reciba un cordial saludo. La Facultad de Ciencias Económicas de la Universidad de Cartagena confirma la recepción de su solicitud de alianza formativa correspondiente al plan <strong>"\${data.planInteres}"</strong>.</p>
            <p>Entendemos que el crecimiento de <strong>\${data.nombreEmpresa}</strong> depende de mantener a su equipo a la vanguardia, y nos enorgullece que haya pensado en nuestra institución (con sus más de 200 años de prestigio) como su aliado estratégico para lograrlo.</p>
            <p>Nuestro Director de Relacionamiento Corporativo ha sido notificado personalmente de su solicitud y se pondrá en contacto muy pronto para agendar una sesión de co-creación y una demostración exclusiva del Portal Corporativo UdeC.</p>
            <div style="background-color: #fcf8f8; border: 1px solid #eedded; padding: 20px; text-align: center; margin: 25px 0; border-radius: 8px;">
              <p style="margin-top: 0;"><strong>Atención Ejecutiva Inmediata</strong></p>
              <p style="font-size: 14px; color: #555;">Si desea priorizar la agenda de nuestra reunión, nuestro canal ejecutivo está disponible para usted en este momento:</p>
              <a href="https://wa.me/573000000000?text=Hola,%20soy%20\${data.nombreContacto}%20de%20\${data.nombreEmpresa}.%20Quisiera%20agendar%20la%20demostración%20del%20plan%20corporativo." style="display: inline-block; background-color: #111; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px;">Agendar vía WhatsApp Ejecutivo</a>
            </div>
            <p>Estamos listos para transformar el conocimiento de su equipo en resultados tangibles.</p>
            <p>Cordialmente,<br><strong>UdeC Corporate & Co-Creation Labs</strong></p>
          </div>
        \`
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({"success": true})).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"error": error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
