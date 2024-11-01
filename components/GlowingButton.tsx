import Link from "next/link";
import { Play } from "lucide-react";

type GlowingButtonProps = {
  href: string;
  children: React.ReactNode;
};

export default function GlowingButton({ href, children }: GlowingButtonProps) {
  return (
    <Link href={href} className="inline-block">
      <button className="group relative inline-flex h-14 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-[#7a47ff] focus:ring-offset-2 focus:ring-offset-[#0b000c]">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f85eff_0%,#7a47ff_33%,#408cff_67%,#f85eff_100%)]" />
        <span className="absolute inset-0 rounded-full bg-[#0b000c]/80 blur-sm transition-all duration-300 group-hover:bg-[#0b000c]/70 group-hover:blur-md" />
        <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0b000c] px-4 py-1 text-sm font-medium text-white transition-all duration-300 group-hover:bg-[#1a0f1b]">
          <Play className="mr-2 w-6 h-6 md:w-7 md:h-7 flex-shrink-0" />
          <span className="whitespace-nowrap">{children}</span>
        </span>
      </button>
    </Link>
  );
}