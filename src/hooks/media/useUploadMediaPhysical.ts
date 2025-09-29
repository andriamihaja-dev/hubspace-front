import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { AxiosResponse } from "axios";
import type { MediaDto } from "./types";

export function useUploadMediaPhysical() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const res: AxiosResponse<{ data: MediaDto }> = await api.post(
        "/media/upload/physical",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return res.data.data;
    },
  });
}
