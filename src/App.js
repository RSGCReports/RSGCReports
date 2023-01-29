import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/routes/About';
import NotFound from './components/routes/NotFound';
import NavigationBar from './components/NavigationBar';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Routes>
            <Route exact path="/" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
