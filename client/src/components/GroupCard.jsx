import React from 'react'
import groups from '../groups.json'


const GroupCard = () => {
  // let counter = 0;
  console.log(groups[0].name);
  return (
    <>
    
{/* <div className="min-h-screen bg-slate-50 dark:bg-black dark:text-white"> */}
    


    <section id="rockets" className="p-6 my-12 scroll-mt-20">
            <h2 className="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
                Groups
            </h2>
            <ul className="list-none mx-auto my-12 flex flex-col sm:flex-row items-center gap-8">
              {groups.map((group,index) => 
                <li key={index}
                    className="w-2/3 sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 dark:border-gray-100 bg-white dark:bg-black py-6 px-2 rounded-3xl shadow-xl">
                    <img src="./img/rocketdab.png" alt="Explorer" className="w-1/2 mb-6" />
                    <h3 className="text-3xl text-center text-slate-900 dark:text-white">🔖{group.name}</h3>
                    <p className="hidden sm:block text-3xl text-center mt-2 text-slate-500 dark:text-slate-400">$</p>
                    <p className="sm:hidden text-2xl text-center mt-2 text-slate-500 dark:text-slate-400">Affordable
                         </p>
                </li>)
}
              </ul>
        </section>
    {/* </div> */}


    {/* <div>  */}
    {/* <ul class="list-none mx-auto my-12 flex flex-col sm:flex-row items-center gap-8">
        
        {groups.map((i,group) => (

<li key={i}
className='w-2/3 sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 dark:border-gray-100 bg-white dark:bg-black py-6 px-2 rounded-3xl shadow-xl'>

<h3 className='text-3xl text-center text-slate-900 dark:text-white'>{group.name}</h3>
<p className='hidden sm:block text-3xl text-center mt-2 text-slate-500 dark:text-slate-400'>$</p>
<p className='sm:hidden text-2xl text-center mt-2 text-slate-500 dark:text-slate-400'>Affordable
    Exploration</p>
</li>
            
            
              
))}
</ul> */}
<hr className="mx-auto bg-black dark:bg-white w-1/2"></hr>


    {/* </div> */}
    </>
  )
}

export default GroupCard