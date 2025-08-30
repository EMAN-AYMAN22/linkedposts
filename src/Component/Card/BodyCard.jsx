import React from 'react'

export default function BodyCard({body,image}) {
  return (
   <>
   {body && <p className=" pb-4">{body}</p>}
          {image&&<img className="w-full object-cover h-75 " src={image} alt="" />}{" "}
   </>
  )
}
