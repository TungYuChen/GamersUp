import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ForgotPassword from './components/account/ForgotPassword'
import LoginForm from './components/account/LoginForm'
import ResetPassword from './components/account/ResetPassword'
import SignupForm from './components/account/SignupForm'
import GamesList from './components/games/GamesList'
import Alert from './components/layout/Alert'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import FriendList from './components/layout/FriendList'
import { AlertProvider } from './context/alert/AlertContext'
import { GamesProvider } from './context/games/GamesContext'
import { UserProvider } from './context/user/UserContext'
import { ReviewProvider } from './context/games/ReviewContext'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import GameDetailsPage from './pages/GameDetailsPage'
import GamerProfile from './pages/GamerProfile'
import Settings from './pages/Settings'

function App() {
  return (
    <GamesProvider>
      <UserProvider>
        <ReviewProvider>
          <AlertProvider>
            <Router>
              <div className='flex flex-col justify-between h-screen'>
                <Navbar />
                <main className='container mx-auto px-4 pb-15'>
                  <Alert />
                  <FriendList />
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/platform/:id' element={<GamesList />} />
                    <Route path='/game/:id' element={<GameDetailsPage />} />
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/signup' element={<SignupForm />} />
                    <Route
                      path='/forgotpassword'
                      element={<ForgotPassword />}
                    />
                    <Route path='/resetpassword' element={<ResetPassword />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/profile/:id' element={<GamerProfile />} />
                    <Route path='/*' element={<NotFound />} />
                  </Routes>                  
                </main>
                <Footer />
              </div>
            </Router>
          </AlertProvider>
        </ReviewProvider>
      </UserProvider>
    </GamesProvider>
  )
}

export default App
