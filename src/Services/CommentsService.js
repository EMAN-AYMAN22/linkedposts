import axios from "axios";



export async function postComment( comment,id) {
    
  try {
      const { data }= await axios.post('https://linked-posts.routemisr.com/comments',{
        content:comment,
        post:id
      }
        
        ,{
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
export async function deleteCommentApi(id) {
    
  try {
      const { data }= await axios.delete('https://linked-posts.routemisr.com/comments/'+id,
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
export async function getPostCommentsApi(postid) {
    
  try {
      const { data }= await axios.get('https://linked-posts.routemisr.com/posts/'+postid+'/comments',
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
// export async function deleteCommentApi(id) {
    
//   try {
//       const { data }= await axios.delete('https://linked-posts.routemisr.com/comments/'+id,
//         {
//         headers:{
//             token: localStorage.getItem('token')
//         }
       
        
//     })
//      console.log(data);
//         return data
//   } catch (error) {
//     console.log(error);
    
//   }
// }