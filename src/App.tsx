import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ParallaxHero } from './components/ParallaxHero'
import { BarracaList } from './components/BarracaList'
import { BarracaDetail } from './components/BarracaDetail'
import './App.css'
import { Header } from './components/Header'
import { Login } from './components/Login'
import { Info } from './components/Info'

function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <ParallaxHero />
              <BarracaList />
            </>
          } />
          <Route path="/barraca/:id" element={<BarracaDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
