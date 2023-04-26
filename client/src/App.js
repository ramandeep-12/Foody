import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/CartProvider';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
function App() {
  return (

    <Router>
      <div>
        <CartProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder/>} />

          </Routes>
        </CartProvider>
      </div>
    </Router>

  );
}
export default App;
