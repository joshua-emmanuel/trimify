import Footer from "@/components/footer";
import Header from "@/components/header";
import { createClient } from "@/utils/supabase/server";
import RedirectNotice from "./redirect-notice";

export default async function RedirectErrorPage({
  heading,
}: {
  heading?: string;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="xl:container mx-auto px-6">
      <Header user={user} />
      <RedirectNotice heading={heading} />
      <Footer />
    </div>
  );
}
