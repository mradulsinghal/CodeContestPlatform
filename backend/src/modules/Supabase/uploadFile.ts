import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  `${process.env.SUPABASE_URL!}`,
  `${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
);

export const UploadTest = async (path: string, value: string) => {
  const { data, error } = await supabase.storage
    .from("TestCase")
    .upload(path, value);
  if (error) {
    console.log("error logged uploading test");
    return;
  }
};
