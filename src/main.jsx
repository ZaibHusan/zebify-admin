import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Admincontext from './admincontext/Admincontext.jsx'

createRoot(document.getElementById('root')).render(

  <Admincontext>
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </Admincontext>
)
