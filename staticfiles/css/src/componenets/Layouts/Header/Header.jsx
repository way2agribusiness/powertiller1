import React, { useState, useEffect, useRef  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../User/AuthProvider';
import LogoutButton from '../../../User/LogoutButton';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import AOS from 'aos'
import 'aos/dist/aos.css'; 

const Header = () => {
  const headerRef = useRef(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductOpen] = useState(false);
  const [isSignInMenuOpen, setSignInMenuOpen] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    function handleScroll () {
      setIsUserMenuOpen(false)
      setIsProductOpen(false)
      setSignInMenuOpen(false)
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }


  },[])

  const toggleProductMenu = () => {
    setIsProductOpen(!isProductMenuOpen)
    setIsUserMenuOpen(false);
    setSignInMenuOpen(false)
    
  }

  const closedropDown = () => {
    setIsUserMenuOpen(false)
    setSignInMenuOpen(false)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsProductOpen(false)
  };

  const toggleSignInMenu = () => {
    setSignInMenuOpen(!isSignInMenuOpen)
    setIsProductOpen(false)
  }

  const handleRequirementPostClick = () => {
    if (!auth.isAuthenticated) {
      // alert("Please login to access this page.");
      navigate("/login", {
        state: { redirectTo: "/requirement-post" },
      });
    }
    closedropDown();
  };
  useEffect(()=>{
    AOS.init()
   },[])

  const getDashboardLink = () => {
    if (!auth.isAuthenticated) {
      return '/login'; // Default if not authenticated
    }
    switch (auth.role) {
      case 'buyer':
        return '/dashboard'; // Buyer dashboard
      case 'vendor':
        return '/seller-dashboard'; // Seller dashboard
      case 'admin':
        return '/admin-dashboard'; // Admin dashboard
      default:
        return ''; // Default route
    }
  };

  return (
    <header className="bg-gray-200 h-12 w-100% px-4 text-sm" >
      <div className="container mx-auto flex justify-between items-center h-full">


        <div className="flex items-center justify-between">
          <Link to="/" className="text-black text-xl font-bold mx-auto md:ml-2">
            <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1711532480/jfqcm2s1ekxloucjk72p.png' alt='logo' className=' w-10 object-contain lg:w-32 lg:object-contain' />
          </Link>
          <div className="flex space-x-1 ml-4">
            <input className='py-1 px-1 border border-green-200  focus:outline-none focus:border-green-600' />
          </div>
        </div>

        <div className="hidden md:flex  items-center m-10 w-full">
          {/* Can add More links here for Desktop  After Adding here one more place required to add: in bottom  */}

          {/* <Link to="/agri-mart" className="text-gray-700 hover:text-gray-900 mx-2">Agri-Mart</Link> */}
          {/* <Link to="/messages" className="text-gray-700 hover:text-gray-900 mx-2">Messages</Link> */}
          <Link to="/help" className="text-gray-700  hover:text-green-800 mx-2">Help</Link>
        </div>

        {auth.isAuthenticated ? (
          <>
           <div className='inline lg:hidden'>
          <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1717755234/v95q9tfsjbzhzjqhc5id.svg' alt='hamburger'  className="w-6 h-6 " onClick={toggleProductMenu}/>
          </div>
            <div className="relative">
            <button
              className="text-white flex items-center"
              onClick={toggleUserMenu}
            >
              <img
                src="https://res.cloudinary.com/dq7vggsop/image/upload/v1717754786/jva6diapcubipfylogfj.svg"
                alt="User Avatar"

                className="w-10 h-8 "
              />
            </button>

            {isProductMenuOpen && !isUserMenuOpen &&(
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10"
              data-aos="fade-left"
              >
                <div>
                  <Link
                    to="/"
                    onClick={() => setIsProductOpen(false)}
                    className="block px-2 py-2 font-medium text-gray-800 hover:bg-gray-100 hover:text-green-800"
                    // onClick={closedropDown}
                  >
                    {/* <PermIdentityOutlinedIcon style={{ marginRight: '8px' }} /> */}
                   Home
                  </Link>
                </div>
                <Link to="input-products" onClick={() => setIsProductOpen(false)}>
                <div
                  // onClick={handleRequirementPostClick}
                  className="flex flex-row px-2 py-2 text-gray-800 hover:bg-gray-100 hover:text-green-800 cursor-pointer"
                >
                  <div>

                  {/* <PostAddOutlinedIcon style={{ marginRight: '8px' }} /> */}
                Input Products
                </div>
                {/* <div> <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1717740921/zj2occnkds9hwwipklce.png' className='pt-1'  style={{ height: '1.5rem', width: '1.6rem' }} /> </div> */}
                </div>
                </Link>

                <Link to="output-products" onClick={() => setIsProductOpen(false)}>
                <div
                  // onClick={handleRequirementPostClick}
                  className="flex flex-row px-2 py-2 text-gray-800 hover:bg-gray-100 hover:text-green-800 cursor-pointer"
                >
                  <div>

                  {/* <PostAddOutlinedIcon style={{ marginRight: '8px' }} /> */}
                Output Products
                </div>
               
                </div>
                </Link>
               
                <Link to="agri-services" onClick={() => setIsProductOpen(false)}>
                <div
                  // onClick={handleRequirementPostClick}
                  className="flex flex-row px-2 py-2 text-gray-800 hover:bg-gray-100 hover:text-green-800 cursor-pointer"
                >
                  <div>
                  {/* <PostAddOutlinedIcon style={{ marginRight: '8px' }} /> */}
                Agri Service Provider
                </div>
               
                </div>
                </Link>

                <Link to="help" onClick={() => setIsProductOpen(false)}>
                <div
                  // onClick={handleRequirementPostClick}
                  className="flex flex-row px-2 py-2 text-gray-800 hover:bg-gray-100 hover:text-green-800 cursor-pointer"
                >
                  <div>
                  {/* <PostAddOutlinedIcon style={{ marginRight: '8px' }} /> */}
                Help
                </div>
               
                </div>
                </Link>


                {/* Add Other also after Help : after adding in top add here also for Mobile View  */}
               
              </div>
            )}



            {isUserMenuOpen && !isProductMenuOpen &&(
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10"
              data-aos="fade-left"
              >
                <Link
                  to={getDashboardLink()}
                  className="block px-2 py-2 text-gray-800 hover:bg-gray-100 hover:text-green-800"
                  onClick={closedropDown}
                ><DashboardCustomizeOutlinedIcon style={{ marginRight: '8px' }} />
                  Dashboard
                </Link>
                <div>
                  <Link
                    to="/requirement-post"
                    className="block px-2 py-2 text-gray-800 hover:bg-gray-100 hover:text-green-800"
                    onClick={closedropDown}
                  >
                    <PostAddOutlinedIcon style={{ marginRight: '8px' }} />
                    Post Your Requirement
                  </Link>
                </div>

                <div className="block px-4 py-2">
                  <LogoutButton />
                </div>
              </div>
            )}
          </div>
          </>
        
        ) : (
          <>
          <div className='inline lg:hidden'>
          <img src='https://res.cloudinary.com/dq7vggsop/image/upload/v1717755234/v95q9tfsjbzhzjqhc5id.svg'  alt='hamburger2'  className="w-6 h-6 " onClick={toggleProductMenu}/>
          </div>
          <div className="relative">
            <button
              className="text-white flex items-center"
              onClick={toggleSignInMenu}
            >
              <div>
              <img
                src="https://res.cloudinary.com/dq7vggsop/image/upload/v1717754786/jva6diapcubipfylogfj.svg"
                alt="User Avatar"

                className="w-10 h-6"
              />
              </div>
            </button>

            {isProductMenuOpen && !isSignInMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10"
              data-aos="fade-left"
              >
                <div>
                  <Link
                    to="/"
                    onClick={() => setIsProductOpen(false)}
                    className="block px-2 py-2 text-gray-800 hover:bg-gray-100 hover:text-green-800"
                    // onClick={closedropDown}
                  >
                    {/* <PermIdentityOutlinedIcon style={{ marginRight: '8px' }} /> */}
                   Home
                  </Link>
                </div>

                <Link to="/input-products" onClick={() => setIsProductOpen(false)}>
                <div
                  // onClick={handleRequirementPostClick}
                  className="flex flex-row px-2 py-2 text-gray-800 hover:bg-gray-100 hover:text-green-800 cursor-pointer"
                >
                  <div>
                    {/* <AgricultureIcon style={{ marginRight: '8px' }}/> */}

                  {/* <PostAddOutlinedIcon style={{ marginRight: '8px' }} /> */}
                Input Products
                </div>
      
                </div>
                </Link>

                <Link to="/output-products" onClick={() => setIsProductOpen(false)}>
                <div
                  // onClick={handleRequirementPostClick}
                  className="flex flex-row px-2 py-2 text-gray-800 hover:bg-gray-200 hover:text-green-800 cursor-pointer"
                >
                  <div>

                  {/* <PostAddOutlinedIcon style={{ marginRight: '8px' }} /> */}
                Output Products
                </div>
              
                </div>
                </Link>

               <Link to="agri-services" onClick={() => setIsProductOpen(false)}>
               <div
                  // onClick={handleRequirementPostClick}
                  className="flex flex-row px-2 py-2 text-gray-800 hover:bg-gray-100 hover:text-green-800 cursor-pointer"
                >
                  <div>

                  {/* <PostAddOutlinedIcon style={{ marginRight: '8px' }} /> */}
                Agri Services
                </div>
               
                </div>
               </Link>

                <Link to="help" onClick={() => setIsProductOpen(false)}>
                <div
                  // onClick={handleRequirementPostClick}
                  className="flex flex-row px-2 py-2 text-gray-800 hover:bg-gray-100 hover:text-green-800 cursor-pointer"
                >
                  <div>
                  {/* <PostAddOutlinedIcon style={{ marginRight: '8px' }} /> */}
                Help
                </div>
               
                </div>
                </Link>
                  {/* Add Other also after Help  */}
               
              </div>
            )}

            {isSignInMenuOpen && !isProductMenuOpen &&(
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10"
               data-aos="fade-left"
              >
                <div>
                  <Link
                    to="/login"
                    className="block px-2 py-2 text-gray-800 hover:bg-gray-100 hover:text-green-800"
                    onClick={closedropDown}
                  >
                    <PermIdentityOutlinedIcon style={{ marginRight: '8px' }} />
                    Login / Register
                  </Link>
                </div>

                <div
                  onClick={handleRequirementPostClick}
                  className="block px-2 py-2 text-gray-800 hover:bg-gray-100 hover:text-green-800 cursor-pointer"
                >
                  <PostAddOutlinedIcon style={{ marginRight: '8px' }} />
                  Post Your Requirement
                </div>
              </div>
            )}
          </div>
          </>

        )}
      </div>
    </header>
  );
};

export default Header;
