import React, { useRef, useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { FilterMatchMode } from 'primereact/api';
import { Accordion, Spinner, Table } from 'react-bootstrap';

export default function TablePlaneacion({ nombreRuta, guiasPlaneadas, guiasEmbarcadas }) {
  console.log(guiasPlaneadas, "Plan")
  console.log(guiasEmbarcadas, "Embarc")
  console.log(nombreRuta)
  //Sumas para el apartado de totales de lo planeado
  const sumaVolumenPlaneado = guiasPlaneadas.reduce((acumulador, elemento) => {
    const suma = acumulador + elemento.cotizacion_principal_volumen;
    const totalRedondeado = Number(suma.toFixed(2));
    return totalRedondeado;
  }, 0);
  const sumaPesoPlaneado = guiasPlaneadas.reduce((acumulador, elemento) => {
    const suma = acumulador + elemento.cotizacion_principal_peso;
    const totalRedondeado = Number(suma.toFixed(2));
    return totalRedondeado;
  }, 0);
  const sumaFletePlaneado = guiasPlaneadas.reduce((acumulador, elemento) => {
    const suma = acumulador + elemento.flete;
    const totalRedondeado = Number(suma.toFixed(2));
    return totalRedondeado;
  }, 0);
  const sumaMontoPlaneado = guiasPlaneadas.reduce((acumulador, elemento) => {
    const suma = acumulador + elemento.monto_seguro;
    const totalRedondeado = Number(suma.toFixed(2));
    return totalRedondeado;
  }, 0);
  const sumaSubtotalPlaneado = guiasPlaneadas.reduce((acumulador, elemento) => {
    const suma = acumulador + elemento.subtotal;
    const totalRedondeado = Number(suma.toFixed(2));
    return totalRedondeado;
  }, 0);

  if(guiasEmbarcadas != null) {
    const sumaVolumenEmbarcado = guiasEmbarcadas.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.cotizacion_principal_volumen;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    const sumaPesoEmbarcado = guiasEmbarcadas.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.cotizacion_principal_peso;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    const sumaFleteEmbarcado = guiasEmbarcadas.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.flete;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    const sumaMontoEmbarcado = guiasEmbarcadas.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.monto_seguro;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    const sumaSubtotalEmbarcado = guiasEmbarcadas.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.subtotal;
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
            <th>Peso Planeado</th>
            <th>Volumen Planeado</th>
            <th>Flete Planeado</th>
            <th>Seguro</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Planeado</td>
            <td>{sumaPesoPlaneado} kg.</td>
            <td>{sumaVolumenPlaneado} mt3</td>
            <td>$ {sumaFletePlaneado}</td>
            <td>$ {sumaMontoPlaneado}</td>
            <td>$ {sumaSubtotalPlaneado}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th></th>
            <th>Peso Embarcada</th>
            <th>Volumen Embarcada</th>
            <th>Flete Embarcada</th>
            <th>Seguro</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Embarcado</td>
            <td>{guiasEmbarcadas === null || guiasEmbarcadas === 0 ? 0 : 10 } kg.</td>
            <td>{guiasEmbarcadas === null || guiasEmbarcadas === 0 ? 0 : 10 } mt3</td>
            <td>$ {guiasEmbarcadas === null || guiasEmbarcadas === 0 ? 0 : 10 }</td>
            <td>$ {guiasEmbarcadas === null ? 0 : 10 }</td>
            <td>$ {guiasEmbarcadas === null ? 0 : 10 }</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
