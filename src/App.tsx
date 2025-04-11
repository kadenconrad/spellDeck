import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SpellList } from './components/SpellList/SpellList'
import Navbar from './components/Navbar'
import './App.css'
import { DeckBuilder } from './components/DeckBuilder/DeckBuilder'

function App() {

  return (
    <Router>
      <div className="min-h-screen flex bg-gray-100">
        <main>
        <Navbar />
            <Routes>
              <Route path="/" element={<SpellList />} />
              <Route path="/decks" element={<DeckBuilder />} />
              <Route path="/decks/:id" element={<DeckBuilder />} />
            </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App