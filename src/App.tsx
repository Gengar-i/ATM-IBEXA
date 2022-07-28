import React from 'react';
import Header from "./structure/Header";
import Main from "./structure/Main";
import Footer from "./structure/Footer";
import "./styles/app.scss";

const App: React.FC = () => (
  <div id="app">
    <Header />
    <Main />
    <Footer />
  </div>
)

export default App;
