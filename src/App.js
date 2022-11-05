import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import './assets/scss/styles.scss'
import { AppHeader } from './cmps/AppHeader';
import { HomePage } from './pages/HomePage';
import { SignupPage } from './pages/SignupPage.jsx';
import { ChatApp } from './pages/ChatApp';
import { ChatDetailsPage } from './pages/ChatDetailsPage';

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
                        <Route path='/chat' element={<ChatApp />}>
                            <Route path='/chat/:id' element={<ChatDetailsPage />} />
                        </Route>
                    </Routes>
                </main>

            </div>
        </Router>
    )
}

export default App