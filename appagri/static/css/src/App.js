import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./User/Login";
import Register from "./User/Register";
import { AuthProvider } from "./User/AuthProvider";
import ProtectedRoute from "./User/ProtectedRoute";
import PublicRoute from "./User/PublicRoute";
import Home from "./componenets/Home/Home";
import UnauthorizedPage from "./componenets/Unauthpage/UnauthorizedPage";
import Requirementpost from "./componenets/RequirementPost/Requirementpost";
import BuyerDashboard from "./componenets/Buyer/BuyerDashboard";
import SellerDashboard from "./componenets/Vendors/SellerDashboard";
import AdminDashboard from "./componenets/Admin/AdminDashboard";
import RoleCheck from "./User/RoleCheck";
import Layout from "./componenets/Layouts/Layout";
import Product from "./componenets/Vendors/Product/Product";
import LeadManager from "./componenets/Vendors/LeadManager";
import Profile from "./componenets/Vendors/Profile";
import VendorEnquiry from "./componenets/Vendors/Enquiry/VendorEnquiry";
import ForgotPassword from "./User/ForgotPassword";

import AddInputProduct from "./componenets/Vendors/Product/Input/AddInputProduct";

import AddOutputProduct from "./componenets/Vendors/Product/Farmer/AddOutputProduct";
import AddAgriService from "./componenets/Vendors/Product/AgriServices/AddAgriService";
import EditProduct from "./componenets/Vendors/Product/DynamicProduct/EditProduct";
import ForgotEmail from "./User/ForgotEmail";
import VerifyToken from "./User/VerifyToken";


import UsersData from "./componenets/Admin/users/UsersData";
import VendorData from "./componenets/Admin/vendors/VendorData";

import AdminProfile from "./componenets/Admin/AdminProfile";
import OnFarmServiceForm from "./componenets/Vendors/Product/AgriServices/onfarm/OnFarmServiceAdd";
import OffFarmServiceAdd from "./componenets/Vendors/Product/AgriServices/offfarm/OffFarmServiceAdd";

import AllOffFarmAgriService from "./componenets/Vendors/Product/AgriServices/offfarm/AllOffFarmAgriService";
import AllOnFarmAgriService from "./componenets/Vendors/Product/AgriServices/onfarm/AllOnFarmAgriService";



import UserProfile from "./componenets/Buyer/Profile/UserProfile";
import UserEnquiry from "./componenets/Buyer/Enquiries/UserEnquiry";


// Output Product Category and the Product:
import OutputProducts from "./componenets/Home/OutputProduct/OutputProducts";

import Fruits from "./componenets/Home/OutputProduct/Fruits/Fruits";
import FruitProduct from "./componenets/Home/OutputProduct/Fruits/product/FruitProduct";

import Vegetables from "./componenets/Home/OutputProduct/Vegetables/Vegetables";
import VegetableProduct from "./componenets/Home/OutputProduct/Vegetables/product/VegetableProduct";

import Groceries from "./componenets/Home/OutputProduct/Groceries/Groceries";
import GroceriesProduct from "./componenets/Home/OutputProduct/Groceries/product/GroceriesProduct";
// output finish here

import AgriServices from "./componenets/Home/AgriServices/AgriServices";
import Onfarm from "./componenets/Home/AgriServices/OnFarm/Onfarm";
import OfFarm from "./componenets/Home/AgriServices/OfFarm/OfFarm";
import AlliedActivities from "./componenets/Home/AgriServices/OnFarm/AlliedActivities/AlliedActivities";
import Croptype from "./componenets/Home/AgriServices/OnFarm/CropType/Croptype";
import CultivatiionType from "./componenets/Home/AgriServices/OnFarm/CultivationType/CultivatiionType";
import FarmSize from "./componenets/Home/AgriServices/OnFarm/FarmSize/FarmSize";
import AgriIrrigation from "./componenets/Home/AgriServices/OnFarm/Irrigation/AgriIrrigation";
import ServiceType from "./componenets/Home/AgriServices/OnFarm/ServiceType/ServiceType";




// import OutputProductCategory from "./componenets/Home/OutputProduct/OutputProductCategory/OutputProductCategory";
import AgriServiceCategory from "./componenets/Home/AgriServices/AgriServiceCategory/AgriServiceCategory";
import Help from "./componenets/Help/Help";


// Input product category and the products 
import InputProducts from "./componenets/Home/Inputproducts/InputProducts";

import AgritechSolutions from "./componenets/Home/Inputproducts/AgritechSolution/AgritechSolutions";
import AgritechSolutionProduct from "./componenets/Home/Inputproducts/AgritechSolution/product/AgritechSolutionProduct";

