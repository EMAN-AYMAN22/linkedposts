import axios from "axios"

   


   export async function getUserDataApi() {
    try{
          let {data} = await axios.get('https://linked-posts.routemisr.com/users/profile-data',{
        headers:{
            token: localStorage.getItem('token')
        }
          })
              console.log(data);
          return data
      
          
    } catch(error){
     return error.response.data
    }
   
   }

   export async function sendRegister(userdata) {
    try{
          let {data} = await axios.post('https://linked-posts.routemisr.com/users/signup',userdata)
          return data
    } catch(error){
     return error.response.data
    }
   
   }
   export async function sendLogin(userdata) {
    try{
          let {data} = await axios.post('https://linked-posts.routemisr.com/users/signin',userdata)
          return data
    } catch(error){
     return error.response.data
    }
   
   }