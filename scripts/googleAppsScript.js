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
              <h2 style="color: #8B0000; margin: 0;">¡Qué emoción tenerte aquí, \${data.nombres}! 🎉</h2>
            </div>
            <p>Hola \${data.nombres},</p>
            <p>Queremos darte una cálida bienvenida a la comunidad de la <strong>Facultad de Ciencias Económicas de la Universidad de Cartagena</strong>. Nos llena de alegría confirmar que hemos recibido tu pre-inscripción para el curso <strong>"\${data.cursoTitulo}"</strong>.</p>
            <p>Has dado el primer paso hacia una experiencia transformadora. Sabemos que tu tiempo y tu futuro profesional son invaluables, y por eso nos aseguraremos de que este programa supere todas tus expectativas.</p>
            
            <div style="background-color: #f0f7ff; border-left: 4px solid #0056b3; padding: 15px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #0056b3; font-size: 16px;">🎁 Regalo Especial de Bienvenida</h3>
              <p style="margin-bottom: 0; font-size: 14px;">Mientras esperas que nuestro asesor te contacte, queremos adelantarte valor. Descarga gratis nuestro <strong>Reporte Exclusivo de Tendencias y Futuro del Empleo</strong> <a href="#" style="color: #0056b3; font-weight: bold;">haciendo clic aquí</a>.</p>
            </div>

            <p><strong>¿Qué sigue ahora?</strong></p>
            <p>Uno de nuestros asesores académicos, especializados en acompañar tu desarrollo profesional, te estará contactando muy pronto para finalizar tu matrícula y darte acceso inmediato a la plataforma.</p>
            
            <div style="background-color: #fff9e6; border: 1px dashed #ffeeba; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <h3 style="margin-top: 0; color: #856404; font-size: 15px;">⏳ Bono de Acción Rápida (Válido por 48 horas)</h3>
              <p style="margin-bottom: 0; color: #856404; font-size: 14px;">Si finalizas tu proceso de matrícula en las próximas 48 horas, te otorgaremos <strong>acceso 100% gratuito a nuestra Masterclass certificada de "Liderazgo Estratégico"</strong>. ¡No dejes que se expire tu cupo!</p>
            </div>

            <div style="background-color: #f9f9f9; border-left: 4px solid #8B0000; padding: 15px; margin: 20px 0;">
              <p style="margin: 0;"><strong>¿No quieres esperar? (Atención Inmediata):</strong><br>
              Escríbenos directamente a nuestro canal prioritario de WhatsApp o <a href="#" style="color: #8B0000; font-weight: bold;">agenda una llamada en nuestro Calendario</a> en el horario que prefieras.</p>
              <a href="https://wa.me/573000000000?text=Hola,%20acabo%20de%20pre-inscribirme%20al%20curso%20\${encodeURIComponent(data.cursoTitulo)}%20y%20quiero%20continuar%20mi%20proceso%20para%20obtener%20el%20bono." style="display: inline-block; margin-top: 15px; background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Hablar por WhatsApp</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
            <p style="font-size: 13px; color: #666; font-style: italic; text-align: center;">"Únete a los más de 5,000 profesionales que han potenciado su carrera. El 85% de nuestros egresados reportan mejoras laborales en su primer año tras finalizar su programa con nosotros."</p>

            <p>Gracias por confiar en nuestros 200 años de historia académica para impulsar tu talento.</p>
            <p>Con gran entusiasmo,<br><strong>El equipo de Educación Continua UdeC</strong></p>
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
              <h2 style="color: #8B0000; margin: 0;">¡Hola \${data.nombre}! Es un gusto saludarte.</h2>
            </div>
            <p>Gracias por acercarte a nosotros y mostrar interés en nuestra Facultad de Ciencias Económicas. Confirmamos que hemos recibido tus inquietudes sobre el programa <strong>"\${data.programa || 'nuestra oferta académica'}"</strong>.</p>
            <p>Entendemos que elegir el camino adecuado para tu crecimiento profesional es una gran decisión, y queremos acompañarte en cada paso. Nuestro equipo ya está revisando tu caso para brindarte la asesoría más completa y humana posible.</p>
            <p>En breve, uno de nuestros expertos en admisiones te llamará al número <strong>\${data.telefono}</strong> para escucharte, resolver todas tus dudas y ayudarte a trazar tu mejor ruta académica.</p>
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 14px; color: #666;">¿Tienes una duda urgente y quieres respuesta inmediata?</p>
              <a href="https://wa.me/573000000000?text=Hola,%20acabo%20de%20dejar%20mis%20datos%20en%20la%20página%20y%20tengo%20algunas%20dudas." style="display: inline-block; background-color: #8B0000; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Contáctanos por WhatsApp</a>
            </div>
            <p>Estamos aquí para ayudarte a brillar.</p>
            <p>Un abrazo afectuoso,<br><strong>Equipo de Admisiones UdeC</strong></p>
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
              <h2 style="color: #8B0000; margin: 0;">Impulsando el talento de \${data.nombreEmpresa} 🚀</h2>
            </div>
            <p>Estimado(a) \${data.nombreContacto},</p>
            <p>Es un verdadero placer saludarle. Desde la Facultad de Ciencias Económicas de la Universidad de Cartagena hemos recibido su solicitud corporativa para el plan <strong>"\${data.planInteres}"</strong>.</p>
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
