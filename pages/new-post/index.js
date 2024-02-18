import NewPostForm from "@/components/posts/NewPostForm";
import {useRouter} from "next/router";

export default function NewPostPage() {
  const router = useRouter()
  async function addPostHandler (enteredPostData) {
    console.log(enteredPostData)
    const response = await fetch('/api/new-post', {
      method: 'POST',
      body: JSON.stringify(enteredPostData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data)
    await router.push('/')
  }
  return (
    <NewPostForm onAddPost={addPostHandler}/>
  )
}