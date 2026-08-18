import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './source/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Adminlogin from './source/Adminlogin';
import Adminhomepage from './source/Adminhomepage';
import Customerlogin from './source/Customerlogin';
import CustomerRegister from './source/CustomerRegister';
import Customerhomepage from './source/Customerhomepage';
import Farmerlogin from './source/Farmerlogin';
import FarmerRegister from './source/FarmerRegister';
import Adminfarmerdetails from './source/Adminfarmerdetails';
import Admincustomerdetails from './source/Admincustomerdetails';
import Farmerhomepage from './source/Farmerhomepage';
import FarmerAddproducts from './source/FarmerAddproducts';
import CustomerProduct from './source/CustomerProduct';
import Blockchain from './source/Blockchain';
import FarmerProductdetails from './source/FarmerProductdetails';
import OrderedProductdetails from './source/OrderedProductdetails';
import Farmerorderdetails from './source/Farmerorderdetails';
import Seedconcept from './source/Seedconcept';
import Seedconceptviewdetails from './source/Seedconceptviewdetails';
import ContactInfo from './source/ContactInfo';


function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="adminlogin" element={<Adminlogin />} />
    <Route path="adminhomepage" element={<Adminhomepage />} />
    <Route path="customerlogin" element={<Customerlogin />} />
    <Route path="customerregister" element={<CustomerRegister />} />
    <Route path="customerhomepage" element={<Customerhomepage />} />
    <Route path="farmerloginpage" element={<Farmerlogin />} />
    <Route path="farmerregister" element={<FarmerRegister />} />
    <Route path="adminfarmerdetails" element={<Adminfarmerdetails />} />
    <Route path="admincustomerdetails" element={<Admincustomerdetails />} />
    <Route path="farmerhomepage" element={<Farmerhomepage />} />
    <Route path="farmeraddproducts" element={<FarmerAddproducts />} />
    <Route path="/product/:id" element={<CustomerProduct />} />
    <Route path="blockchain" element={<Blockchain />} />
    <Route path="farmerproductdetails"  element={<FarmerProductdetails />} />
    <Route path="orderproductdetails" element={<OrderedProductdetails />} />
    <Route path="farmerorderdetails" element={<Farmerorderdetails />} />
    <Route path="seedconcepts" element={<Seedconcept />} />
    <Route path="seedconcepts1" element={<Seedconceptviewdetails />} />
    <Route path="contact" element={<ContactInfo />} />


  </Routes>
  );
}

export default App;
