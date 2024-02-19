import PostList from "@/components/posts/PostList";
import {connectToPostCollection} from "@/lib/connectToDB";
import {Fragment} from "react";
import Head from "next/head";

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Jiwon&apos;s Blog</title>
        <meta
          name='description'
          content='personal blog!'
        />
      </Head>
        <PostList posts={props.posts}/>
    </Fragment>
  );
}

// [1️⃣getStaticProps]
// next가 사전 랜더링 시 해당 함수를 실행하게 된다
// 컴포넌트 함수를 호출하기 전에 getStaticProps을 먼저 호출하게 된다
// 비동기식으로 설정할 수 있어서 유용하다
// 넥스트가 해당 프로미스의 수향을 기다린다는 점이 중요
// ✨ 즉 데이터가 로딩될때까지 기다렸다가 이 컴포넌트 함수를 위한 프로퍼티를 반환한다
// 그러면 컴포넌트 함수가 실행되기 전 데이터를 로딩할 수 있고
// 필요한 데이터가 포함된 상태로 컴포넌트가 랜더링 된다
// 서버 사이드, 정확하게는 빌드 프로세스에서 데이터를 가져오는 것이다.
// HTML파일을 사전에 생성하는데 해당 파일은 CDN을 통해 저장되고 서버로 나간다
// 페이지의 속도가 빨라진다, 페이지를 매번 재생성하지 않고 캐시로 남기거나 다시 사용 가능
// 캐싱의 장점도 이용할 수 있고 불필요한 페이지를 몇번씩 사전 생성하는 일도 피할 수 있다.
// 문제점
// - 데이터가 오래되었을 경우
// 재구축하고 배포할 수는 있다 -> 번거로움
// revalidate에 넣은 숫자만큼 빌드 프로세스중 대기한 뒤 해당 페이지가 생성
// ex. 10: 요청이 있을때 최소 10초마다 해당 페이지가 재생성된다
// 데이터가 변했다고 재배포를 하거나 재구축을 할 필요가 없어진다
export async function getStaticProps() {
  // [fetch data from an API]
  // fetch('/api/post') 이렇게 요청을 보낼 수도 있다
  // 여기서 자체 API 앤드포인트로 요청을 보내는 것은 중복된다
  // 서버나 빌드때만 실행되는 코드들이다, 클라이언트에 노출되는 코드들이 아니다
  // 따라서 여기에 모든 포스트를 가져오려면 getStaticProps에 바로 코드를 작성하거나
  // 여기서 실행할 헬퍼 함수를 작성할 수도 있다
  // 따라서 자체 API라우트로 요청을 보낼 필요가 없다
  // 불필요한 추가요청을 피할 수 있다

  // 이 부분은 따로 빼서 쓸 수도 있지만 일단 사용
  const { client, postsCollection } = await connectToPostCollection();
  const posts = await postsCollection.find().toArray()
  await client.close()
  // 항상 객체를 반환하는 것이 중요하다
  return {
    // props는 이 페이지 컴포넌트에 대한 props이다
    props: {
      posts: posts.map(post => ({
        title: post.title,
        summary: post.summary,
        image: post.image,
        description: post.description,
        id: post._id.toString(),
      }))
    },
    revalidate: 1
  }

}

// [2️⃣getServerSideProps]
// 서버에 배포한 후 바로 동적으로 페이지를 사전생성해야할 떄가 있다
// 빌드 프로세스 중이라거나, 몇초마다가 아닌 모든 요청에 대해서 말이다
// 이럴 경우 getServerSideProps라는 방법도 있다
// getStaticProps와의 차이는 빌드 중 실행되지 않는다는 점
// 대신 이 함수는 배포 후 상시 서버 상에 존재한다
// 매 요청에 대해 실행된다는 점이 단점이 될 수도 있다
// 매 요청마다 페이지 생성을 기다려야한다는 말과 같다
// req 객체에 대한 엑세스, 즉 인증에 대한 엑세스가 없다면 getStaticProps가 나을 수 있다
// 즉, 구체적인 req 객체에 대한 엑세스가 있을 떄, 데이터가 몇초마다 바뀌는 경우에만 사용하는 편이다
// export async function getServerSideProps(context) {
//   // 서버측에서만 실행된다
//   const req = context.req
//   const res = context.res
//   // req, res에 접근할 수 있기때문에 인증이나 세션 쿠키를 확인할수있다
//   return {
//     // props는 이 페이지 컴포넌트에 대한 props이다
//     props: {
//       posts: DUMMY_POSTS
//     }
//   }
// }