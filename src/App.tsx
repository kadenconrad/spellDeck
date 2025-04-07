import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SpellList } from './components/SpellList/SpellList'
import Navbar from './components/Navbar'
import './App.css'

function App() {

  return (
    <Router>
      <div className="min-h-screen flex bg-gray-100">
        <main>
        <Navbar />
            <Routes>
              <Route path="/" element={<SpellList />} />
            </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App