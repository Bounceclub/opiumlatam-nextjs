// Simple HTML sanitization to prevent XSS attacks
const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre',
];

const ALLOWED_ATTRIBUTES = {
  a: ['href', 'title', 'target'],
  img: ['src', 'alt', 'width', 'height'],
};

export function sanitizeHTML(html: string): string {
  // Remove script tags and on* attributes
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')
    .replace(/javascript:/gi, '');

  // Remove iframe tags except for allowed domains
  const allowedIframeDomains = ['youtube.com', 'soundcloud.com', 'spotify.com', 'music.apple.com'];
  sanitized = sanitized.replace(/<iframe\b[^>]*>/gi, (match) => {
    const srcMatch = match.match(/src=["']([^"']+)["']/i);
    if (srcMatch) {
      const src = srcMatch[1];
      const isAllowed = allowedIframeDomains.some(domain => src.includes(domain));
      if (isAllowed) {
        return match;
      }
    }
    return '';
  });

  return sanitized;
}

export function sanitizeText(text: string): string {
  // Escape HTML entities
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

export function validateArticleData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string' || data.title.length > 200) {
    errors.push('Título inválido (máximo 200 caracteres)');
  }

  if (!data.section || !['noticias', 'discusion', 'resenas'].includes(data.section)) {
    errors.push('Sección inválida');
  }

  if (data.excerpt && data.excerpt.length > 400) {
    errors.push('Extracto demasiado largo (máximo 400 caracteres)');
  }

  if (data.category && data.category.length > 80) {
    errors.push('Categoría demasiado larga (máximo 80 caracteres)');
  }

  if (data.author && data.author.length > 100) {
    errors.push('Autor demasiado largo (máximo 100 caracteres)');
  }

  if (data.score && (data.score < 1 || data.score > 10)) {
    errors.push('Puntuación debe estar entre 1 y 10');
  }

  // Sanitize body
  if (data.body) {
    data.body = sanitizeHTML(data.body);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
