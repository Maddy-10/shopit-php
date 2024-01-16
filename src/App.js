import { BrowserRouter,Routes,Route } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import Home from "./components/Home";
import Login from "./components/admin/Login";
import {ShopContextProvider} from './components/context/ShopContext'

function App() {
  return (
    <>
      <ShopContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        </BrowserRouter>
        </ShopContextProvider>
    </>
  );
}

export default App;
