import React from 'react'
import {Link} from 'react-router-dom'

const HomePageHeader = ({openPopup}) => {
  return (
    <header className="bg-teal-700 text-white sticky top-0 z-10">
        <section className="max-w-4xl mx-auto p-4 flex justify-between items-center">

                <h1 className="text-3xl font-medium">
                    <a href="#hero" className="inline-flex items-center space-x-0">
                    <span className="mr-[-2px]">💲</span>plitwise
                      
                      </a>
                </h1>

                    <div>
                        <button id="mobile-open-button" className="text-3xl sm:hidden focus:outline-none">
                            ☰
                        </button>
                        <nav className="hidden sm:block space-x-8 text-xl" aria-label="main">
                            <Link to="#groups" className="hover:opacity-90">Groups</Link>
                            <Link to="#" onClick={openPopup}className="hover:opacity-90">Friends</Link>
                            <Link to="#activity" className="hover:opacity-90">Activity</Link>
                            <Link to="#account" className="hover:opacity-90">Account</Link>

                        </nav>
                    </div>


                    
                

        </section>
    </header>
  )
}

export default HomePageHeader