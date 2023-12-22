export function CalcularAnchoBarra(cantRutas) {
    let porcentajeAnchoBarra;
    let heightGraph;
    if (cantRutas >= 10) {
        porcentajeAnchoBarra = .8
        heightGraph = "1500px"
    } else if (cantRutas >= 7 && cantRutas < 10) {
        porcentajeAnchoBarra = .7
        heightGraph = "1200px"
    } else if (cantRutas >= 4 && cantRutas < 8) {
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

    if (diferenciaHoras >= 48 && diferenciaHoras < 72) {
        return "text-warning"
    } else if (diferenciaHoras >= 72) {
        return "text-danger"
    }
}

export function formatearFecha(fechaSinFormato) {
    if (fechaSinFormato !== undefined && fechaSinFormato !== null) {
        const año = fechaSinFormato.slice(0, 4);
        const mes = fechaSinFormato.slice(4, 6);
        const día = fechaSinFormato.slice(6, 8);
        return `${día}/${mes}/${año}`;
    }
}

//Formatea un valor numerico a formato de dinero
export const formattedNumber = (number) => {
    if (number !== undefined && number !== null) {
        return number.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });
    }
}



//funcion limpiadora de viajes solo posicion actual y una anterior destino
export function limpiado_de_viajes(viajesActivos, idDestino) {
    /* en esta funcion se va a hacer un filtrado de los viajes ya que solo 
    se van a mostrar los que estan en curso pero solo los que estan en la ubicacion
    o una posicion anterior a la posicion a continuacion esta la loguica que se sigue para
    el split*/

    /* // Supongamos que tienes el objeto JSON con el parámetro "orden_parada_directa"
const dataFromJson = {
// ... otras propiedades ...
orden_parada_directa: ";3;1;",
// ... otras propiedades ...
};

// Paso 1: Eliminar los caracteres ";" al principio y al final de la cadena
const ordenParadaDirectaString = dataFromJson.orden_parada_directa;
const ordenParadaDirectaCleaned = ordenParadaDirectaString.replace(/^;+|;+$/g, '');

// Paso 2: Dividir la cadena en un arreglo utilizando ";" como separador
const ordenParadaDirectaArray = ordenParadaDirectaCleaned.split(';');

console.log(ordenParadaDirectaArray);
// El resultado será un arreglo ['3', '1'] */
    const viajes_filtrados = [];
    let posicionSucursal = null;
    for (let i = 0; i < viajesActivos.length; i++) {
        const ordenParadaCleaned = viajesActivos[i].orden_parada_directa.replace(/^;+|;+$/g, '');
        const ordenParadaDirectaArray = ordenParadaCleaned.split(';');
        for (let j = 0; j < ordenParadaDirectaArray.length; j++) {
            if (idDestino == ordenParadaDirectaArray[j]) {
                posicionSucursal = j;
            }
        }
        if (viajesActivos[i].IdUbicacionActual == ordenParadaDirectaArray[posicionSucursal] || viajesActivos[i].IdUbicacionActual == ordenParadaDirectaArray[posicionSucursal - 1])
            viajes_filtrados.push(viajesActivos[i]);
    }
    return viajes_filtrados;
}


export function guiasFilter(guiasList, idTipoTransaccion, idDestino) {
    //esta funcion recibira la lista de guias a filtrar mas dos parametro id del destino y
    //el id de la transaccion con la que se movio en el viaje, regresando una lista igual ya 
    //filtrada.
    if (guiasList != null) {
        let guiasListFiltered = [];
        let listDestinoFiltered = [];
        listDestinoFiltered = guiasList.filter(guia => guia.ubicacion_transaccion_id === idDestino);
        guiasListFiltered = listDestinoFiltered.filter(guia => guia.idTipoOperacion === idTipoTransaccion);

        return guiasListFiltered;

    } else {
        console.log("imposible realizar la opracion de filtrado")
    }
}

export function guiasFilterByOrigen(guiasList, idDestino) {
    //esta funcion recibira la lista de guias a filtrar mas dos parametro id del destino y
    //el id de la transaccion con la que se movio en el viaje, regresando una lista igual ya 
    //filtrada.

    if (guiasList != null) {
        let listDestinoFiltered = [];
        return listDestinoFiltered = guiasList.filter(guia => guia.ubicacion_transaccion_id === idDestino);


    } else {
        console.log("imposible realizar la opracion de filtrado")
    }
}

export const bitacoraVSembarcadas = (arrParadas, catalogoGuias) => {
    const tieneError = catalogoGuias.some(guia => !arrParadas.some(parada => parada.id === guia.ubicacion_transaccion_id))
    if (tieneError) {
        const guiasError = catalogoGuias.filter(guia => !arrParadas.some(parada => parada.id === guia.ubicacion_transaccion_id))
        return {
            guiasError,
            error: true
        }
    } else {
        return {
            guiasError: null,
            error: false
        }
    }
}