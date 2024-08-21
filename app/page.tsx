import Header from '@/components/header';
import Footer from '@/components/footer';
import ShortLinkForm from '@/app/(homepage)/_components/short-link-form';
import { createClient } from '@/utils/supabase/server';
import { shortenUrl } from '@/app/(homepage)/actions';

export default async function HomePage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  return (
    <>
      <div className="xl:container mx-auto px-6">
        <Header user={user} />
        <main className="min-h-[85vh]">
          <section className="pt-20">
            <div className="text-center">
              <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight dark:text-white ">
                Shorten. Share. Simplify
              </h1>
              <p className="max-w-lg mx-auto mt-4 mb-8">
                Cut the clutter with Trimify — your go-to tool for turning long
                URLs into sleek, shareable links, perfect for any platform.
              </p>
            </div>
            <div>
              <ShortLinkForm shortenUrl={shortenUrl} />
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
