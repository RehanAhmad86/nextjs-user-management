import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from 'fs'

 export const GET = async ( request , response ) => {
    const data = await users
    return NextResponse.json({data} , {status: 200})
}

export const POST =  async ( request , response ) => {
    const { id , name , age , username , email , password} = await request.json()
    const uAge = Number(age)
    if(!id , !name || !username || !uAge || !email || !password){
        return NextResponse.json({ message: "All fields are required!" })
    }
    try{
        users.push({
           id , name , age:uAge , username , email , password
        })
        const updatedUser = users
        const updatedData = JSON.stringify(updatedUser)
        fs.writeFileSync('./app/util/db.js' , `export const users = ${updatedData}` , "utf-8")
        return  NextResponse.json("New user is added!")
    }catch(error){
        return NextResponse.json({error: error.message})
    }
}

export const PUT  = async ( request , response )  =>  {
    const { id , name , username , age , email  , password } = await request.json()
    const userIndex = await users.findIndex((user)=> user.id === id)
    if(userIndex === -1){
        return NextResponse.json({Error: "No user found!"})
    }
    if(name){
        users[userIndex].name = name
    }
    if(age){
        users[userIndex].username = username 
    }
    if(username){
        users[userIndex].username = username 
    }
    if(email){
        users[userIndex].email = email
    }
    if(password){
        users[userIndex].password = password
    }
        const updatedUser = users
        const updatedData = JSON.stringify(updatedUser)
        fs.writeFileSync('./app/util/db.js' , `export const users = ${updatedData}` , "utf-8")
        return  NextResponse.json("User is updated!")

}
