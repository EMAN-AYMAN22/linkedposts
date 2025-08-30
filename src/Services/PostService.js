import axios from "axios";
import { param } from "framer-motion/client";
import { useParams } from "react-router-dom";




export async function getPosts() {
    
  try {
      const { data }= await axios.get('https://linked-posts.routemisr.com/posts',{
        headers:{
            token: localStorage.getItem('token')
        },
        params:{
        limit:30,
        sort:'-createdAt'
      }
       
        
    })
    //  console.log(data);
        return data
  } catch (error) {
    console.log(error);
    
  }
}

export async function getSinglePosts(id) {
    
  try {
      const { data }= await axios.get('https://linked-posts.routemisr.com/posts/'+id,{
        headers:{
            token: localStorage.getItem('token')
        }
    
       
        
    })
        return data
  } catch (error) {
    console.log(error);
    
  }
}


export async function createPostApi( formData) {
    
  try {
      const { data }= await axios.post('https://linked-posts.routemisr.com/posts', formData,
        {
        headers:{
            token: localStorage.getItem('token')
        }
      
        
    })
     console.log(data);
        return data
  } catch (error) {
    console.log(error);
    
  }
}
export async function deletePostApi( postid) {
    
  try {
      const { data }= await axios.delete('https://linked-posts.routemisr.com/posts/'+postid, 
        {
        headers:{
            token: localStorage.getItem('token')
        }
      
        
    })
     console.log(data);
        return data
  } catch (error) {
    console.log(error);
    
  }
}
export async function updatePostApi( postid,formData) {
    
  try {
      const { data }= await axios.put('https://linked-posts.routemisr.com/posts/'+postid, formData,
        {
        headers:{
            token: localStorage.getItem('token')
        }
      
        
    })
     console.log(data);
        return data
  } catch (error) {
    console.log(error);
    
  }
}