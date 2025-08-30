import { useParams } from "react-router-dom"
import { getSinglePosts } from "../Services/PostService"
import { useEffect, useState } from "react"
import PostCard from "../Component/PostCard";
import LoadingScreen from "../Component/LoadingScreen";


export default function PostDetailsPage() {
  let {id}=useParams()
  const [post, setPost] = useState(null)
  async function getSinglePost() {
    let recponse= await getSinglePosts(id)
    if (recponse.message){
      setPost(recponse.post)
    }
  }
 useEffect(()=>{
  getSinglePost()
 })

  return (
<>
<div className="w-4/6 mx-auto">
{post?<PostCard commentLimit={post.comments.length} post={post}/>:<LoadingScreen/>}

</div>

</>  )
}
