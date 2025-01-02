import React from 'react'
import GroupCard from './GroupCard'
import CreateGroupButton from '../components/CreateGroupButton'

const GroupCards = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black dark:text-white">

    
    <GroupCard />
    <CreateGroupButton />

    </div>
  )
}

export default GroupCards