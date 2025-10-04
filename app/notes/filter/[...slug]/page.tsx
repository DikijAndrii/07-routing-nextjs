import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "../../../../lib/api";

interface Props {
  searchParams: Promise<{ page: string; search: string; tag?: string }>;
}

export default async function NotesPage({ searchParams }: Props) {
  const { page: pageRaw, search: searchRaw, tag: tagRaw } = await searchParams;

  const page = Number(pageRaw ?? 1);
  const perPage = 12;
  const search = searchRaw ?? "";
  const tag = tagRaw && tagRaw !== "All" ? tagRaw : undefined;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, perPage, search, tag],
    queryFn: () => fetchNotes({ page, perPage, search, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialPage={page}
        initialSearch={search}
        perPage={perPage}
        initialTag={tag}
      />
    </HydrationBoundary>
  );
}
