import * as zod from "zod"
import { path } from "framer-motion/client";



 export const schema =zod.object({
   name: zod.string().nonempty('name is required')
   .min(3,'must at least 3 character')
   .max(20,'must at most 20 character')

   , email:zod.string().nonempty('Email is required')
   .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

   ,password: zod.string().nonempty('Password is required')
   .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,'password is invalid')

   ,rePassword:zod.string().nonempty('rePassword is required')
   ,dateOfBirth:zod.coerce.date('date of birth is required')
   .refine((value)=>{
    const userAge= value.getFullYear()
    const now= new Date().getFullYear()
    const diff=now-userAge
    return diff>=18
   },'age less than 18')

   ,gender:zod.string().nonempty('gender is required')

  }).refine((data)=>data.password===data.rePassword , {path:['rePassword'] ,message:"password and rePassword are not match"})
