import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Deconnect() {
    const navigate = useNavigate()

    useEffect(() => {
        Cookies.remove("userId")
        Cookies.remove("email")
        navigate('/')
        toast.success("disconnected successfully")
    }, [])
    

  return (
    <>
    </>
  )
}
