import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity" aria-label="Mind the Gap Home">
      <div className="flex items-center justify-center">
        <Image 
          src="/images/mind-the-gap-logo.png" 
          alt="Mind the Gap Logo" 
          width={40} 
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          priority
        />
      </div>
      <span className="font-headline text-xl sm:text-2xl font-bold tracking-wider text-secondary">
        Mind the Gap
      </span>
    </Link>
  );
}
