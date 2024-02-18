// /api/new-post

import {MongoClient} from "mongodb";

export default async function handler(req, res) {

  if (req.method === 'POST') {
    // 1. 요청을 받아들이고 데이터베이스에 저장
    // req 객체에는 헤더와 요청 본문이 들어감
    const data = req.body
    const { title, image, summary, description } = data
    const url = 'mongodb+srv://qpdlqltb1215:ADriB68N9I2u2KaY@cluster0.trp51w4.mongodb.net/mydatabase?retryWrites=true&w=majority'
    const client = await MongoClient.connect(url)
    const db = client.db()
    const postsCollection = db.collection('posts')

    // 컬렉션에 새 문서 삽입하기
    // result는 객체로 자동 생성된 id가 해당될 것
    const result = await postsCollection.insertOne(data)
    console.log(result)

    // 2. response를 다시 전송
    res.status(201).json({ message: 'Post inserted!'})
  }
}
