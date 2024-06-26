import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { Table } from 'react-bootstrap';
import { formattedNumber, formattedCantidad } from '../../utileria/utils';

export default function TablePlaneacion({ guiasPlaneadas, guiasEmbarcadas, guiasPlaneadasClientes }) {
  let guiasClientes = [];
  if (guiasPlaneadasClientes !== null) {
    guiasClientes = [...guiasPlaneadasClientes]
  }
  let sumaVolumenPlaneado;
  let sumaPesoPlaneado;
  let sumaFletePlaneado;
  let sumaMontoPlaneado;
  let sumaSubtotalPlaneado;
  let sumaItemsPlaneado;
  if (guiasPlaneadas !== null) {
    //Sumas para el apartado de totales de lo planeado
    const guiasTotales = [...guiasPlaneadas, ...guiasClientes]
    sumaVolumenPlaneado = guiasTotales?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.volumen;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaPesoPlaneado = guiasTotales?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.peso;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaFletePlaneado = guiasTotales?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.flete;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaMontoPlaneado = guiasTotales?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.monto_seguro;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaSubtotalPlaneado = guiasTotales?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.subtotal;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaItemsPlaneado = guiasTotales?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.cantidad_caja;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
  }

  //Suma para los totales de lo embarcado
  let sumaVolumenEmbarcado;
  let sumaPesoEmbarcado;
  let sumaFleteEmbarcado;
  let sumaMontoEmbarcado;
  let sumaSubtotalEmbarcado;
  let sumaItemsEmbarcado;
  if (guiasEmbarcadas != null) {
    sumaVolumenEmbarcado = guiasEmbarcadas?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.volumen;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaPesoEmbarcado = guiasEmbarcadas?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.peso;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaFleteEmbarcado = guiasEmbarcadas?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.flete;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaMontoEmbarcado = guiasEmbarcadas?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.monto_seguro;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaSubtotalEmbarcado = guiasEmbarcadas?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.subtotal;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaItemsEmbarcado = guiasEmbarcadas?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.cantidad_caja;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
  }

  return (
    <div className="table-responsive">
      <Table striped bordered hover size='md'>
        <thead>
          <tr>
            <th></th>
            <th>Peso</th>
            <th>Volumen</th>
            <th>Flete</th>
            <th>Seguro</th>
            <th>Subtotal</th>
            <th>Num. Items</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Planeado</td>
            <td>{guiasPlaneadas === null || guiasPlaneadas === 0 ? 0 : formattedCantidad(sumaPesoPlaneado)} kg.</td>
            <td>{guiasPlaneadas === null || guiasPlaneadas === 0 ? 0 : formattedCantidad(sumaVolumenPlaneado)} mt3</td>
            <td>{guiasPlaneadas === null || guiasPlaneadas === 0 ? "$0" : formattedNumber(sumaFletePlaneado)}</td>
            <td>{guiasPlaneadas === null || guiasPlaneadas === 0 ? "$0" : formattedNumber(sumaMontoPlaneado)}</td>
            <td>{guiasPlaneadas === null || guiasPlaneadas === 0 ? "$0" : formattedNumber(sumaSubtotalPlaneado)}</td>
            <td>{guiasPlaneadas === null || guiasPlaneadas === 0 ? "0" : sumaItemsPlaneado}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th></th>
            <th>Peso</th>
            <th>Volumen</th>
            <th>Flete</th>
            <th>Seguro</th>
            <th>Subtotal</th>
            <th>Num. Items</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Embarcado</td>
            <td>{guiasEmbarcadas === null || guiasEmbarcadas === 0 ? 0 : formattedCantidad(sumaPesoEmbarcado)} kg.</td>
            <td>{guiasEmbarcadas === null || guiasEmbarcadas === 0 ? 0 : formattedCantidad(sumaVolumenEmbarcado)} mt3</td>
            <td>{guiasEmbarcadas === null || guiasEmbarcadas === 0 ? "$0" : formattedNumber(sumaFleteEmbarcado)}</td>
            <td>{guiasEmbarcadas === null ? "$0" : formattedNumber(sumaMontoEmbarcado)}</td>
            <td>{guiasEmbarcadas === null ? "$0" : formattedNumber(sumaSubtotalEmbarcado)}</td>
            <td>{guiasEmbarcadas === null ? "0" : sumaItemsEmbarcado}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
