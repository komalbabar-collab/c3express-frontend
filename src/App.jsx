import './App.css'
import Router from './Router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import "react-datepicker/dist/react-datepicker.css";
function App() {

  return (
    <>
      <div>
        <ToastContainer />
        <Router />
      </div>
    </>
  )
}

export default App
