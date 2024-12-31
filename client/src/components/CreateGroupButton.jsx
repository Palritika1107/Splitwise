import React from 'react'
import { Link } from 'react-router-dom';

const CreateGroupButton = ({groupFormDisplay}) => {
  return (
    <>
        <div>
        <Link to=''className='bg-teal-600 text-white px-3 py-2 sm:px-5 sm:py-3 rounded shadow sm-cta-button border-b-4 border-gray-400 relative hover:border-b-2 hover:top-1 active:border-b-0 active:top-3 mx-auto my-1 block'>Create Group</Link>

      </div>
    </>
  )
}

export default CreateGroupButton