export default function handler(req, res) {
  const postId = req.query.postId

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
    console.log(email, name, text)

    // 새로운 객체를 만들어 반환
    const NewComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    }
    console.log('📍',NewComment)

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