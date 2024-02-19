// /api/new-post
import {connectToPostCollectionInMongoDB} from "@/lib/connectToDB";

export default async function handler(req, res) {

  if (req.method === 'POST') {
    // 1. 요청을 받아들이고 데이터베이스에 저장
    // req 객체에는 헤더와 요청 본문이 들어감
    const data = req.body
    const { client, postsCollection } = await connectToPostCollectionInMongoDB();
    // 컬렉션에 새 문서 삽입하기
    // result는 객체로 자동 생성된 id가 해당될 것
    const result = await postsCollection.insertOne(data)
    console.log(result)

    await client.close()

    // 2. response를 다시 전송
    res.status(201).json({ message: 'Post inserted!'})
  }
}
