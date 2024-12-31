import React from 'react'
import groups from '../groups.json'

const GroupCard = () => {
  // let counter = 0;
  return (
    <>
    <div>
        
        {groups.map((i,group) => (
            
            <div id={i} className='bg-customGreen w-2/12 font-bold rounded-md flex flex-col justify-between align-center'>
              {/* <div className='w-full block rounded-full h-1'>

              <img  cLassName='object-scale-down object-cover'src="/images/expenses-icon.jpg" alt="" />

              </div> */}
 
                 <div className="bg-red-500 w-16 h-16 rounded-full mx-auto"></div>
                 <p className='mx-auto'>{group.name}</p>
                 
              </div>
              
))}
    </div>
    </>
  )
}

export default GroupCard