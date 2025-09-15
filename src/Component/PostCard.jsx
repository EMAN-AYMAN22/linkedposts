import React, { useContext, useState } from "react";
import HeaderCard from "./Card/HeaderCard";
import BodyCard from "./Card/BodyCard";
import FotterCard from "./Card/FotterCard";
import Comment from "./Comment";
import { Button, Input } from "@heroui/react";
import { getPostCommentsApi, postComment } from "../Services/CommentsService";
import { TokenContext } from "../Context/TokenContext";
import DropDown from "./DropDown";
import CreatePost from "./CreatePost";

export default function PostCard({ post, commentLimit, callback }) {
  const [commentState, setCommentState] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const { userData } = useContext(TokenContext);
  const [isUpdating, setIsUpdating] = useState(false)

  async function createComment(e) {
    e.preventDefault();
    setLoading(true);
    const respons = await postComment(commentState, post.id);
    if (respons.message) {
      setComments(respons.comments);
    }
    setLoading(false);
    setCommentState("");
  }
  async function getPostComments() {
    const response = await getPostCommentsApi(post.id);
    setComments(response.comments);
  }
  return (
    <>
       {isUpdating ? <CreatePost callback={callback} post={post} isUpdating={isUpdating} setIsUpdating={setIsUpdating}/>:
      <div className=" w-full flex flex-col px-3 lg:px-10">
        <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5 overflow-hidden">
          <div className="w-full h-16 flex items-center  justify-between ">
            <HeaderCard
              date={post.createdAt}
              name={post.user.name}
              photo={post.user.photo}
            />
            {userData?._id === post?.user?._id && (
              <DropDown
                callback={callback}
                callbackk={getPostComments}
                postid={post.id}
                setIsUpdating={setIsUpdating}

              />
            )}
          </div>
          <BodyCard image={post.image} body={post.body} />
          <FotterCard numCommnts={comments.length} id={post.id} />
          <form onSubmit={createComment} className="flex gap-2 mb-3">
            <Input
              value={commentState}
              onChange={(e) => setCommentState(e.target.value)}
              variant="bordered"
              placeholder="Comment..."
            />
            <Button
              isLoading={loading}
              type="submit"
              disabled={commentState.length < 2}
              color="primary"
            >
              Add comment
            </Button>
          </form>
          {comments.length > 0 &&
            comments
              .slice(0, commentLimit)
              .map((comment) => (
                <Comment
                  callbackk={getPostComments}
                  postuserid={post.user._id}
                  key={comment._id}
                  Comment={comment}
                />
              ))}
        </div>
      </div>}
    </>
  );
}
