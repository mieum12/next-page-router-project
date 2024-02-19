import {connectToCommentCollectionInMongoDB} from "@/lib/connectToDB";

export default async function handler(req, res) {
  const postId = req.query.postId
  const {client, db, commentsCollection} = await connectToCommentCollectionInMongoDB()

  if (req.method === 'POST') {
    const { email, name, text } = req.body
    // 서버사이드 유효성 검사 추가
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({message: 'Invalid Input!!'})
      return;
    }

    // 새로운 객체를 만들어 반환
    const NewComment = {
      email,
      name,
      text,
      postId,
    }
    console.log('📍',NewComment)

    const result = await commentsCollection.insertOne(NewComment)
    // result에서는 자동으로 고유 id(insertedId)도 생성해준다
    // db에 저장한 NewComment객테에 id 필드를 추가하고 위 id와 동일하게 설정해준다
    NewComment.id = result.insertedId

    console.log(result,'💙')

    res.status(201).json({ message: 'Added commnent!!', comment: NewComment })
  }
  if (req.method === 'GET') {
    const dummyList = [
      {id: 'c1', name: 'jiwon', text: '1st comment!!'},
      {id: 'c2', name: 'qqjiwon', text: '2st comment!!'},
      {id: 'c3', name: 'ffjiwon', text: '3st comment!!'},
    ]

    res.status(200).json({comments: dummyList})
  }
}