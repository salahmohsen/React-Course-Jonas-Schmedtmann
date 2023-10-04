import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://mmlirhxqovzqsoybxdty.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tbGlyaHhxb3Z6cXNveWJ4ZHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyODQ2NTgsImV4cCI6MjAxMTg2MDY1OH0.y2Ssp3pnwzKIKAIaJvE9eusb70ZoDlQ7PUBqCgIoZDs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
