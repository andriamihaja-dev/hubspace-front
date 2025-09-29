import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { MediaDto } from "./types";

export function useMyMedia() {
  return useQuery({
    queryKey: ["myMedia"],
    queryFn: async (): Promise<MediaDto[]> => {
      const res = await api.get("/media");
      return res.data.data;
    },
  });
}
