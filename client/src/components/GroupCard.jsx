import React from 'react'
import groups from '../groups.json'

const GroupCard = () => {
  // let counter = 0;
  console.log(groups[0].name);
  return (
    <>
    
{/* <div className="min-h-screen bg-slate-50 dark:bg-black dark:text-white"> */}
    <header className="bg-teal-700 text-white sticky top-0 z-10">
        <section className="max-w-4xl mx-auto p-4 flex justify-between items-center">

                <h1 className="text-3xl font-medium">
                    <a href="#hero" class="inline-flex items-center space-x-0">
                    <span class="mr-[-2px]">💲</span>plitwise
                      
                      </a>
                </h1>

                    <div>
                        <button id="mobile-open-button" className="text-3xl sm:hidden focus:outline-none">
                            ☰
                        </button>
                        <nav className="hidden sm:block space-x-8 text-xl" aria-label="main">
                            <a href="#groups" className="hover:opacity-90">Groups</a>
                            <a href="#friends" className="hover:opacity-90">Friends</a>
                            <a href="#activity" className="hover:opacity-90">Activity</a>
                            <a href="#account" className="hover:opacity-90">Account</a>

                        </nav>
                    </div>


                    
                

        </section>
    </header>


    <section id="rockets" class="p-6 my-12 scroll-mt-20">
            <h2 class="text-4xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
                Groups
            </h2>
            <ul class="list-none mx-auto my-12 flex flex-col sm:flex-row items-center gap-8">
              {groups.map((group,index) => 
                <li key={index}
                    class="w-2/3 sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 dark:border-gray-100 bg-white dark:bg-black py-6 px-2 rounded-3xl shadow-xl">
                    <img src="./img/rocketdab.png" alt="Explorer" class="w-1/2 mb-6" />
                    <h3 class="text-3xl text-center text-slate-900 dark:text-white">🔖{group.name}</h3>
                    <p class="hidden sm:block text-3xl text-center mt-2 text-slate-500 dark:text-slate-400">$</p>
                    <p class="sm:hidden text-2xl text-center mt-2 text-slate-500 dark:text-slate-400">Affordable
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


    {/* </div> */}
    </>
  )
}

export default GroupCard