import './assets/style/main.css'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { About } from "./pages/about.jsx";
import { HomePage } from './pages/home-page.jsx';
import { Dashboard } from './pages/dashboard.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { AppHeader } from './cmps/app-header.jsx';
// import { AppFooter } from './cmps/app-footer';
import { ToyIndex } from './pages/toy-index';
import { ToyDetails } from './cmps/toy-details'




export function App() {

  return (
    <Provider store={store}>
    <Router>
      {/* //     <section className="main-layout app">*/}
      <AppHeader />
            {/* // <main> */}
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<Dashboard/>} path ="/dashboard" />
          <Route element={<ToyDetails />} path="/toy/details/:toyId" />
          <Route element={<About />} path="/about" />
          <Route element={<ToyIndex />} path="/toy" />

        </Routes>
      {/* </main> */}
      {/* //         <AppFooter />
            //     </section> */}
    </Router>
    </Provider>
  )
}


