import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import { UserProvider } from './context/user/UserContext'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <UserProvider>
      <Router>
        <div className='flex flex-col justify-between h-screen'>
          <Navbar />
          <main className='container mx-auto px-4 pb-15'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  )
}

export default App
