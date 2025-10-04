import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "../../../../lib/api";

interface Props {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function NotesPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageRaw, search: searchRaw } = await searchParams;

  const tag = slug?.[0] && slug[0] !== "All" ? slug[0] : undefined;
  const page = Number(pageRaw ?? 1);
  const perPage = 12;
  const search = searchRaw ?? "";

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
