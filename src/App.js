import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import './assets/scss/styles.scss'
import { AppHeader } from './cmps/AppHeader';
// import { SignupPage } from './pages/SignupPage';
import { HomePage } from './pages/HomePage';
import { ChatApp } from './pages/ChatApp';
import { ChatDetailsPage } from './pages/ChatDetailsPage';
import { ChatEdit } from './pages/ChatEdit';

const PrivateRoute = ({ children }) => {
    const isAdmin = true
    // return isAdmin ? <Route path={props.path} component={props.component} /> : <Redirect to='/' />
    return isAdmin ? children : <Navigate to='/' />
}

function App() {
    return (
        <Router>
            <div className="main-app">
                <AppHeader />

                <main className='container'>
                    <Routes>
                        <Route path='/' element={<ChatApp />}>
                           <Route path='/chat/:id' element={
                            <PrivateRoute>
                                <ChatDetailsPage />
                            </PrivateRoute>
                        } /> 
                        </Route>
                        {/* <Route path='/signup' element={<SignupPage />} /> */}
                        {/* <Route path='/chat/edit/:id' element={<ChatEdit />} />
                        <Route path='/chat/edit/' element={<ChatEdit />} /> */}
                    </Routes>
                </main>

                <footer>
                    <section className='container'>
                        coffeeRights 2022 &copy;
                    </section>
                </footer>
            </div>
        </Router>
    )
}

export default App