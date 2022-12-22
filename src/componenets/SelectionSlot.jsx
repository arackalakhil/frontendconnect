import React from 'react'
import { useEffect } from 'react'

const style={
    position:'fixed',
    top:'10%',
    left:'30%',
    right:'30%',
    bottom:'30%',
    transform:'transilate(-50%,-50%)',
    backgroundColor:'#ededed',
    padding:'50px',
    zIndex:1000,
    height:"fit-content",
    width:"fit-content"

    
  }

  const overLay={
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(2,0,0,.5)',
   zIndex:1000

}



const SelectionSlot = ({children,open}) => {

        if(open){
            return (
                <div style={overLay} >
                    <div className='rounded bg-gradient-to-r max-w-2xl from-blue-400 to-blue-250 sm:min-w-fit  "' style={style}>
                    
                    {children}
                    </div>
                </div>
              )
        }else{
            return(null)
        }
        
    }
  


export default SelectionSlot