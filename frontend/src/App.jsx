
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import  {LoginPage}  from './pages/LoginPage'
import { ErrorPage } from './pages/ErrorPage'
import Pdf from   './pages/pdf.jsx'


function App() {
    return (
     
     <BrowserRouter>
        <Routes>
          <Route path="/login" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/pdf" element={<Pdf />} />
          <Route path="*" element={<ErrorPage />} />
         

        </Routes>
      </BrowserRouter>
  )
}

export default App
