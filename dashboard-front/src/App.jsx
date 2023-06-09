/* import Swal from 'sweetalert2' */
import Graficalinea from './Componentes/Graficalinea';
import GraphChart from './Componentes/GraphChart';






function App() {

/*   const alerta1 = () => {

    Swal.fire(
      'Welcome la libreria esta lista para usarse',
      'You clicked the button!',
      'success'
    )

  } */



  return (
  <>
  {/* navbar bootstrap */}

  {/* navbar bootstrap */}




    <div>
      <h1>graficas charts</h1>
      <div>
        <p className='m-2'><b>ejemplo #1 :</b> Grafico de lineas basicas</p>
        <div className="bg-ligth mx-auto px-2 border border-2 border-primary container-chart">
          <Graficalinea></Graficalinea>
        </div>
      </div>
      <hr />
      <div>
        <p className='m-2'><b>ejemplo #1 :</b> Grafico de barras basicas</p>
        <div className="bg-ligth mx-auto px-2 border border-2 border-primary  container-chart">
          <GraphChart></GraphChart>
        </div>
      </div>
      <hr />
      <div>
        <p className='m-2'><b>ejemplo #1 :</b> Grafico circular basicas</p>
        <div className="bg-ligth mx-auto px-2 border border-2 border-primary container-chart">


        </div>
      </div>
      <hr />
    </div>

    <div className="container">
      <div className="row"><h1>tabla</h1></div>
      <div className="row">
      <div className="col-4">
        <Graficalinea></Graficalinea>
      </div>
      <div className="col-4">
        <GraphChart></GraphChart>
      </div>
      <div className="col-4"></div>
      </div>
    </div>


  </>

  );
}

export default App;
