'use client'
import React, { useEffect, useState } from 'react'
import { List, ListItem, Card, Input, Button, Alert } from '@material-tailwind/react'
function GetOneUser() {

    const [userIndex, setUserIndex] = useState('')
    const [userData, setUserData] = useState([])
    const [ error , setError ] = useState(false)
    const [ findUser , setFindUser ] = useState(false)

    const handleUser = async (e) => {
        e.preventDefault()
        if(!userIndex.trim()){
            setError(true)
            return
        }
        setError(false)
        setFindUser(false)
        try{
        const result = await fetch(`http://localhost:3000/api/users/${userIndex}`)
        const data = await result.json()
        if (result.ok) {
            setUserData(data.oneUser)
            setUserIndex('')
        } else {
            setFindUser(true)
        }
        }catch(error){
            setFindUser(true)
        }
    }

    useEffect(()=>{
        if(error){
            const timer = setTimeout(() => {
                setError(false)
            }, 3000);
            return ()=> clearTimeout(timer)
        }
    } , [error])

    useEffect(()=>{
        if(findUser){
            const timer = setTimeout(() => {
                setFindUser(false)
            }, 3000);
            return ()=> clearTimeout(timer)
        }
    } , [findUser])
    return (
        <div>
            <div className='flex gap-5 items-center'>
                <Input label='Enter User Id' value={userIndex} onChange={event => { setUserIndex(event.target.value) }} />
                <Button className='border-2 border-gray-300' onClick={handleUser}>Get</Button>
            </div>
            {
                userData && userData.map((user) => (
                    <Card className='mt-3' key={user.id}>
                    <List className='mt-1'>
                        <ListItem>ID:  {user.id} </ListItem>
                        <ListItem>Name:  {user.name} </ListItem>
                        <ListItem>Age:  {user.age} </ListItem>
                        <ListItem>Username:  {user.username} </ListItem>
                        <ListItem>Email:  {user.email} </ListItem>
                    </List>
                    </Card>
                ))
            }
            {
                error && (
                    <Alert className='mt-3' color='red'>User ID must be provided!</Alert>
                )
            }
            {
                findUser && (
                    <Alert className='mt-3' color='red'>User does not exist!</Alert>
                )
            }
        </div>
    )
}

export default GetOneUser