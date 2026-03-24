import { supabase } from "./uploadFile";

export const DownloadFile = async (path: string) => {
  const { data, error } = await supabase.storage
    .from("TestCase")
    .download(path);
  if (error) {
    return null;
  }
  return data?.text();
};
