import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import './assets/scss/styles.scss'
import { AppHeader } from './cmps/AppHeader';
// import { SignupPage } from './pages/SignupPage';
import { HomePage } from './pages/HomePage';
import { ItemApp } from './pages/ItemApp';
import { ItemDetailsPage } from './pages/ItemDetailsPage';
import { ItemEdit } from './pages/ItemEdit';

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
                        <Route path='/' element={<HomePage />} />
                        {/* <Route path='/signup' element={<SignupPage />} /> */}
                        <Route path='/item/edit/:id' element={<ItemEdit />} />
                        <Route path='/item/edit/' element={<ItemEdit />} />
                        <Route path='/item/:id' element={
                            <PrivateRoute>
                                <ItemDetailsPage />
                            </PrivateRoute>
                        } />
                        <Route path='/item' element={<ItemApp />} />
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