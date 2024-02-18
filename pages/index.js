import PostList from "@/components/posts/PostList";

const DUMMY_POSTS = [
  {
    id: 'p1',
    title: 'titlwwww',
    image: 'https://i.pinimg.com/736x/7b/b8/b6/7bb8b64e70d19814b881215aadfcd631.jpg',
    summary: '11111',
    description: 'descriptionnnn'
  },
  {
    id: 'p2',
    title: 'titlwwww2222',
    image: 'https://i.pinimg.com/736x/7b/b8/b6/7bb8b64e70d19814b881215aadfcd631.jpg',
    summary: '2222',
    description: 'descriptionnnn22222'
  },
  {
    id: 'p3',
    title: 'titlwwww3333',
    image: 'https://i.pinimg.com/736x/7b/b8/b6/7bb8b64e70d19814b881215aadfcd631.jpg',
    summary: '3333333',
    description: 'descriptionnnn333333'
  }
]


export default function HomePage() {
  return (
    <div>
      <h1>The Home Page</h1>
      <PostList posts={DUMMY_POSTS}/>
    </div>
  );
}
