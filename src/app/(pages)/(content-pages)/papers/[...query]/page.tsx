import { getPapers } from "@/app/actions/papers";
import { SearchResponse } from "./types";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Rocket } from "lucide-react";

import { PapersList } from "@/components";
import Link from "next/link";

export default async function Papers({
  params,
  searchParams,
}: {
  params: { query: string };
  searchParams: { [key: string]: string };
}) {
  const query = params.query;
  const page = searchParams.page;

  const response: SearchResponse = await getPapers(query, page);

  function morePage(page: string | number | undefined = 1) {
    if (!page) {
      return 1;
    }
    return Number(page) + 1;
  }

  if (!response) return null;

  const { data: papers, total } = response;

  return (
    <main className="flex flex-col  gap-6 container mx-auto py-10 ">
      {total !== undefined && (
        <Alert className="flex justify-between items-center">
          <AlertTitle className="flex items-center gap-4">
            <Rocket className="h-4 w-4 text-primary" />
            <span className="flex items-center gap-3 text-zinc-700">
              <span className="text-blue-700 font-semibold">
                {papers?.length ? papers.length : 0}
              </span>{" "}
              relevant papers from a total of
              <span className="text-blue-700 font-semibold">{total}</span>
            </span>
          </AlertTitle>
        </Alert>
      )}

      {papers && <PapersList papers={papers} />}

      {total !== 0 && (
        <Link
          href={`/papers/${query}?page=${morePage(page)}`}
          className="h-11 w-3/4 flex mx-auto justify-center items-center bg-primary rounded-lg text-white hover:bg-violet-700 transition-all bold"
        >
          See more
        </Link>
      )}
      {total === 0 && <p>Sua Busca não retornou nada. BIGA</p>}
    </main>
  );
}
