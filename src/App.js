import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { startAlertMessage } from './actions'
import { RouterTree } from './router/RouterTree'
import { ComponentImporter } from './router/ComponentImporter'
import { AlertMessage } from './components/control/Alerts'
const { Header, Banner, Footer } = ComponentImporter;

function App() {
  const state = useSelector(state => state.alertMessage);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!state.message) return;

    setTimeout(() => {
      dispatch(startAlertMessage('danger', ''));
    }, 3000);
  }, [state])
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Routes>
              { RouterTree.map(o =>
                <Route path={o.dir} element={o.element} key={o.dir} />
              ) }
            </Routes>
            { state.message && <AlertMessage type={state.type} message={state.message} /> }
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default App;
