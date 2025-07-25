import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label="Mind the Gap Home">
      <div className="flex items-center justify-center">
        <div className="relative flex items-center justify-center w-10 h-10">
          <div className="absolute w-10 h-10 rounded-full bg-primary" />
          <div className="absolute w-8 h-2 bg-background" />
        </div>
      </div>
      <span className="font-headline text-2xl font-bold tracking-wider text-secondary">
        Mind the Gap
      </span>
    </Link>
  );
}
