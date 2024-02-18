import PostDetail from "@/components/posts/PostDetail";

export default function PostDetails() {
  return (
    <PostDetail
      image='https://i.pinimg.com/564x/b6/49/aa/b649aa1f8a5393e6b41f5a2fa5479ad4.jpg'
      id='p1'
      title='first post'
      summary='summaryyyy'
      description='this is descriptionnnnn'
    />
  )
}

// getStaticProps가 사전 랜더링 시 실행된다는 점을 생각해보면
// 그 말은 곧 next가, 페이지가 지원하는 모든 id에 대해 사전에
// 해당 동적 페이지의 모든 버전을 사전생성해야한다는 것이다
// 어떤 id 값에 대해 페이지가 사전 생성되어야하는지 알아야한다
// 그렇지 않으면 해당 페이지를 사전 생성할 수 없다
// 따라서 런타임 중 사용자가 입력할 수 있는 모든 postId 값의 url에 대한 페이지가 사전 생성되어야한다
// 만약 사전 생성된 id를 url에 입력한 경우 사용자에게 404 보여줌
// 이 원리에 따라 getStaticPaths을 추가한다
export async function getStaticPaths() {
  return {
    // fallback은 지원하는 매개변수 값이 모두 있는지, 일부만 있는지 알려준다
    // false 이면 paths가 지원하는 모든 postId값이 있다는 뜻
    // 가령 m5같이 없는 것을 입력하면 404가 뜬다
    // true이면 입력 요청에 따라 넥스트가 동적으로 해당 postId에 대한 페이지를 서버에 생성
    // fallback은 특정 id값에 대해 일부 페이지만 사전생성할 수 있는 기능이다
    // ✨즉, 사용자들의 방문이 가장 잦은 페이지만 사전 생성하고
    // 나머지는 요청이 입력되었을 때 동적으로 사전 생성하도록 함
    fallback: false,
    // 동적 페이지의 버전마다 하나의 객체 필요
    paths: [

      {
        params: {
          postId: 'p1'
        }
      },
      {
        params: {
          postId: 'p2'
        }
      },
      {
        params: {
          postId: 'p3'
        }
      },

    ]
  }
}
export async function getStaticProps(context){
  // 하나의 포스트를 fetching 함

  // 이 함수 내에서는 useRoute를 쓸 수 없음
  // params는 대괄호로 감싼 식별자(postId)를 알 수 있고, url에 부호화된 실제 값을 갖는다
  const postId = context.params.postId
  console.log(postId)

  return {
    props: {
      postData: {
        image:'https://i.pinimg.com/564x/b6/49/aa/b649aa1f8a5393e6b41f5a2fa5479ad4.jpg',
        id: postId,
        title:'first post',
        summary:'summaryyyy',
        description:'this is descriptionnnnn'
      }
    }
  }
}