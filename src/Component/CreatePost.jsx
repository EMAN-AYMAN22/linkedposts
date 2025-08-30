import React, { useEffect, useState } from "react";
import img from "../assets/download.png";
import { Button, Spinner } from "@heroui/react";
import { createPostApi, updatePostApi } from "../Services/PostService";
import axios from "axios";

export default function CreatePost({callback,isUpdating,post,setIsUpdating}) {
  const [body, setBody] = useState(post?.body ?? "");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(post?.image ?? "");
  const [loading, setLoading] = useState(false);

  async function urlToFile() {
    const response = await fetch(post?.image);
    const data = await response.blob();
    let file = new File([data], "image", { type: "image/jpg" });
    setImage(file);
  }

  useEffect(() => {
    urlToFile();
  }, []);

  async function createPost(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    body && formData.append("body", body);
    image && formData.append("image", image);

    let response;

    if (isUpdating) {
      response = await updatePostApi(post.id, formData);
      
    } else {
      response = await createPostApi(formData);
    }

    if (response.message) {
      await callback();
      setBody("");
      setImageURL("");
       if (isUpdating) {
    setIsUpdating(false);
  }

    }

    setLoading(false);
  }

  function handleImage(e) {
    setImage(e.target.files[0]);
    setImageURL(URL.createObjectURL(e.target.files[0]));
    e.target.value = null;
  }

  return (
    <>
      <div className="bg-white w-full relative rounded-md shadow-md h-auto py-3 px-3 my-5 overflow-hidden">
        <form onSubmit={createPost}>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="create post, what`s on your mind....?"
            className="bg-gray-100 border w-full p-4 rounded-md resize-none"
            rows={4}
          ></textarea>

          {imageURL && (
            <div className="relative">
              <img src={imageURL} className="w-full" alt="" />
              <svg
                onClick={() => {
                  setImageURL("");
                  setImage(null);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 absolute top-4 end-4 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            <label className="cursor-pointer flex items-center gap-1 hover:text-blue-500">
              <input onChange={handleImage} type="file" className="hidden" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </label>

            {isUpdating && (
              <Button onPress={() => {setIsUpdating(false)}}>cancel</Button>
            )}

            <Button type="submit" color="primary">
              Post
            </Button>
          </div>
        </form>

        {loading && (
          <div className="absolute flex justify-center items-center inset-0 bg-white/50">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
