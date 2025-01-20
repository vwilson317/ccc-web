import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ParallaxHero } from './components/ParallaxHero'
import { BarracaList } from './components/BarracaList'
import { BarracaDetail } from './components/BarracaDetail'
import './App.css'

function App() {
  return (
    <Router>
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <ParallaxHero />
              <BarracaList />
            </>
          } />
          <Route path="/barraca/:id" element={<BarracaDetail />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
