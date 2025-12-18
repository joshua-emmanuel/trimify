import { getUrl } from "@/utils/utils";
import { redirect } from "next/navigation";
import RedirectErrorPage from "./redirect-error";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

type UrlType = {
  original_url: string;
};

export default async function RedirectPage({
  params,
}: {
  params: { short_url: string };
}) {
  const { short_url } = params;
  const headersList = headers();

  const ipAddress = headersList.get("x-forwarded-for");
  const city = headersList.get("x-vercel-ip-city");
  const country = headersList.get("x-vercel-ip-country");

  const supabase = createClient();

  try {
    const { data: urlData, error } = await supabase
      .from("links")
      .select("*")
      .eq("short_url", short_url)
      .single();

    if (error || !urlData) {
      return <RedirectErrorPage heading="404! Short Url Not Found" />;
    }

    await supabase
      .from("links")
      .update({
        last_accessed_ip: ipAddress,
        last_accessed_city: city,
        last_accessed_country: country,
        click_count: (urlData.click_count || 0) + 1,
        last_accessed_at: new Date().toLocaleTimeString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      })
      .eq("short_url", short_url);

    redirect(urlData.original_url);
  } catch (error: any) {
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    return <RedirectErrorPage />;
  }
}
