import Swal from 'sweetalert2'
/* import Graficalinea from './Componentes/Graficalinea'; */
import Linechart from './Componentes/Linechart';






function App() {

  const alerta1 = () => {

    Swal.fire(
      'Welcome la libreria esta lista para usarse',
      'You clicked the button!',
      'success'
    )

  }



  return (<>
    {
      alerta1()
    }

    <div>
      <h1>graficas charts</h1>
      <div>
        <p className='m-2'><b>ejemplo #1 :</b> Grafico de lineas basicas</p>
        <div className="bg-ligth mx-auto px-2 border border-2 border-primary container-chart">
          <Linechart></Linechart>
        </div>
      </div>
      <hr />
      <div>
        <p className='m-2'><b>ejemplo #1 :</b> Grafico de barras basicas</p>
        <div className="bg-ligth mx-auto px-2 border border-2 border-primary  container-chart">

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

  </>

  );
}

export default App;
