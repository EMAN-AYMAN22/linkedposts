import React, { useContext } from 'react'
import HeaderCard from './Card/HeaderCard'
import { TokenContext } from '../Context/TokenContext'
import DropDown from './DropDown'

export default function Comment({Comment,postuserid,callbackk}) {
  let {userData}=useContext(TokenContext)
  
  return (
<>

   <div className=" bg-gray-100 -mx-3 -mb-3 p-4">
            <div className="w-full flex items-center  justify-between ">
            <HeaderCard photo={Comment.commentCreator.photo} 
            name={Comment.commentCreator.name}
            date={Comment.createdAt} />
           {userData?._id === Comment?.commentCreator._id && userData?._id===postuserid &&
           <DropDown   callbackk={callbackk} commentid={Comment._id}/>
}
          </div>
          <p className="p-4 pb-0">{Comment.content}</p>
          </div>
</>  )
}
