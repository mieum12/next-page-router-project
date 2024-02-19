import {MongoClient} from "mongodb";

export async function connectToPostCollectionInMongoDB() {
  const url = 'mongodb+srv://qpdlqltb1215:ADriB68N9I2u2KaY@cluster0.trp51w4.mongodb.net/mydatabase?retryWrites=true&w=majority';

  try {
    const client = await MongoClient.connect(url);
    const db = client.db();
    const postsCollection = db.collection('posts');
    return { client, db, postsCollection };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function connectToCommentCollectionInMongoDB() {
  const url = 'mongodb+srv://qpdlqltb1215:ADriB68N9I2u2KaY@cluster0.trp51w4.mongodb.net/mydatabase?retryWrites=true&w=majority';

  try {
    const client = await MongoClient.connect(url);
    const db = client.db();
    const commentsCollection = db.collection('comments');
    return { client, db, commentsCollection };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}