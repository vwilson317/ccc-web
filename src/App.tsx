import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'

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
      <Analytics />
      <main className="min-h-screen pt-6">
        <Routes>
          <Route path="/" element={
            <>
              <ParallaxHero />
              <div className="container mx-auto px-4 py-6">
                <form className="flex items-center gap-2 max-w-3xl mx-auto">
                  <input 
                    type="text" 
                    placeholder="Search barracas..." 
                    className="w-full p-2 rounded-md"
                  />
                  <select 
                    className="p-2 rounded-md"
                  >
                    <option value="all">All</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </form>
              </div>
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
