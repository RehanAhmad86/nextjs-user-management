'use client'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Input } from '@material-tailwind/react'

function DeleteUser() {
    const [id, setId] = useState('')
    const [isError, setIsError] = useState(false)
    const [Error, setError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const clearInput = () => {
        setId('')
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        if (!id) {
            setIsError(true)
            return
        }
        setIsError(false)
        setError(false)
        setIsSuccess(false)
        const deleteId = Number(id)
        try{
            const result = await fetch(`http://localhost:3000/api/users/${deleteId}`, {
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data = await result.json()
        if (result.ok) {
            setIsSuccess(true)
            clearInput()
        }
        else {
            setError(true)
            clearInput()
        }}catch(error)
        {
            setError(true)
        }
    }

        useEffect(()=>{
            if(isSuccess){
                const timer = setTimeout(() => {
                        setIsSuccess(false)
                }, 3000);
                return ()=> clearTimeout(timer)
            }
        } , [isSuccess])
        useEffect(()=>{
            if(isError){
                const timer = setTimeout(() => {
                    setIsError(false)
                }, 3000);
                return ()=> clearTimeout(timer)
            }
        } , [isError])
        useEffect(()=>{
            const timer = setTimeout(() => {
                setError(false)
            }, 3000);
            return ()=> clearTimeout(timer)
        } , [Error])
         
    return (
        <div>
            <div className='flex gap-5 items-center'>
                <Input type='text' label='Enter User ID' value={id} onChange={e => setId(e.target.value)} />
                <Button className='border-2 text-center border-gray-300' onClick={handleDelete}>Delete</Button>
            </div>
            {
                isError && (
                    <Alert className='mt-3' color='red'>User ID must be provided!</Alert>
                )
            }
            {
                isSuccess && !isError && !Error && (
                    <Alert className='mt-3' color='green'>User has been Deleted!</Alert>
                )
            }
            {
                Error && (
                    <Alert className='mt-3' color='red'>User does not exist!</Alert>
                )
            }
        </div>
    )
}

export default DeleteUser