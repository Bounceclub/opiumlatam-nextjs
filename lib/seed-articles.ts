import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function seedArticles() {
  console.log('🌱 Seeding articles to Firebase...');

  const sampleArticles = [
    {
      title: 'Kendrick Lamar anuncia nuevo álbum para 2024',
      excerpt: 'El rapero de Compton revela que está trabajando en material nuevo y promete un sonido revolucionario.',
      body: 'Kendrick Lamar ha confirmado que está trabajando en su próximo álbum de estudio. En una entrevista reciente, el artista mencionó que este proyecto será "algo completamente diferente" a lo que hemos escuchado antes.\n\nFuentes cercanas al artista indican que ha estado colaborando con productores de renombre y que el álbum podría ver la luz en el segundo trimestre de 2024. Los fans están expectantes ante las posibles colaboraciones y el concepto del proyecto.\n\nLamar, quien ganó el Pulitzer por "DAMN.", ha mantenido un perfil relativamente bajo en los últimos años, centrado en proyectos como la banda sonora de "Black Panther".',
      author: 'Redacción',
      section: 'noticias',
      category: 'Música',
      date: new Date('2024-01-15').toISOString(),
      pinned: true,
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
      readtime: '3 min lectura'
    },
    {
      title: 'Bad Bunny rompe récords en Spotify con nuevo single',
      excerpt: 'El artista puertorriqueño alcanza 100 millones de reproducciones en menos de 24 horas.',
      body: 'Bad Bunny ha vuelto a demostrar por qué es uno de los artistas más grandes del mundo. Su nuevo single ha roto múltiples récords en Spotify, alcanzando la cifra de 100 millones de reproducciones en menos de 24 horas.\n\nEl tema, que mezcla reggaeton con elementos de trap y música electrónica, ha sido producido por el mismo equipo detrás de sus éxitos anteriores. Los críticos han elogiado la innovación y la calidad lírica del artista.\n\nEste logro se suma a su impresionante lista de récords, incluyendo ser el artista más escuchado en Spotify por tres años consecutivos.',
      author: 'Redacción',
      section: 'noticias',
      category: 'Reggaeton',
      date: new Date('2024-01-14').toISOString(),
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=450&fit=crop',
      readtime: '2 min lectura'
    },
    {
      title: 'El futuro del trap latino: Análisis de la evolución del género',
      excerpt: 'Exploramos cómo el trap latino ha transformado la música urbana y qué nos depara el futuro.',
      body: 'El trap latino ha experimentado una evolución extraordinaria en la última década. Lo que comenzó como un movimiento underground en Puerto Rico y Colombia se ha convertido en un fenómeno global que domina las listas de reproducción en todo el mundo.\n\nArtistas como Bad Bunny, Anuel AA, Karol G y Rauw Alejandro han llevado el género a nuevas alturas, fusionándolo con otros estilos como el reggaeton, el pop y la música electrónica. Esta hibridación ha creado un sonido único que resuena con audiencias de todas las edades.\n\nEl futuro del trap latino parece prometedor. Con la emergencia de nuevos talentos y la continua innovación en producción, el género seguirá evolucionando y expandiendo sus fronteras.',
      author: 'Carlos Mendoza',
      section: 'discusion',
      category: 'Análisis',
      date: new Date('2024-01-13').toISOString(),
      readtime: '5 min lectura'
    },
    {
      title: 'Reseña: "Un Verano Sin Ti" de Bad Bunny',
      excerpt: 'Un análisis profundo del álbum que definió el verano de 2022 y consolidó a Bad Bunny como superstar global.',
      body: '"Un Verano Sin Ti" es más que un álbum; es un fenómeno cultural. Bad Bunny logró lo que pocos artistas han conseguido: crear un proyecto que define una época y trasciende fronteras lingüísticas y culturales.\n\nEl álbum de 23 pistas es un viaje musical que explora el amor, el desamor, la celebración y la melancolía. Desde el reggaeton clásico hasta el bossa nova, Bad Bunny demuestra su versatilidad y su dominio de múltiples géneros.\n\nProducciones como "Me Porto Bonito", "Tití Me Preguntó" y "Después de la Playa" se han convertido en himnos de una generación. La producción impecable y la lírica honesta y cruda hacen de este álbum una obra maestra del género urbano.',
      author: 'María González',
      section: 'resenas',
      category: 'Álbum',
      date: new Date('2024-01-12').toISOString(),
      score: 9.5,
      readtime: '6 min lectura'
    },
    {
      title: 'Travis Scott anuncia gira mundial 2024',
      excerpt: 'El rapero de Houston confirmó fechas para su nueva gira que incluirá ciudades de Latinoamérica.',
      body: 'Travis Scott ha anunciado oficialmente su gira mundial 2024, que incluirá por primera vez varias ciudades de Latinoamérica. La gira, titulada "Utopia Tour", promete ser una experiencia visual y musical sin precedentes.\n\nLas fechas confirmadas incluyen México City, Buenos Aires, São Paulo, Santiago y Bogotá. Los boletos se agotaron en cuestión de minutos en la mayoría de las ciudades, demostrando la inmensa popularidad del artista en la región.\n\nScott promete un show con producción de última generación, incluyendo efectos visuales innovadores y una experiencia inmersiva que complementará su último álbum "Utopia".',
      author: 'Redacción',
      section: 'noticias',
      category: 'Conciertos',
      date: new Date('2024-01-11').toISOString(),
      cover: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=450&fit=crop',
      readtime: '3 min lectura'
    },
    {
      title: 'El impacto del streaming en la industria musical latina',
      excerpt: 'Cómo plataformas como Spotify y Apple Music han transformado la forma en que consumimos música latina.',
      body: 'El streaming ha revolucionado la industria musical a nivel global, y el mercado latino no es la excepción. Plataformas como Spotify, Apple Music y YouTube Music han democratizado el acceso a la música y han abierto nuevas oportunidades para artistas latinoamericanos.\n\nAntes del streaming, los artistas latinoamericanos enfrentaban barreras significativas para llegar a audiencias internacionales. Hoy, un artista puede ganar millones de seguidores sin el respaldo de una discográfica tradicional.\n\nSin embargo, el streaming también presenta desafíos. Las bajas tarifas de pago por reproducción han generado debates sobre la sostenibilidad económica de los artistas. A pesar de esto, el streaming sigue siendo la principal fuente de ingresos para la mayoría de los músicos.',
      author: 'Ana Rodríguez',
      section: 'discusion',
      category: 'Industria',
      date: new Date('2024-01-10').toISOString(),
      readtime: '7 min lectura'
    },
    {
      title: 'Reseña: "El Madrileño" de C. Tangana',
      excerpt: 'Una obra maestra del rap español que fusiona flamenco, salsa y hip-hop en una propuesta única.',
      body: '"El Madrileño" es, sin duda, uno de los álbumes más importantes del rap español de la última década. C. Tangana logra lo que parecía imposible: fusionar el flamenco, la salsa, el bolero y el hip-hop en un proyecto coherente y revolucionario.\n\nDesde la opening track "Demasiado Amor" hasta el cierre con "Nominao", el álbum es un viaje musical que explora la identidad, el amor y la cultura española. Colaboraciones con artistas como Andrés Calamaro, Kiko Veneno y Nathy Peluso elevan el proyecto a nuevas alturas.\n\nLa producción es impecable, con arreglos de cuerdas, metales y percusiones que crean un sonido rico y texturizado. La lírica, como siempre en C. Tangana, es inteligente, provocadora y profundamente personal.',
      author: 'Pedro Sánchez',
      section: 'resenas',
      category: 'Álbum',
      date: new Date('2024-01-09').toISOString(),
      score: 9.8,
      readtime: '8 min lectura'
    },
    {
      title: 'Karol G lanza nuevo álbum "Mañana Será Bonito"',
      excerpt: 'La cantante colombiana presenta su cuarto álbum de estudio con colaboraciones de lujo.',
      body: 'Karol G ha lanzado su esperado cuarto álbum de estudio, "Mañana Será Bonito". El proyecto de 17 pistas incluye colaboraciones con artistas como Romeo Santos, Shakira y Bad Bunny.\n\nEl álbum explora temas de amor, empoderamiento femenino y superación. Karol G demuestra su evolución como artista, mostrando una madurez lírica y musical que la consolida como una de las voces más importantes del género urbano.\n\nSingles como "Mientras Me Curo del Cora" y "Qlona" ya se han convertido en éxitos mundiales, acumulando miles de millones de reproducciones en plataformas de streaming.',
      author: 'Redacción',
      section: 'noticias',
      category: 'Música',
      date: new Date('2024-01-08').toISOString(),
      cover: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=450&fit=crop',
      readtime: '4 min lectura'
    }
  ];

  try {
    for (const article of sampleArticles) {
      await addDoc(collection(db, 'articles'), {
        ...article,
        createdAt: serverTimestamp(),
        likes: 0
      });
      console.log(`✅ Added: ${article.title}`);
    }

    console.log(`\n🎉 Successfully seeded ${sampleArticles.length} articles!`);
    return { success: true, count: sampleArticles.length };
  } catch (error) {
    console.error('❌ Error seeding articles:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
