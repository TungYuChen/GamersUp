import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ForgotPassword from './components/account/ForgotPassword'
import LoginForm from './components/account/LoginForm'
import ResetPassword from './components/account/ResetPassword'
import SignupForm from './components/account/SignupForm'
import GameListForProfile from './components/games/GameListForProfile'
import GamesList from './components/games/GamesList'
import Alert from './components/layout/Alert'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import { AlertProvider } from './context/alert/AlertContext'
import { GamesProvider } from './context/games/GamesContext'
import { UserProvider } from './context/user/UserContext'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <GamesProvider>
      <UserProvider>
        <AlertProvider>
          <Router>
            <div className='flex flex-col justify-between h-screen'>
              <Navbar />
              <main className='container mx-auto px-4 pb-15'>
                <Alert />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/platform/:id' element={<GamesList />} />
                  <Route path='/login' element={<LoginForm />} />
                  <Route path='/signup' element={<SignupForm />} />
                  <Route path='/forgotpassword' element={<ForgotPassword />} />
                  <Route path='/resetpassword' element={<ResetPassword />} />
                  <Route path='/*' element={<NotFound />} />
                  <Route path='/profile' element={<GameListForProfile title={'Games Want to Play'}/>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AlertProvider>
      </UserProvider>
    </GamesProvider>
  )
}

export default App
