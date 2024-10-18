// 'use client'
// import React, { useState } from 'react'
// import { Accordion , AccordionHeader , AccordionBody } from '@material-tailwind/react'
// import AllUsers from './AllUsers'
// import GetOneUser from './GetOneUser'
// import CreateUser from './CreateUser'
// import UpdateUser from './UpdateUser'
// import DeleteUser from './DeleteUser'
// function AccordianUI() {
//     const [ open , setOpen ] = useState(0)
//     const handleOpen = (value)  => setOpen(open === value ? 0 : value)
//   return (
//     <div>
//         <Accordion open={open === 1}>
//     <AccordionHeader onClick={()=> handleOpen(1)}> All  users
//     </AccordionHeader>
//     <AccordionBody>
//         <AllUsers/>
//     </AccordionBody>
//         </Accordion>

//         <Accordion open={open === 2}>
//     <AccordionHeader onClick={()=> handleOpen(2)}> Get One User
//     </AccordionHeader>
//     <AccordionBody>
//         <GetOneUser/>
//     </AccordionBody>
//         </Accordion>

//         <Accordion open={open===3}>
//     <AccordionHeader onClick={()=> handleOpen(3)}>
//         Create a user
//     </AccordionHeader>
//     <AccordionBody>
//         <CreateUser/>
//     </AccordionBody>
//         </Accordion>

//         <Accordion open={open === 4}>
//         <AccordionHeader onClick={()=> handleOpen(4)}>
//         Update a user
//         </AccordionHeader>
//         <AccordionBody>
//             <UpdateUser/>
//         </AccordionBody>
//         </Accordion>

//         <Accordion open={open === 5}>
//     <AccordionHeader onClick={()=>handleOpen(5)}>
//         Delete a user
//     </AccordionHeader>
//     <AccordionBody>
//     <DeleteUser/>
//     </AccordionBody>
//         </Accordion>
//     </div>
//   )
// }

// export default AccordianUI

'use client'
import React, { useState } from 'react'
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'
import AllUsers from './AllUsers'
import GetOneUser from './GetOneUser'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import DeleteUser from './DeleteUser'

function AccordianUI() {
  const [open, setOpen] = useState(0)
  const handleOpen = (value) => setOpen(open === value ? 0 : value)

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">
        User Management
      </h1>
      <Accordion open={open === 1} className="mb-4 border-b border-gray-300 dark:border-gray-700">
        <AccordionHeader onClick={() => handleOpen(1)} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
          All Users
        </AccordionHeader>
        <AccordionBody className="bg-gray-50 dark:bg-gray-800 p-4">
          <AllUsers />
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 2} className="mb-4 border-b border-gray-300 dark:border-gray-700">
        <AccordionHeader onClick={() => handleOpen(2)} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
          Get One User
        </AccordionHeader>
        <AccordionBody className="bg-gray-50 dark:bg-gray-800 p-4">
          <GetOneUser />
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 3} className="mb-4 border-b border-gray-300 dark:border-gray-700">
        <AccordionHeader onClick={() => handleOpen(3)} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
          Create a User
        </AccordionHeader>
        <AccordionBody className="bg-gray-50 dark:bg-gray-800 p-4">
          <CreateUser />
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 4} className="mb-4 border-b border-gray-300 dark:border-gray-700">
        <AccordionHeader onClick={() => handleOpen(4)} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
          Update a User
        </AccordionHeader>
        <AccordionBody className="bg-gray-50 dark:bg-gray-800 p-4">
          <UpdateUser />
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 5} className="mb-4 border-b border-gray-300 dark:border-gray-700">
        <AccordionHeader onClick={() => handleOpen(5)} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
          Delete a User
        </AccordionHeader>
        <AccordionBody className="bg-gray-50 dark:bg-gray-800 p-4">
          <DeleteUser />
        </AccordionBody>
      </Accordion>
    </div>
  )
}

export default AccordianUI
