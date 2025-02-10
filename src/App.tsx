import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SpellList } from './components/SpellList/SpellList'
import Navbar from './components/Navbar/Navbar'
import './App.css'

function App() {

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-grey-100">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<SpellList />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App