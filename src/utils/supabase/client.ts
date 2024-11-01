import { createBrowserClient } from "@supabase/ssr";
import { Database } from "../../../database.types";

export const DEFAULT_PROFILE_IMAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_DEFAULT_IMAGE_URL || "/default-profile.jpg";


export const createClient = () =>
  createBrowserClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const browserClient = createClient();

export default browserClient;
