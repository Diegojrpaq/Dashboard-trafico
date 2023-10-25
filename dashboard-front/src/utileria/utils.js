export function CalcularAnchoBarra(cantRutas) {
    let porcentajeAnchoBarra;
    let heightGraph;
    if (cantRutas >= 10) {
        porcentajeAnchoBarra = .8
        heightGraph = "1500px"
    } else if (cantRutas >= 7 && cantRutas < 10) {
        porcentajeAnchoBarra = .7
        heightGraph = "1200px"
    } else if (cantRutas >= 4 && cantRutas < 8 ) {
        porcentajeAnchoBarra = .8
        heightGraph = "700px"
    } else if (cantRutas === 3) {
        porcentajeAnchoBarra = .7
        heightGraph = "500px"
    } else if (cantRutas === 2) {
        porcentajeAnchoBarra = .7
        heightGraph = "400px"
    } else {
        porcentajeAnchoBarra = .6
        heightGraph = "220px"
    }
    return {
        porcentajeAnchoBarra,
        heightGraph
    }
}

export function ConvertirFecha(fechaText) {
    const year = fechaText.substring(0, 4);
    const month = fechaText.substring(4, 6);
    const day = fechaText.substring(6, 8);

    const fecha = `${day}/${month}/${year}`;
    return fecha;
}

export function diferenciaFechas(fechaRuta) {
    const fechaActual = new Date();
    const year = fechaRuta.substring(0, 4);
    const month = fechaRuta.substring(4, 6);
    const day = fechaRuta.substring(6, 8);
    const hora = 12;
    const minutos = 0;
    const segundos = 0; 
    const fechaFormateada = new Date(year, month - 1, day, hora, minutos, segundos); // Meses en JavaScript son 0-based (enero es 0)
    
    const diferenciaMilisegundos = fechaActual - fechaFormateada;
    const diferenciaHoras = diferenciaMilisegundos / (1000 * 60 * 60);

    if(diferenciaHoras >= 48 && diferenciaHoras < 72) {
      return "text-warning"
    } else if(diferenciaHoras >= 72) {
      return "text-danger"
    }
  }

 export function formatearFecha(fechaSinFormato) {
    const año = fechaSinFormato.slice(0, 4);
    const mes = fechaSinFormato.slice(4, 6);
    const día = fechaSinFormato.slice(6, 8);

    return `${día}/${mes}/${año}`;
}