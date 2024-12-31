import React from 'react'
import groups from '../groups.json'
import GroupCards from '../components/GroupCards'
import CreateGroupButton from '../components/CreateGroupButton'

const HomePage = () => {
  return (
    <>
    <GroupCards />
    <CreateGroupButton />
    </>
    
  )
}

export default HomePage