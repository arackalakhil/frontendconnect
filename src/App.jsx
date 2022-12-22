import { forwardRef } from 'react';
import PrivateRoute from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Header from './pages/Header';
import AdminHome from './pages/AdminHome';
import AdminLogin from './pages/AdminLogin';
import UserData from './pages/AdminUserData'
import Test from './pages/test';
import CompanySignup from './pages/CompanySignup';
import Settings from './pages/Settings';
import Experience from './pages/Experience';
import Education  from './pages/Education';
import UserProfile from './pages/UserProfile';
import MyProjects from './pages/UserProfile';
import ProfileData from './pages/ProfileData'
import HomeCard from './componenets/HomeCard';
import AboutMe from './componenets/AboutMe';
import "./style/style.css"
import { Outlet } from 'react-router-dom';
import JobPage from './pages/JobPage';
import Alldataprofile from "./componenets/Alldataprofile"
import Companydata from "./pages/Companydata"
import ChatPage from './pages/User/ChatPage';
import Chatbot from './pages/Chatbot';
import Ai from './componenets/Ai';
function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route>

              <Route path='/' exact element={
                < PrivateRoute>
                  <Header />
                  <HomePage />
                  <Chatbot />
                </PrivateRoute>
              } />

              <Route path='/profile' exact element={
                < PrivateRoute>
                <Header />
                <div className="container grid grid-cols-12 md:gap-10  justify-between lg:mt-[220px] ">
          <div className="col-span-12 lg:col-span-4 hidden lg:block h-screen sticky top-44">
            { /* profile sidebar */}
            <HomeCard />
          </div>
          <div className="col-span-12 lg:col-span-8  ">
            { /* header two  */}

                  <AboutMe/>
            {/* <HeaderTwo /> */}
            <Outlet />
          </div>
        </div>
                  
                </PrivateRoute>
              } />



        <Route path='/jobs' exact element={
                < PrivateRoute>
                  <Header />
                  <JobPage/>
                  <Chatbot />

                </PrivateRoute>
              } />
              <Route path='/aichat' exact element={
                < PrivateRoute>
                  <Header />
                  <Ai/>

                </PrivateRoute>
              } />
              {/* <Route path='/settings' exact element={
                <PrivateRoute>
                  <Header  />
                  <Settings />
                </PrivateRoute>
              } /> */}
              {/* <Route path='/akhil'exact element={
                  <><Header /><HomeCard />
                  <AboutMe/></>

              }/> */}
              <Route exact element={<Settings />} path="/settings" >
              <Route element={<Companydata />} path="comapnyprofile" />

                  <Route element={<Experience />} path="experience" />
                 
                  <Route element={<Education />} path="education" />
                  <Route element={<UserProfile />} path="userprofile" />
                  <Route element={<ProfileData />} path="profileData" />

                  <Route element={<MyProjects />} path="myProjects" />
                  
                  
                  {/* <Route element={<UserData />} path="/userdata" /> */}
              </Route>

      
             
         <Route path='/chatPage' exact element={
                < PrivateRoute>
          
                  <Header />
                  <ChatPage />
                </PrivateRoute>
              } />
             
              <Route path='/chatPage/:otherid/:otherusername' exact element={
                < PrivateRoute>
          
                  <Header />
                  <ChatPage />
                </PrivateRoute>
              } />
           





              <Route element={<Test />} path='/home' />
         



              <Route element={<LoginPage />} path='/login' />
              <Route element={<SignupPage />} path="/signup" />
              <Route element={<CompanySignup />} path="/company-signup" />


              <Route element={<AdminLogin />} path="/adminLogin" />
              <Route exact element={<AdminHome />} path="/adminHome" >
                <Route element={<UserData />} path="userdata" />
                {/* <Route element={<UserData />} path="/userdata" /> */}
              </Route>

            </Route>

          </Routes>


        </AuthProvider>



      </BrowserRouter>




    </div>
  );
}

export default App;
