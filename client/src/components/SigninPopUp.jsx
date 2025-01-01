import React from 'react'
import { Link } from 'react-router-dom'

const SigninPopUp = () => {
  return (
    <>
    <div>
        <p>Username already present please proceed to <Link to='/signin'>Sign in</Link></p>
    </div>

    </>
  )
}

export default SigninPopUp