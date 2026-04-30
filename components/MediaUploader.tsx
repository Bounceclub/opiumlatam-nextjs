'use client';

import { useState, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { Upload, X, Image as ImageIcon, Video, Music } from 'lucide-react';

interface MediaUploaderProps {
  onMediaAdd: (media: { type: 'image' | 'video' | 'audio'; url: string; name?: string; caption?: string }) => void;
  maxFiles?: number;
  acceptedTypes?: 'image' | 'video' | 'audio' | 'all';
}

export default function MediaUploader({ onMediaAdd, maxFiles = 10, acceptedTypes = 'all' }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAcceptedTypes = () => {
    switch (acceptedTypes) {
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      case 'audio':
        return 'audio/*';
      default:
        return 'image/*,video/*,audio/*';
    }
  };

  const getMediaType = (file: File): 'image' | 'video' | 'audio' | null => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    return null;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const mediaType = getMediaType(file);

      if (!mediaType) continue;

      try {
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name}`;
        const storagePath = mediaType === 'image' ? `articles/${fileName}` :
                           mediaType === 'video' ? `videos/${fileName}` :
                           `audios/${fileName}`;

        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        onMediaAdd({
          type: mediaType,
          url,
          name: file.name,
        });

        setProgress(((i + 1) / files.length) * 100);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    setUploading(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-6 text-center hover:border-[var(--acc)] transition-colors">
      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptedTypes()}
        multiple
        onChange={handleFileSelect}
        disabled={uploading}
        className="hidden"
      />

      {uploading ? (
        <div className="space-y-2">
          <div className="w-full bg-[var(--bg3)] rounded-full h-2">
            <div
              className="bg-[var(--acc)] h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-barlow-condensed text-xs font-bold tracking-widest uppercase text-[var(--text3)]">
            Subiendo... {Math.round(progress)}%
          </p>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-2 mx-auto cursor-pointer border-none bg-transparent"
        >
          <Upload size={32} className="text-[var(--text3)]" />
          <span className="font-barlow-condensed text-sm font-bold tracking-widest uppercase text-[var(--text2)]">
            Subir {acceptedTypes === 'all' ? 'archivos' : acceptedTypes}
          </span>
          <span className="font-barlow-condensed text-xs font-semibold tracking-widest uppercase text-[var(--text3)]">
            {acceptedTypes === 'all' ? 'Imágenes, videos o audios' : ''}
          </span>
        </button>
      )}
    </div>
  );
}
