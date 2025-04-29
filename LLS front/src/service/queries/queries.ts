import {
    useQuery,
  } from "@tanstack/react-query";
import { getBlogsByName } from "../api/api";

export function useFetchBlogsByName(_id: string) {
    return useQuery({
      queryKey: ["blog", {_id }],
      queryFn: () => getBlogsByName(_id),
    })};