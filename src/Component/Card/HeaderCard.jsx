import React from 'react'
import userImage from "../../assets/download.png"

export default function HeaderCard({name,photo,date}) {
  return (
  <>
   <div className="flex">
              <img
                className=" rounded-full w-10 h-10 mr-3"
                onError={(e)=>e.target.src=userImage} src={photo} alt={name}/>
              <div>
                <h3 className="text-md font-semibold ">{name}</h3>
                <p className="text-xs text-gray-500">
                  {date.split(".")[0].replace("T", " ")}
                </p>
              </div>
            </div>
  

  
  
  </>
  )
}
