import {connectToCommentCollectionInMongoDB} from "@/lib/connectToDB";

export default async function handler(req, res) {
  const postId = req.query.postId
  const { commentsCollection} = await connectToCommentCollectionInMongoDB()

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

    res.status(201).json({ message: 'Added comment!!', comment: NewComment })
  }
  if (req.method === 'GET') {
    const documents = await commentsCollection
      .find()
      .sort({ _id: -1 }) // id 내림차순 정렬, 최신 댓글이 첫 댓글이 되게
      .toArray()

    res.status(200).json({comments: documents})
  }
}