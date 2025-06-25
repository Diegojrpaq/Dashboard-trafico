import React, { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import TablePlaneacionDomicilio from "../../viewsItems/tables/TablePlaneacionDomicilio";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { globalData } from "../../App";
import { urlapi } from "../../utileria/config";
import { formattedCantidad, totales } from "../../utileria/utils";

export default function PlaneacionDomicilio() {
  const { destinosListState } = useContext(globalData);
  const [selectedDestino, setSelectedDestino] = useState(null);
  const [loadingDestinos, setLoadingDestinos] = useState(true);
  const [loadingGuias, setLoadingGuias] = useState(false);
  const [guias, setGuias] = useState([]);

  useEffect(() => {
    if (destinosListState?.length > 0) {
      setSelectedDestino(destinosListState[0]);
      setLoadingDestinos(false);
    }
  }, [destinosListState]);

  useEffect(() => {
    if (selectedDestino) {
      setLoadingGuias(true);
      fetch(`${urlapi}/trafico/get_planDomicilio/${selectedDestino.id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setGuias(data?.catalogoGuiasPlaneadas || []);
          setLoadingGuias(false);
        })
        .catch(() => {
          setGuias([]);
          setLoadingGuias(false);
        });
    }
  }, [selectedDestino]);

  if (loadingDestinos) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="col-sm-12 col-md-12 col-lg-4 py-3 px-3">
        <div className="card flex shadow justify-content-center">
          <Dropdown
            value={selectedDestino}
            onChange={(e) => setSelectedDestino(e.value)}
            options={destinosListState}
            optionLabel="nombre"
            placeholder="Selecciona un Destino"
            className="w-full"
            filter
          />
        </div>
      </div>

      {selectedDestino && (
        <div className="col-item shadow p-3 mb-4 mx-0 rounded">
          <h2>Planeación Domicilio {selectedDestino.nombre}</h2>
        </div>
      )}

      {loadingGuias ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "30vh" }}
        >
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : guias.length > 0 ? (
        <>
          <div className="row mb-4">
            <div className="col-sm-12 col-md-6 col-lg-3 py-3 px-3">
              <Card border="primary" style={{ width: "100%", height: "auto" }}>
                <Card.Header
                  className="text-light fs-5 text-center"
                  style={{ backgroundColor: "rgb(49 64 81)" }}
                >
                  Volumen
                </Card.Header>
                <Card.Body className="text-center">
                  <Card.Text>
                    Total: <strong>{totales(guias, "volumen")} m³</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 py-3 px-3">
              <Card border="primary" style={{ width: "100%", height: "auto" }}>
                <Card.Header
                  className="text-light fs-5 text-center"
                  style={{ backgroundColor: "rgb(49 64 81)" }}
                >
                  Peso
                </Card.Header>
                <Card.Body className="text-center">
                  <Card.Text>
                    Total:{" "}
                    <strong>
                      {formattedCantidad(totales(guias, "peso"))} kg
                    </strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>

          <div className="card shadow">
            <div
              className="card-body p-0"
              style={{ overflowX: "auto", width: "100%" }}
            >
              <div style={{ minWidth: "1400px" }}>
                <TablePlaneacionDomicilio
                  guias={guias}
                  nombreDestino={selectedDestino?.nombre || "Destino"}
                  volumenTotal={totales(guias, "volumen")}
                  pesoTotal={formattedCantidad(totales(guias, "peso"))}
                  fleteTotal={totales(guias, "flete")}
                  montoSeguroTotal={totales(guias, "monto_seguro")}
                  subtotalTotal={totales(guias, "subtotal")}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <h4 className="text-center text-muted">
          No hay guías disponibles para este destino.
        </h4>
      )}
    </div>
  );
}
