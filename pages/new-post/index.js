import NewPostForm from "@/components/posts/NewPostForm";

export default function NewPost() {
  function addPostHandler (enteredPostData) {
    console.log(enteredPostData)
  }
  return (
    <NewPostForm onAddPost={addPostHandler}/>
  )
}