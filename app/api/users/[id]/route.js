import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from 'fs'

export const GET = async ( Request , Response ) => {
    const {id} = await Response.params
    const oneUser = await users.filter((user)=> user.id === id)
    if(oneUser.length === 0){
        return NextResponse.json({Error:"User does not exist!"} , {status:404})
    }
    return NextResponse.json({oneUser})
}

export const POST =  async ( request , response ) => {
    const {username , password } = await request.json()
    const {id} =  await response.params
     if(!username || !password){
         return NextResponse.json({Error:"All fields are required!"})
     }
         const user = await users.find((user)=> user.id === id)
         if(!user){
            return NextResponse.json({Error:"User not found!"})
         }else{
             const { username:uname , password:upassword} = user
             if(username===uname && password===upassword){
                 return NextResponse.json(user)
             }
             else{
                return NextResponse.json("No User found!")
             }
         }
}

export const DELETE = async ( request , response ) => {
    const { id } = await response.params
    const userIndex = await users.findIndex((user)=>user.id === id)
    if(userIndex === -1){
        return NextResponse.json({Error:"User Id not found!"} , {status:404})
    }
    users.splice( userIndex , 1)
    const updatedData = JSON.stringify(users)
    fs.writeFileSync( './app/util/db.js' , `export const users = ${updatedData}` , "utf-8")
    return NextResponse.json(` Index ${userIndex} has been deleted.`)
}