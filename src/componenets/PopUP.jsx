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
    padding:'30px',
    zIndex:1000,
    height:"fit-content"
    
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



const PopUP = ({children,open,onclose,edit}) => {
  

        if(open){
            return (
                <div style={overLay}>
                    <div className='rounded' style={style}>
        <button className='cursor-pointer absolute top-[10px] right-[10px]' onClick={onclose}>X</button>
                    
                    {children}
                    </div>
                </div>
              )
        }else{
            return(null)
        }
        
    }
  


export default PopUP