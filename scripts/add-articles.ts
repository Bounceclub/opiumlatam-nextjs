import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const articles = [
  {
    title: 'Kendrick Lamar anuncia nuevo álbum para 2024',
    excerpt: 'El rapero de Compton revela que está trabajando en material nuevo y promete un sonido revolucionario.',
    body: 'Kendrick Lamar ha confirmado que está trabajando en su próximo álbum de estudio. En una entrevista reciente, el artista mencionó que este proyecto será "algo completamente diferente" a lo que hemos escuchado antes.\n\nFuentes cercanas al artista indican que ha estado colaborando con productores de renombre y que el álbum podría ver la luz en el segundo trimestre de 2024.',
    author: 'Redacción',
    section: 'noticias',
    category: 'Música',
    date: '2024-01-15T10:00:00.000Z',
    pinned: true,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
    readtime: '3 min lectura'
  },
  {
    title: 'Bad Bunny rompe récords en Spotify con nuevo single',
    excerpt: 'El artista puertorriqueño alcanza 100 millones de reproducciones en menos de 24 horas.',
    body: 'Bad Bunny ha vuelto a demostrar por qué es uno de los artistas más grandes del mundo. Su nuevo single ha roto múltiples récords en Spotify, alcanzando la cifra de 100 millones de reproducciones en menos de 24 horas.',
    author: 'Redacción',
    section: 'noticias',
    category: 'Reggaeton',
    date: '2024-01-14T10:00:00.000Z',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=450&fit=crop',
    readtime: '2 min lectura'
  },
  {
    title: 'El futuro del trap latino: Análisis de la evolución del género',
    excerpt: 'Exploramos cómo el trap latino ha transformado la música urbana y qué nos depara el futuro.',
    body: 'El trap latino ha experimentado una evolución extraordinaria en la última década. Lo que comenzó como un movimiento underground en Puerto Rico y Colombia se ha convertido en un fenómeno global que domina las listas de reproducción en todo el mundo.',
    author: 'Carlos Mendoza',
    section: 'discusion',
    category: 'Análisis',
    date: '2024-01-13T10:00:00.000Z',
    readtime: '5 min lectura'
  },
  {
    title: 'Reseña: "Un Verano Sin Ti" de Bad Bunny',
    excerpt: 'Un análisis profundo del álbum que definió el verano de 2022 y consolidó a Bad Bunny como superstar global.',
    body: '"Un Verano Sin Ti" es más que un álbum; es un fenómeno cultural. Bad Bunny logró lo que pocos artistas han conseguido: crear un proyecto que define una época y trasciende fronteras lingüísticas y culturales.',
    author: 'María González',
    section: 'resenas',
    category: 'Álbum',
    date: '2024-01-12T10:00:00.000Z',
    score: 9.5,
    readtime: '6 min lectura'
  },
  {
    title: 'Travis Scott anuncia gira mundial 2024',
    excerpt: 'El rapero de Houston confirmó fechas para su nueva gira que incluirá ciudades de Latinoamérica.',
    body: 'Travis Scott ha anunciado oficialmente su gira mundial 2024, que incluirá por primera vez varias ciudades de Latinoamérica. La gira, titulada "Utopia Tour", promete ser una experiencia visual y musical sin precedentes.',
    author: 'Redacción',
    section: 'noticias',
    category: 'Conciertos',
    date: '2024-01-11T10:00:00.000Z',
    cover: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=450&fit=crop',
    readtime: '3 min lectura'
  }
];

async function addArticles() {
  console.log('Adding articles to Firebase...');

  for (const article of articles) {
    try {
      await addDoc(collection(db, 'articles'), {
        ...article,
        createdAt: serverTimestamp(),
        likes: 0
      });
      console.log(`✅ Added: ${article.title}`);
    } catch (error) {
      console.error(`❌ Error adding ${article.title}:`, error);
    }
  }

  console.log('Done!');
}

addArticles().catch(console.error);
