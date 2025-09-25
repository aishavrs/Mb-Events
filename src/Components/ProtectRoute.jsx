import React, { useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectRoute({children}) {
    const Navigate = useNavigate()
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        if (!user) {
            Navigate("/sign-in")
        }
    }, [user, Navigate])
    return children
}