import FarmMachinery from "./componenets/Home/Inputproducts/FarmMachinery/FarmMachinery";
import FarmMachineryProduct from "./componenets/Home/Inputproducts/FarmMachinery/product/FarmMachineryProduct";

import Implements from "./componenets/Home/Inputproducts/Implements/Implements";
import ImplementProducts from "./componenets/Home/Inputproducts/Implements/product/ImplementProducts";

import Fertilizer from "./componenets/Home/Inputproducts/Fertilizer/Fertilizer";
import FertilizerProduct from "./componenets/Home/Inputproducts/Fertilizer/product/FertilizerProduct";

import Irrigation from "./componenets/Home/Inputproducts/Irrigation/Irrigation";
import IrrigationProduct from "./componenets/Home/Inputproducts/Irrigation/product/IrrigationProduct";

import Pesticides from "./componenets/Home/Inputproducts/Pesticides/Pesticides";
import PesticidesProduct from "./componenets/Home/Inputproducts/Pesticides/product/PesticidesProduct";

import SeedsAndPlants from "./componenets/Home/Inputproducts/SeedsPlant/SeedsAndPlants";
import SeedsPlantsProduct from "./componenets/Home/Inputproducts/SeedsPlant/product/SeedsPlantsProduct";
// input-product finish

import PhoneVerified from "./User/phoneVerified/PhoneVerified";
import ProductApproval from "./componenets/Admin/ProductApprovalReq/ProductApproval";
import SellerApprovalRequest from "./componenets/Admin/SellerApprovalRequest/SellerApprovalRequest";


