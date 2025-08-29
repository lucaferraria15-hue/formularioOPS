import { Routes, Route } from 'react-router-dom'
import OPSFormPreview from './OPSFormPreview.jsx'
import FormularioNuevo from './FormularioNuevo.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/ops" element={<OPSFormPreview />} />
      <Route path="/nuevo" element={<FormularioNuevo />} />
    </Routes>
  )
}
