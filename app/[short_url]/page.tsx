import { getUrl } from "@/utils/utils";
import { redirect } from "next/navigation";
import RedirectErrorPage from "./redirect-error";

type UrlType = {
  original_url: string;
};

export default async function RedirectPage({
  params,
}: {
  params: { short_url: string };
}) {
  const { short_url } = params;
  const baseUrl = getUrl();

  try {
    const response = await fetch(
      `${baseUrl}/api/shorten?short_url=${short_url}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return <RedirectErrorPage heading="404! Short Url Not Found" />;
      }
      return <RedirectErrorPage />;
    }

    const data: UrlType = await response.json();
    redirect(data.original_url);
  } catch (error: any) {
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    return <RedirectErrorPage />;
  }
}