function App() {
  return (
    <AuthProvider>
      <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />

          {/* Output Route Start: */}
        <Route path="/input-products" element={<InputProducts/>}/>

        <Route path="/input-product/implements" element={<Implements/>}/>
        <Route path="/input-product/implements/:category" element/>
        <Route path="/input-product/implements/:category/:subcategory" element/>
        <Route path="/input-product/implements/:category/:subcategory/:productname/:vendorid" element={<ImplementProducts/>}/>
        {/* <Route path="/input-product/implements/:product" element={<ImplementProducts/>}/> */}

        <Route path="/input-product/pesticides" element={<Pesticides/>}/>
        <Route path="/input-product/pesticides/:category" element={<PesticidesProduct/>}/>
        <Route path="/input-product/pesticides/:category/:subcategory" element/>
        <Route path="/input-product/pesticides/:category/:subcategory/:productname/:vendorid" element/>

        <Route path="/input-product/seeds-and-plants" element={<SeedsAndPlants/>}/>
        <Route path="/input-product/seeds-and-plants/:category" element/>
        <Route path="/input-product/seeds-and-plants/:category/:subcategory" element/>
        <Route path="/input-product/seeds-and-plants/:category/:subcategory/:productname/:vendorid" element/>
        {/* <Route path="input-product/seeds-and-plant/:product" element={<SeedsPlantsProduct/>}/> */}

        <Route path="/input-product/irrigation" element={<Irrigation/>}/>
        <Route path="/input-product/irrigation/:category/" element/>
        <Route path="/input-product/irrigation/:category/:subcategory" element/>
        <Route path="/input-product/irrigation/:category/:subcategory/:productname/:vendorid"/>
        {/* <Route path="/input-product/irrigation/:product" element={<IrrigationProduct/>}/> */}

        <Route path="/input-product/fertilizer" element={<Fertilizer/>}/>
        <Route path="/input-product/fertilizer/:category/" element/>
        <Route path="/input-product/fertilizer/:category/:subcategory" element/>
        <Route path="/input-product/fertilizer/:category/:subcategory/:productname/:vendorid"/>
        {/* <Route path="/input-product/fertilizer/:product" element={<FertilizerProduct/>}/> */}

        <Route path="/input-product/farm-machinery" element={<FarmMachinery/>}/>
        <Route path="/input-product/farm-machinery/:category/" element/>
        <Route path="/input-product/farm-machinery/:category/:subcategory" element/>
        <Route path="/input-product/farm-machinery/:category/:subcategory/:productname/:vendorid"/>
        {/* <Route path="/input-product/farm-machinery/:product" element={<FarmMachineryProduct/>}/> */}

        <Route path="/input-product/agritech-solutions" element={<AgritechSolutions/>}/>
        <Route path="/input-product/agritech-solutions/:category/" element/>
        <Route path="/input-product/agritech-solutions/:category/:subcategory" element/>
        <Route path="/input-product/agritech-solutions/:category/:subcategory/:productname/:vendorid"/>
        {/* <Route path="/input-product/agritech-solutions/:product" element={<AgritechSolutionProduct/>}/> */}
          {/* Output Route Finish: */}


        {/* Output Route Start: */}
        <Route path="/output-products" element={<OutputProducts/>}/>

        <Route path="/output-product/fruits" element={<Fruits/>}/>
        <Route path="/output-product/fruits/:fruitname/" element/>
        <Route path="/output-product/fruits/:fruitname/:vendorid" element/>
        {/* <Route path="/output-product/fruits/:product" element={<FruitProduct/>}/> */}

        <Route path="/output-product/groceries" element={<Groceries/>}/>
        <Route path="/output-product/groceries/:groceryname" element={<GroceriesProduct/>}/>
        <Route path="/output-product/groceries/:groceryname/:vendorid" element/>

        <Route path="/output-product/vegetables" element={<Vegetables/>}/>
        <Route path="/output-product/vegetables/:vegetablesname" element/>
        <Route path="/output-product/vegetables/:vegetablename/:vendorid" element/>
        {/* <Route path="/output-product/vegetables/:product" element={<VegetableProduct/>}/> */}
         {/* Output Route finish: */}


        <Route path="/agri-services" element={<AgriServices/>}/>
        <Route path="/agri-service/on-farm" element={<Onfarm/>}/>
        <Route path="/agri-service/off-farm" element={<OfFarm/>}/>
        <Route path="/agri-service/on-farm/crop-type" element={<Croptype/>}/>
        <Route path="/agri-service/on-farm/cultivation-type" element={<CultivatiionType/>}/>
        <Route path="/agri-service/on-farm/irrigation" element={<Irrigation/>}/>
        <Route path="/agri-service/on-farm/service-type" element={<ServiceType/>}/>
        <Route path="/agri-service/on-farm/allied-activities" element={<AlliedActivities/>}/>
        <Route path="/agri-service/on-farm/farm-size" element={<FarmSize/>}/>
        
        <Route path="/help" element={<Help/>}/>
        <Route path="/login"element={  <PublicRoute> <Login /> </PublicRoute>  }/>
       
        <Route path="/register" element={  <PublicRoute> <Register />  </PublicRoute>  }/>
        <Route path="/verifyemail" element={  <PublicRoute> <VerifyToken />  </PublicRoute>  }/>
        <Route path="/forgot-password" element={ <PublicRoute> <ForgotEmail />  </PublicRoute> }/>
        <Route path="/resetpassword" element={<PublicRoute><ForgotPassword/></PublicRoute>}/>
      
        <Route path="/dashboard" element={  <RoleCheck allowedRoles={["buyer"]}>  <BuyerDashboard />  </RoleCheck>  }> 
        <Route path="userprofile"  element={<UserProfile/>}/>
        <Route path="enquiries" element={<UserEnquiry/>}/>
        </Route>

      <Route path="/seller-dashboard" element={<RoleCheck allowedRoles={["vendor"]}> <SellerDashboard /></RoleCheck>}>
        <Route path="profile" element={<Profile />} />
        <Route path="products" element={<Product />} />
        <Route path="lead-manager" element={<LeadManager />} />
        <Route path="enquiries" element={<VendorEnquiry />} />
        <Route path="add-output-product" element={<AddOutputProduct/>} />
        <Route path="add-input-product" element={<AddInputProduct/>} />
        <Route path="add-agri-service" element={<AddAgriService/>} />
          {/* <Route path="add-agri-service/on-farm" element={<OnFarmServiceForm/>}/> */}
          {/* <Route path="add-agri-service/off-farm" element={<OffFarmServiceAdd/>}/> */}
          <Route path="add-agri-service/on-farm" element={<AllOnFarmAgriService/>}/>
          <Route path="add-agri-service/off-farm" element={<AllOffFarmAgriService/>}/>
        <Route path=":productid" element={<EditProduct/>}/>
      </Route>

      <Route path="/admin-dashboard" element={<RoleCheck allowedRoles={["admin"]}><AdminDashboard/></RoleCheck>}>
        <Route path="profile" element={<AdminProfile/>}/>
        <Route path="usersdata" element={<UsersData/>}/>
        <Route path="vendorsdata" element={<VendorData/>}/>
        <Route path="product-approval" element={<ProductApproval/>}/>
        <Route path="seller-approval" element={<SellerApprovalRequest/>}/>
      </Route>

        {/* <Route  path="/admin-dashboard"  element={  <RoleCheck allowedRoles={["admin"]}>  <AdminDashboard /> </RoleCheck>  }  /> */}
        <Route  path="/requirement-post"   element={  <ProtectedRoute>  <Requirementpost />  </ProtectedRoute>  }  />
        <Route path="*" element={<UnauthorizedPage />} />
      </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
