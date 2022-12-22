import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

import RubberBand   from 'react-reveal/RubberBand';
const Test = () => {
  AOS.init();
const navigate =useNavigate()

 
function navi(){
   navigate("/login")
}
  // features array

  const features = [
    {
      icon: "https://cdn3.iconfinder.com/data/icons/3d-illustration-metaverse-technology-vol-2/256/Software.png",
      dataDealy: "0",
      title: "Software development",
      description:
        "Software development is the process of conceiving, specifying, designing, programming, documenting, testing, and bug fixing involved in creating and maintaining applications, frameworks, or other software components",
    },
    {
      icon:  "https://cdn1.iconfinder.com/data/icons/metaversy-metaverse-3d-object/256/5._Metaverse_Connect.png",
      dataDealy: "100",
      title: "Embedded System Development",
      description:
        "An embedded system design process is how a manufacturer determines the requirements for a small computerized system embedded within a product. Then, they decide the best way to build that system and test that it works. In an embedded system, hardware and software work together",
    },
    {
      icon:  "https://cdn0.iconfinder.com/data/icons/covid-19-3d/256/Doctor.png",
      dataDealy: "200",
      title: "Doctor",
      description:
        "A physician, medical practitioner, medical doctor, or simply doctor, is a health professional who practices medicine, which is concerned with promoting, maintaining or restoring health through the study, diagnosis, prognosis and treatment of disease, injury, and other physical and mental impairments.",
    },

    {
      icon:  "https://cdn4.iconfinder.com/data/icons/accounting-99/512/accounting_6.png",
      dataDealy: "200",
      title: "Engineer",
      description:
        " A person whose job is to design or build machines, engines, or electrical equipment, or things such as roads, railways, or bridges, using scientific principles",
    },
    {
      icon:  "https://cdn2.iconfinder.com/data/icons/businessman-18/256/accounting_4.png",
      dataDealy: "0",
      title: "Accountant",
      description:
        "A professional who performs accounting functions such as account analysis, auditing, or financial statement analysis. Accountants work with accounting firms or internal account departments with large companies. ",
    },
    
    {
      icon:  "https://cdn1.iconfinder.com/data/icons/business-partner/512/partner_8.png",
      dataDealy: "0",
      title: "business development executive",
      description:
      "Business development executives are responsible for driving company sales by sourcing new clients, and by convincing existing clients to purchase added offerings. As such, business development executives play an integral role in companies' longevity.",
    },
    {
      icon:  "https://cdn4.iconfinder.com/data/icons/accounting-99/512/accounting_8.png",
      dataDealy: "100",
      title: "Manager",
      description:
        "Maintains staff by recruiting, selecting, orienting, and training employees. Ensures a safe, secure, and legal work environment. Develops personal growth opportunities. Accomplishes staff results by communicating job expectations; planning, monitoring, and appraising job results.",
    },
    {
      icon:  "https://cdn2.iconfinder.com/data/icons/businessman-18/256/vision_3.png",
      dataDealy: "100",
      title: "Business development executives",
      description:
        "Business development executives are responsible for driving company sales by sourcing new clients, and by convincing existing clients to purchase added offerings. As such, business development executives play an integral role in companies' longevity.",
    },
    {
      icon:  "https://cdn2.iconfinder.com/data/icons/male-avatars/512/avatars_accounts___man_male_people_person_chef_hat_chef_jacket_worker.png",
      dataDealy: "200",
      title: "chef",
      description:
        "You will get working contact form without any type of Bakcend. We integrated it With Email js. just follow our documentation and integrate it easy way",
    },
  ];

  return (
        




    <>
    {/* <PageTitle title="Preview"></PageTitle> */}
    <section className="bg-previewBg bg-no-repeat bg-center  bg-cover " style={{backgroundImage :`URL("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80")`}}>
      <div className="text-center pt-[100px] pb-[90px] h-[80vh] md:h-[100vh] flex items-center justify-center flex-col">
        {/* Site logo */}
        <RubberBand  >
      <img
          className="inline-block h-[26px] lg:h-[46px]"
          src={"https://cdn1.iconfinder.com/data/icons/bokbokstars-121-classic-stock-icons-1/512/Network.png"}
          alt="logo"
        
        />
       </RubberBand>
        <p
          className="font-medium text-[22px] md:text-[26px] xl:text-[32px] 2xl:text-[42px] text-white pt-[20px] "
          data-aos="fade"
        >
          Connet <span className='text-blue-500'>&</span> Create
          <br className="md:block hidden " />
          {/* <span className="text-blue-500 font-bold font-shadow ">Seeker</span>&nbsp;&nbsp; {"    "}
          <span className="text-[#F95054] font-bold font-shadow ">Provider</span> */}
        </p>

        <div className="flex mt-6 justify-center">
          <a
            href="#demo"
            className="flex-shrink-0 inline-flex mr-3 items-center justify-center px-5 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold leading-6 text-white bg-gradient-to-r  hover:bg-gradient-to-l from-[#3d94e0]  to-[#5078f2ef] rounded-full shadow-md"
          >
            Jobs 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 13l-5 5m0 0l-5-5m5 5V6"
              ></path>
            </svg>
          </a>
          <p
            
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center justify-center px-5 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold leading-6 rounded-full text-white bg-gradient-to-r  hover:bg-gradient-to-l from-[#3d94e0]  to-[#5078f2ef]  shadow-md  cursor-pointer text-[#ffff] "  onClick={navi} 
          >
            login/signup 
          </p>
        </div>
      </div>
    </section>
    {/* End .bg-previewBg */}

    <section
      className="bg-[#000000] bg-no-repeat bg-center bg-cover bg-fixed"
      id="demo"
    >
     
      {/* End .container */}

     
    </section>

    {/* Features section start */}
    <section className="	">
      <div className="container px-4 lg:px-0 text-center mb-[100px] pt-[80px]">
        <h1 className=" text-[32px] md:text-[45px]  text-blue-500  font-extrabold font-mono text-center ">
          Jobs  For  You 
        </h1>
        {/* <img className=" block mx-auto " src={previewimg} alt="" /> */}
      </div>
      {/* End .container  */}

      <div className=" container px-4 lg:px-0 grid grid-cols-1 mx-auto md:grid-cols-2 xl:grid-cols-3 gap-3 pb-[100px]  ">
        {/* features element */}
        {features.map((item) => (
          <div
            key={Math.random()}
            className="bg-slate-800 text-center rounded-xl  transition-all duration-300 ease-linear cursor-pointer group p-8" onClick={navi} 
            data-aos="fade"
            data-aos-delay={item?.dataDealy}
           
          >
            <div className="w-20 h-20 mx-auto rounded-full flex justify-center items-center transition-all duration-300 ease-linear bg-[#33343a] mb-5 group-hover:bg-[#525252]">
              <img className="w-12" src={item?.icon} alt="" />
            </div>
            <h3 className="text-white text-[24px] font-medium">
              {item?.title}
            </h3>
            <p className="text-[#9197a0] transition-all duration-300 ease-linear mt-3 group-hover:text-[#aaa] ">
              {item?.description}
            </p>
          </div>
        ))}
      </div>
    </section>
    {/* Features section start */}

    {/* Start Call To Actions */}
    {/* <section className="text-center bg-[#000] py-[120px] ">
      <p
        data-aos="fade"
        className="font-bold text-[22px] md:text-[26px] xl:text-[32px] 2xl:text-[42px] text-white pt-[40px] mx-auto max-w-4xl px-4 "
      >
        Purchase Bostami & Build Your Dream Portfolio{" "}
        <span className="text-[#F95054]">React JS</span> &{" "}
        <span className="text-[#F95054]">Tailwind CSS</span> Portfolio
        Template.
      </p> */}

      {/* <a
        href="https://themeforest.net/item/bostami-tailwind-css-personal-portfolio-react-template/38598542"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 inline-flex mt-8 items-center justify-center px-5 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold leading-6 text-white bg-gradient-to-r  hover:bg-gradient-to-l  rounded-full shadow-md"
      > */}
        {/* Purchase Now
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 13l-5 5m0 0l-5-5m5 5V6"
          ></path>
        </svg>
      </a>
    </section> */}
    {/* End call to action */}

    {/* Start Footer */}
    <footer className="bg-slate-800">
      <p className="text-center py-5 text-white ">
        © 2022 All Rights Reserved by{" "}
        <a
          className="hover:text-[#FA5252] duration-300 transition"
          href="https://themeforest.net/user/ib-themes"
          target="_blank"
          rel="noopener noreferrer"
        >
          akhil
        </a>
        .
      </p>
    </footer>
    {/* End footer */}
  </>






























  )
}

export default Test