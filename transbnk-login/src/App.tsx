import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import AnnexureForm from './Components/AnnexureForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/annexure-form" element={<AnnexureForm />} />
      </Routes>
    </Router>
  )
}

export default App
