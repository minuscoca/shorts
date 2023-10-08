"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pages, type Pathname } from "@/app/redux/slices/app-slice";
import { cn } from "@/app/libs/utils";

export default function Header() {
  return (
    <header className="absolute z-50 top-0 left-0 right-0 flex justify-between p-4">
      <div />
      <nav className="flex">
        <NavigationTab title="Following" href={Pages.following} />
        <NavigationTab title="For You" href={Pages.foryou} />
      </nav>
      <div />
    </header>
  );
}

function NavigationTab({ title, href }: { title: string; href: Pathname }) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href === Pages.foryou && pathname === "/"); // home page is identical to for you page

  return (
    <div className="relative">
      <Link
        className={cn("px-4 py-2 tracking-wider opacity-50 font-normal", {
          "opacity-100 font-bold": isActive,
        })}
        href={href}
      >
        {title}
      </Link>
      <span
        className={cn(
          "absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-sm bg-white", {
          "opacity-0": !isActive,
        },
        )}
      />
    </div>
  );
}
