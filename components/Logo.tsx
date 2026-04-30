import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/Logo.png"
        alt="OpiumLATAM"
        width={160}
        height={42}
        className="h-10 w-auto max-w-[160px] opacity-90 transition-opacity hover:opacity-100"
        priority
      />
    </div>
  );
}
