import React from "react";

const AboutCard = ({ item ,local }) => {
  return (
    <div 
      style={{ background: `${ false ? "transparent" : item?.bg}` }}
      className="about-box dark:bg-transparent rounded bg-sky-10 max-h-[100px] "
    >
      {/* <img className="w-10 h-10 object-contain  block" src={item.icon} alt="" /> */}

     <div className="p-7 rounded-2xl mt-7  bg-[#c5f5f5] dark:bg-[#325252] ">
            <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] pb-2.5">
              
              <div className="text-left ml-2.5">
                <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                  Comany
                </p>
                <p className="dark:text-white">{item.company}</p>
              </div>
            </div>
            <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
             
              <div className="text-left ml-2.5">
                <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                 Job Post
                </p>
                <p className="dark:text-white">{item.Post}</p>
              </div>
            </div>
            <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
             
              <div className="text-left ml-2.5">
                <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                Join date
                </p>
                <p className="dark:text-white">{item.join_date}</p>
              </div>
            </div>
            <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
             
             <div className="text-left ml-2.5">
               <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
               Leave date
               </p>
               <p className="dark:text-white">{item.Leave_date}</p>
             </div>
           </div>
           <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
             
             <div className="text-left ml-2.5">
               <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                Objective
               </p>
               <p className="dark:text-white overflow-auto">{item.aim}</p>
             </div>
           </div>
            {/* <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
              <span className="socialbtn dark:bg-black text-[#FD7590]">
                <FaMapMarkerAlt />
              </span>
              <div className="text-left ml-2.5">
                <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                  Location
                </p>
                <p className="dark:text-white">HCMC, kochi</p>
              </div>
            </div> */}
           
          </div>
          </div>

  );
};
export default AboutCard;