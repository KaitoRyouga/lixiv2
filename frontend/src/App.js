import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Products from './components/Products'
import Home from './components/Home'
import './App.css';

function App() {
  return (
    <div className="App">
          <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/products" component={Products}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
