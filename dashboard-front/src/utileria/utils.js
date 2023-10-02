export default function CalcularAnchoBarra(cantRutas) {
    let porcentajeAnchoBarra;
    let heightGraph;
    if (cantRutas >= 4) {
        porcentajeAnchoBarra = 1
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