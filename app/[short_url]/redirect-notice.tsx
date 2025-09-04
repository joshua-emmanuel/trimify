"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectNotice({ heading }: { heading?: string }) {
  const router = useRouter();

  useEffect(
    function () {
      setTimeout(function () {
        router.push("/");
      }, 2500);
    },
    [router]
  );

  return (
    <main className="min-h-[85vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-slate-900 font-extrabold text-4xl lg:text-5xl tracking-tight dark:text-white ">
          {heading || "Oops! An Error Occurred"}
        </h1>
        <p className="mt-4 mb-8">
          You&apos;ll be redirected to the homepage shortly
        </p>
        <Link href={"/"}>
          <Button>Go back home</Button>
        </Link>
      </div>
    </main>
  );
}
