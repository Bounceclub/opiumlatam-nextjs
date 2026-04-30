import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export function useArticleLikes(articleId: string) {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!articleId) {
      setLoading(false);
      return;
    }

    const articleRef = doc(db, 'articles', articleId);

    const unsubscribe = onSnapshot(
      articleRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLikes(data.likes?.length || 0);

          // Check if current user liked
          const userId = auth.currentUser?.uid;
          if (userId && data.likes) {
            setIsLiked(data.likes.includes(userId));
          }
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching likes:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [articleId]);

  const toggleLike = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      // User not logged in - you might want to show a login prompt
      return;
    }

    try {
      const articleRef = doc(db, 'articles', articleId);
      const articleSnap = await getDoc(articleRef);

      if (!articleSnap.exists()) return;

      const currentLikes = articleSnap.data().likes || [];

      if (currentLikes.includes(userId)) {
        // Unlike
        await updateDoc(articleRef, {
          likes: arrayRemove(userId),
        });
        setIsLiked(false);
      } else {
        // Like
        await updateDoc(articleRef, {
          likes: arrayUnion(userId),
        });
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return { likes, isLiked, loading, toggleLike };
}
