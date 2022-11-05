import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import './assets/scss/styles.scss'
import { AppHeader } from './cmps/AppHeader';
import { HomePage } from './pages/HomePage';
import { SignupPage } from './pages/SignupPage.jsx';
import { ChatApp } from './pages/ChatApp';
import { ChatDetailsPage } from './pages/ChatDetailsPage';
import { userService } from './services/userService';

const PrivateRoute = ({ children }) => {
    const currUser = userService.getUser()
    return currUser ? children : <Navigate to='/' />
}

function App() {
    return (
        <Router>
            <div className="main-app">
                <AppHeader />

                <main className='container'>
                    <Routes>
                        <Route path='/' element={<HomePage />}>
                            <Route path='/signup' element={<SignupPage />} />
                        </Route>
                        <Route path='/chat' element={
                            <PrivateRoute>
                                <ChatApp />
                            </PrivateRoute>
                        }>
                            <Route path='/chat/:id' element={<ChatDetailsPage />} />
                        </Route>
                    </Routes>
                </main>

            </div>
        </Router>
    )
}

export default App