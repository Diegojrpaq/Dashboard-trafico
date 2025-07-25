import React, { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import TablePlaneacionDomicilio from "../../viewsItems/tables/TablePlaneacionDomicilio";
import { Dropdown } from "primereact/dropdown";
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
          const arr = Array.isArray(data?.listGuias) ? data.listGuias : [];
          const guiasMapeadas = arr.map((g) => ({
            ...g,
            rutaDomicilio: g.ruta_domicilio ?? g.rutaDomicilio,
          }));
          setGuias(guiasMapeadas);
          setLoadingGuias(false);
          console.log("Guias mapeadas:", guiasMapeadas);
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
    <div className="">


      {selectedDestino && (
        <div className="col-item shadow p-3 mb-2 mx-0 rounded">
          <h2>Planeación Domicilio {selectedDestino.nombre}</h2>
        </div>
      )}
      <div className="d-flex justify-content-start w-full">
        <div className="card shadow-sm p-2 mb-2 px-2" style={{width: '30%'}}>
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

      {loadingGuias ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "30vh" }}
        >
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : guias.length > 0 ? (
        <>
          <div className="col-item shadow-lg p-3 mb-4 mx-0 rounded">
            <div className="row mb-4">
              {/* Volumen */}
              <div className="col-sm-12 col-md-6 col-lg-3 py-3 px-3">
                <Card border="primary">
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

              {/* Peso */}
              <div className="col-sm-12 col-md-6 col-lg-3 py-3 px-3">
                <Card border="primary">
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

              {/* Guías Totales */}
              <div className="col-sm-12 col-md-6 col-lg-3 py-3 px-3">
                <Card border="primary">
                  <Card.Header
                    className="text-light fs-5 text-center"
                    style={{ backgroundColor: "rgb(49 64 81)" }}
                  >
                    Guías Totales
                  </Card.Header>
                  <Card.Body className="text-center">
                    <Card.Text>
                      Total: <strong>{guias.length}</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              {/* Items Totales */}
              <div className="col-sm-12 col-md-6 col-lg-3 py-3 px-3">
                <Card border="primary">
                  <Card.Header
                    className="text-light fs-5 text-center"
                    style={{ backgroundColor: "rgb(49 64 81)" }}
                  >
                    Items Totales
                  </Card.Header>
                  <Card.Body className="text-center">
                    <Card.Text>
                      Total: <strong>{totales(guias, "items")}</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>



            <TablePlaneacionDomicilio
              guias={guias}
              nombreDestino={selectedDestino?.nombre || "Destino"}
              volumenTotal={totales(guias, "volumen")}
              pesoTotal={formattedCantidad(totales(guias, "peso"))}
            />
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
