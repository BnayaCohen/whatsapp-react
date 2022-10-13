import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import './assets/scss/styles.scss'
import { AppHeader } from './cmps/AppHeader';
// import { SignupPage } from './pages/SignupPage';
import { HomePage } from './pages/HomePage';
import { itemPage } from './pages/itemPage';
import { itemDetailsPage } from './pages/itemDetailsPage';
import { itemEdit } from './pages/itemEdit';
import { StatisticPage } from './pages/StatisticPage';

const PrivateRoute = ({children}) => {
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
                        <Route path='/signup' element={<SignupPage />} />
                        <Route path='/item/edit/:id' element={<itemEdit />} />
                        <Route path='/item/edit/' element={<itemEdit />} />
                        <Route path='/item/:id' element={
                        <PrivateRoute>
                            <itemDetailsPage />
                        </PrivateRoute>
                        } />
                        <Route path='/item' element={<itemPage />} />
                        <Route path='/statistics' element={<StatisticPage />} />
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