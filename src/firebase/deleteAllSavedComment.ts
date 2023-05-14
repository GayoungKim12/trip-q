import { db } from "./firebase";

const deleteAllSavedComment = async (commentId: string) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const batch = db.batch();
    const promises: Promise<void>[] = [];

    usersSnapshot.forEach((userDoc) => {
      const saveCommentsRef = userDoc.ref.collection("saveComments");

      promises.push(
        saveCommentsRef.get().then((saveCommentsSnapshot) => {
          saveCommentsSnapshot.forEach((saveCommentDoc) => {
            const postId = saveCommentDoc.id;
            const comments = saveCommentDoc.data().comments;

            if (comments.includes(commentId)) {
              const saveCommentDocRef = saveCommentsRef.doc(postId);
              const size = saveCommentDoc.data().size;

              if (size === 1) {
                batch.delete(saveCommentDocRef);
              } else {
                const updatedComments = comments.filter((cid: string) => cid !== commentId);
                batch.update(saveCommentDocRef, { comments: updatedComments, size: size - 1 });
              }
            }
          });
        })
      );
    });

    // Wait for all the promises to resolve
    await Promise.all(promises);

    // Commit the batch
    await batch.commit();
  } catch (error) {
    console.error(error);
  }
};

export default deleteAllSavedComment;
