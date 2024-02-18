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


export default function HomePage(props) {
  return (
    <div>
        <PostList posts={props.posts}/>
    </div>
  );
}

// next가 사전 랜더링 시 해당 함수를 실핼하게 된다
// 컴포넌트 함수를 호출하기 전에 getStaticProps을 먼저 호출하게 된다
// 비동기식으로 설정할 수 있어서 유용하다
// 넥스트가 해당 프로미스의 수향을 기다린다는 점이 중요
// ✨ 즉 데이터가 로딩될때까지 기다렸다가 이 컴포넌트 함수를 위한 프로퍼티를 반환한다
// 그러면 컴포넌트 함수가 실행되기 전 데이터를 로딩할 수 있고
// 필요한 데이터가 포함된 상태로 컴포넌트가 랜더링 된다
// 서버 사이드, 정확하게는 빌드 프로세스에서 데이터를 가져오는 것이다.

// 문제점
// - 데이터가 오래되었을 경우
// 재구축하고 배포할 수는 있다 -> 번거로움
// revalidate에 넣은 숫자만큼 빌드 프로세스중 대기한 뒤 해당 페이지가 생성
// 10: 요청이 있을때 최소 10초마다 해당 페이지가 재생성된다
// 데이터가 변했다고 재배포를 하거나 재구축을 할 필요가 없어진다


export async function getStaticProps() {
  // fetch data from an API

  // 항상 객체를 반환하는 것이 중요하다
  return {
    // props는 이 페이지 컴포넌트에 대한 props이다
    props: {
      posts: DUMMY_POSTS
    },
    revalidate: 1
  }

}