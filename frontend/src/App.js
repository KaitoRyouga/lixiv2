import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Products from './components/Products'
import Home from './components/Home'
import Cart from './components/Cart'
import './App.css';

function App() {
  return (
    <div className="App">
          <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/products" component={Products}></Route>
          <Route path="/cart" component={Cart}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
