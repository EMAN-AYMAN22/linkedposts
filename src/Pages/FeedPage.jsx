import { Button } from "@heroui/react";
import PostCard from "../Component/PostCard";
import { useEffect, useState } from "react";
import { getPosts } from "../Services/PostService";
import LoadingScreen from "../Component/LoadingScreen";
import CreatePost from "../Component/CreatePost";

export default function FeedPage() {
  const [posts, setPosts] = useState([])
  
  async function getPostAll() {
    const response= await getPosts()
    setPosts(response.posts)

  }
  useEffect(()=>{
   getPostAll()
  },[])

  return (
    <>
    
      <div className="w-4/6 mx-auto">

     <CreatePost callback={getPostAll}/>
      {posts.length==0? <LoadingScreen/>:posts.map((post) => <PostCard callback={getPostAll} commentLimit={1} key={post.id} post={post}/>)}
           
      </div>

    </>
  );
}
