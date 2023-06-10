import React, { useState } from 'react';

const SideBar = () => {
  const [collapseOneOpen, setCollapseOneOpen] = useState(true);
  const [collapseTwoOpen, setCollapseTwoOpen] = useState(false);

  const handleCollapseOneToggle = () => {
    setCollapseOneOpen(!collapseOneOpen);
  };

  const handleCollapseTwoToggle = () => {
    setCollapseTwoOpen(!collapseTwoOpen);
  };

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            onClick={handleCollapseOneToggle}
            aria-expanded={collapseOneOpen}
            aria-controls="collapseOne"
          >
            Sucursales
          </button>
        </h2>
        <div
          id="collapseOne"
          className={`accordion-collapse collapse ${collapseOneOpen ? 'show' : ''}`}
        >
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Sucursal"
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />
            <button className="btn btn-outline-primary" type="button" id="button-addon1">
              Search
            </button>
          </div>
          <div className="accordion-body">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Gonzalez gallo
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Lazaro Cardenas
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Perisur
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Queretaro
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            onClick={handleCollapseTwoToggle}
            aria-expanded={collapseTwoOpen}
            aria-controls="collapseTwo"
          >
            Destinos
          </button>
        </h2>
        <div
          id="collapseTwo"
          className={`accordion-collapse collapse ${collapseTwoOpen ? 'show' : ''}`}
        >
          <div className="accordion-body">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Gonzalez gallo
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Lazaro Cardenas
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Perisur
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
                checked
              />
              <label className="form-check-label" htmlFor="flexCheckChecked">
                Queretaro
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;