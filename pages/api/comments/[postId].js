import {connectDatabase, getAllDocuments, insertDocument} from "@/lib/connectToDB";

export default async function handler(req, res) {
  const postId = req.query.postId
  const client = await connectDatabase()


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

    let result;
    try {
      result = await insertDocument(client, 'comments', NewComment)
      // result에서는 자동으로 고유 id(insertedId)도 생성해준다
      // db에 저장한 NewComment객테에 id 필드를 추가하고 위 id와 동일하게 설정해준다
      NewComment._id = result.insertedId
      res.status(201).json({ message: 'Added comment!!', comment: NewComment })
    } catch (e) {
      res.status(500).json({message: 'Inserting Comment failed!'})
    }

  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', {_id: -1})
      res.status(200).json({comments: documents})
    } catch (e) {
      res.status(500).json({message: 'Getting Comments failed!'})
    }
  }
}