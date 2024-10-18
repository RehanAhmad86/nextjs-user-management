'use client'
import { Alert, Input , Button, timeline } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

function UpdateUser() {
    let [ formData , setFormData] = useState({
        id:"",
        name: "",
        age:"",
        username:"",
        email:"",
        password:""
    })
    const [ isFailure , setIsFailure ] = useState(false)
    const [ isSuccess , setIsSuccess] =  useState(false)
    const [ checkEmail , setCheckEmail] =  useState(false)
    const [ error , setError ] = useState(false)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.id === 'age' ? Number(e.target.value) : e.target.value
        setFormData({
            ...formData,
            [e.target.id]: value
        })
    }
    const UpdateUser = async (e) => {
        e.preventDefault()
        const { id , ...otherValues } = formData
        const otherFields = Object.values(otherValues).some((value)=> value.trim())
        if(!otherFields){
            setError(true)
            return
        }
         if(!formData.id){
            setIsFailure(true)
            return
        }
        if(formData.email && !emailRegex.test(formData.email)){
            setCheckEmail(true)
            return
        }
        const Data = { id: formData.id}
        for ( const key in formData){
            if(key !== 'id' && formData[key].trim()){
                Data[key] = formData[key]
            }
        }
        setIsFailure(false)
        setIsSuccess(false)
        const result = await fetch('http://localhost:3000/api/users' , {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(Data)
        })
        await result.json()
        if(result.ok){
            setIsSuccess(true)
            setIsFailure(false)
            setCheckEmail(false)
        }else{
            setIsFailure(true)
        }
    }

    useEffect(()=>{
        if(isSuccess){
            const timer = setTimeout(() => {
                setIsSuccess(false)
            }, 3000);
            return () => clearTimeout(timer)
        }
    } , [isSuccess])

    useEffect(()=>{
        if(isFailure){
            const timer = setTimeout(() => {
                setIsFailure(false)
            }, 3000);
            return () => clearTimeout(timer)
        }
    } , [isFailure])

    useEffect(()=>{
        if(checkEmail){
            const timer = setTimeout(() => {
                setCheckEmail(false)
            }, 3000);
            return ()=> clearTimeout(timer)
        }
    } , [checkEmail])

    useEffect(()=>{
        if(error){
            const timer = setTimeout(() => {
                setError(false)
            }, 3000);
            return () => clearTimeout(timer)
        }
    },[error])

  return (
    <div>
        <div className='flex flex-col gap-3'>
            <Input id='id' type='text' onChange={handleChange} label='Enter ID' />
            <Input id='name' type='text' onChange={handleChange} label='Enter name' />
            <Input id='age' type='text' onChange={handleChange} label='Enter age'/>
            <Input id='username' type='text' onChange={handleChange} label='Enter username'/>
            <Input id='email' type='text' onChange={handleChange} label='Enter email'/>
            <Input type='password' id='password' onChange={handleChange} label='Enter password'/>
            <Button className='border-2 border-gray-300' onClick={UpdateUser}>Update User</Button>
        </div>
        {
            isFailure && (
                <Alert className='mt-3' color='red'>User ID must be provided!</Alert>
            )
        }
        {
            isSuccess && !isFailure && (
                <Alert className='mt-3' color='green'>User has been updated successfully!</Alert>
            )
        }
        {
            checkEmail && (
                <Alert className='mt-3' color='red'>Provide valid Email address!</Alert>
            )
        }
        {
            error && (
                <Alert className='mt-3' color='red'>No field is Updated!</Alert>
            )
        }
    </div>
  )
}

export default UpdateUser