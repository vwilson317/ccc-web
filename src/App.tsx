import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { ParallaxHero } from './components/ParallaxHero'
import { BarracaList } from './components/BarracaList'
import { BarracaDetail } from './components/BarracaDetail'
import './App.css'
import { Header } from './components/Header'
import { Login } from './components/Login'
import { Info } from './components/Info'
import { Register } from './components/Register'
import { OrderPage } from './components/OrderPage'
import { CheckoutPage } from './components/CheckoutPage'
import { AdminDashboard } from './components/AdminDashboard'

function App() {
  return (
    <Router>
      <Header />
      <Toaster position="top-right" />
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
          <Route path="/register" element={<Register />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
