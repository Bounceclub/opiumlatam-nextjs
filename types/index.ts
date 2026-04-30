export interface Article {
  id: string;
  section: 'noticias' | 'discusion' | 'resenas';
  category?: string;
  title: string;
  excerpt: string;
  body: string;
  author?: string;
  readtime?: string;
  cover?: string | null;
  images?: ArticleMedia[];
  videos?: ArticleMedia[];
  audios?: ArticleMedia[];
  score?: number | null;
  musicEmbed?: string | null;
  musicPlatform?: string | null;
  musicLink?: string | null;
  date: string;
  pinned?: boolean;
}

export interface ArticleMedia {
  type: 'image' | 'video' | 'audio';
  url: string;
  name?: string;
  size?: string;
  caption?: string;
  align?: 'left' | 'center' | 'right';
  embed?: string;
}

export interface Event {
  title: string;
  date: string;
  url?: string;
  venue?: string;
  address?: string;
  flyerUrl?: string;
}

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface NewsletterSubscriber {
  email: string;
  active: boolean;
}
