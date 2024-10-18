import { Alert, Button, Input } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

function CreateUser() {
    const [ user , setUser ] = useState([])
    const [ isSuccess , setIsSuccess] = useState(false)
    const [ isFailure , setIsFailure] = useState(false)
    const [ isEmailFail , setisEmailFail] = useState(false)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value === 'age' ? Number(e.target.value) : e.target.value
        setUser(
            {
                ...user,
                [e.target.id] : value,
            }
        )
    }
    const createUser = async (e) => {
        e.preventDefault()
        if(!user.id || !user.name || !user.username || !user.email || !user.age || !user.password ){
            setIsFailure(true)
            return
        }
        if(!emailRegex.test(user.email)){
            setisEmailFail(true)
            return
        }
        setIsFailure(false)
        setIsSuccess(false)
        const result = await fetch('http://localhost:3000/api/users' , {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(user)
        })
        if(result.ok){
            setUser({
            id: '',
            name: '',
            age: '',
            username: '',
            email: '',
            password: ''
            })
           setIsSuccess(true)
           setIsFailure(false)
        }
    }
    
    useEffect(()=>{
        if(isSuccess){
            const timer = setTimeout(()=>{
                    setIsSuccess(false)
                
            } , 3000)
            return ()=> clearTimeout(timer)
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
        if(isEmailFail){
            const timer = setTimeout(() => {
                setisEmailFail(false)
            }, 3000);
            return () => clearTimeout(timer)
        }
    } , [isEmailFail])

  return (
    <div className='flex flex-col gap-3'>
        <Input id='id' value={user.id || ''} onChange={handleChange} label='Enter ID'  />
        <Input id='name' value={user.name || ''} onChange={handleChange}  label='Enter Name'/>
        <Input id='age'value={user.age || ''} onChange={handleChange}  label='Enter Age'/>
        <Input id='username'value={user.username || ''} onChange={handleChange}  label='Enter Username'/>
        <Input id='email'value={user.email || ''} onChange={handleChange}  label='Enter Email'/>
        <Input type='password' id='password' value={user.password || ''} onChange={handleChange}  label='Enter Password'/>
        <Button className=' border-2 border-gray-300' onClick={createUser}>Create</Button>
        {
            isSuccess && !isFailure && (
                <Alert color='green'>User Successfully Added!</Alert>
            )
        }
        {
            isFailure &&  (
                <Alert color='red'>All fields should be filled!</Alert>
            )
        }
        {
            isEmailFail && (
                <Alert color='red'>Please provide valid Email Address!</Alert>
            )
        }
    </div>
  )
}

export default CreateUser