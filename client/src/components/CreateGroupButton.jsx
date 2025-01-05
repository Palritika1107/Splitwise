import React from 'react'
import { Link } from 'react-router-dom';

const CreateGroupButton = ({groupFormDisplay}) => {
  return (
    <>
    
        
        <Link to='/groupform'>
        <section id="button" className="p-6 my-12 max-w-4xl mx-auto flex justify-center items-center">
            <button className="bg-teal-700 text-3xl font-bold text-center sm:text-4xl mb-6 text-slate-900 dark:text-white inline-block  w-1/2 rounded-full p-4 hover:opacity-90">
             👥 Create Group
            </button>
        </section>
        </Link>
    
    </>
    
  )
}

export default CreateGroupButton