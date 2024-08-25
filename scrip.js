function mostrarMes() {
    const fechaInput = document.getElementById('fechaInput').value;
    const fecha = new Date(fechaInput);
    const opciones = { month: 'long' }; // Muestra el mes completo
    const mesNombre = fecha.toLocaleDateString('es-ES', opciones); // Nombre del mes en español

    document.getElementById('mesNombre').value = mesNombre;
}

function doPost(e) {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('ene'); // Cambia 'ene' si es necesario

    if (!sheet) {
        sheet = ss.insertSheet('ene');
        sheet.appendRow(['Fecha', 'Placa', 'Marca', 'Línea', 'Orden', 'Trabajo', 'Adicional', 'Horas']);
    }
    
    sheet.appendRow([data.fecha, data.placa, data.marca, data.linea, data.orden, data.trabajo, data.adicional, data.horas]);
    
    // Configura los encabezados CORS
    var output = ContentService.createTextOutput(JSON.stringify({status: 'success'}));
    output.setMimeType(ContentService.MimeType.JSON);
    output.setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    });
    
    return output;
}


document.getElementById('save').addEventListener('click', function() {
    var url = "https://script.google.com/macros/s/AKfycbzOXjQDTwBv_SNy-1rsrzvkEKX5WTvTGIRWc6l2RmH2hloocw6hFb8eh9Bs0PW0x1rTPQ/exec"; // Tu URL de Web App

    var formData = {
        fecha: document.getElementById('fechaInput').value,
        placa: document.getElementById('placa').value,
        marca: document.getElementById('marca').value,
        linea: document.getElementById('linea').value,
        orden: document.getElementById('orden').value,
        trabajo: document.getElementById('trabajo').value,
        adicional: document.getElementById('adicional').value,
        horas: document.getElementById('horas').value
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert("Datos guardados con éxito");
        } else {
            alert("Error al guardar datos");
        }
    })
    .catch(error => console.error('Error:', error));
});
