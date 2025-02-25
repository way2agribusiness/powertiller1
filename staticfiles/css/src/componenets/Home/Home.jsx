import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css';
import OutputProduct from './OutputProduct';
import Inputproducts from './Inputproducts';
import AgriService from './AgriService';
import RequirementPost from './RequirementPost';
import OurPartners from './OurPartners';
import AgriServiceOff from './AgriServiceOff';

import { useAuth } from '../../User/AuthProvider';
import RequirementWithoutLogin from './RequirementWithoutLogin';



const Home = () => {
  const auth = useAuth();
  console.log("Auth data is ", auth);
  const CurrentUserData = auth?.auth.isAuthenticated;
  console.log("Full Data", CurrentUserData);

  const [authUser, setAuthUser] = useState(false); 

  useEffect(() => {
    if (CurrentUserData !== undefined) {
      setAuthUser(CurrentUserData);
    }
  }, [CurrentUserData]);
  
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <div>
      <div className='w-100% h-100% '>
        <section data-aos="fade-up" className='mb-8' style={{
          height: "60vh",
          width: "100%",
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/dq7vggsop/image/upload/v1719577785/zgrsxlskgjetcyjyz10t.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div className="text-center max-w-screen-lg px-4 md:px-8 lg:px-20">
            <h2 className="text-2xl lg:text-3xl font-bold text-green-700 py-3 lg:px-10  mb-3 border rounded-md bg-white shadow-md">
              Welcome to Karnataka Agribusiness
            </h2>
            <Link to="/requirement-post">
              <button className="py-3 px-6 md:px-8 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md">
                Tell us what you want?
              </button>
            </Link>
          </div>
        </section>

        <section className='mb-5'>
          <Inputproducts/>
        </section>

        <section className='mb-5'>
          <OutputProduct/>
        </section>

        {/* On farm  */}
        <section className='mb-5'>
          <AgriService/>  
        </section>

        <section>
          {authUser &&  <RequirementPost/> }
          {!authUser && <RequirementWithoutLogin/>}
        </section>

        <section >
          {/* <h2>Our Partners</h2> */}
          <OurPartners/>
        </section>

      </div>
    </div>
  )
}

export default Home