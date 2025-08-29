import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SOPWizard from "./SOP DE OPTIMIZACIÓN Y ESCALAMIENTO DE EMPRESA";
import OPSFormPreview from "./OPSFormPreview";
import FormularioNuevo from "./FormularioNuevo";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ops" element={<OPSFormPreview />} />
        <Route path="/nuevo" element={<FormularioNuevo />} />
        <Route path="/sop" element={<SOPWizard />} />
      </Routes>
    </Router>
  );
}
