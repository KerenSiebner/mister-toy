import './assets/style/main.css'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import { AboutUs } from "./pages/about-us";
import { HomePage } from './pages/home-page.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { AppHeader } from './cmps/app-header.jsx';
// import { AppFooter } from './cmps/app-footer';
import { ToyIndex } from './pages/toy-index';



export function App() {

  return (
    <Provider store={store}>
    <Router>
      {/* //     <section className="main-layout app">*/}
      <AppHeader />
            {/* // <main> */}
        <Routes>
          <Route element={<HomePage />} path="/" />
          {/* // <Route element={<AboutUs />} path="/about" />*/}
          <Route element={<ToyIndex />} path="/toys" />

        </Routes>
      {/* </main> */}
      {/* //         <AppFooter />
            //     </section> */}
    </Router>
    </Provider>
  )
}


