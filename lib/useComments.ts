import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export interface Comment {
  id: string;
  articleId: string;
  uid: string;
  author: string;
  text: string;
  createdAt: any;
}

export function useComments(articleId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!articleId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'comments'),
      where('articleId', '==', articleId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const commentsData = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }) as Comment)
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || new Date(a.createdAt).getTime();
            const bTime = b.createdAt?.toMillis?.() || new Date(b.createdAt).getTime();
            return bTime - aTime;
          });
        setComments(commentsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [articleId]);

  const addComment = async (text: string) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Debes iniciar sesión para comentar');
    }

    if (!text || text.trim().length === 0) {
      throw new Error('El comentario no puede estar vacío');
    }

    if (text.length > 1000) {
      throw new Error('El comentario no puede tener más de 1000 caracteres');
    }

    try {
      await addDoc(collection(db, 'comments'), {
        articleId,
        uid: user.uid,
        author: user.displayName || user.email || 'Anónimo',
        text: text.trim(),
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const deleteComment = async (commentId: string) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Debes iniciar sesión para eliminar comentarios');
    }

    try {
      await deleteDoc(doc(db, 'comments', commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };

  return { comments, loading, addComment, deleteComment };
}
