import { db } from "./firebase";

interface ResultType {
  question: string;
  destination: string[];
  answers: {
    [key: string]: string;
  };
}

const getSavedCommentsContents = async (postId: string, commentIds: string[]) => {
  try {
    const result: ResultType = {
      question: "",
      destination: [],
      answers: {},
    };

    const postDoc = await db.collection("posts").doc(postId).get();
    const postData = postDoc.data();
    if (postData) {
      result["question"] = postData.question;
      result["destination"] = postData.destination;
    }

    await Promise.all(
      commentIds.map(async (commentId: string) => {
        const commentDoc = await db.collection("posts").doc(postId).collection("comments").doc(commentId).get();
        const commentData = commentDoc.data();
        if (commentData) {
          result["answers"][commentId] = commentData.content;
        }
      })
    );

    return result;
  } catch (err) {
    console.error(err);
  }
};

export default getSavedCommentsContents;
