import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './ProductList';
import Product from './Product';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={ProductList} />
          { <Route path="/product/:id" component={Product} />}
        </Switch>
      </div>
    </Router>
  );
}

export default App;


