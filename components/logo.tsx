import { ScissorsLineDashed } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-2 font-black text-slate-900 text-lg md:text-2xl tracking-tight dark:text-white"
    >
      <ScissorsLineDashed className="h-6 w-6" />
      <span className="">Trimify</span>
    </Link>
  );
}
