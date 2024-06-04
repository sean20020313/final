import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
     "https://pggyhoianzhingmncyuk.supabase.co",
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnZ3lob2lhbnpoaW5nbW5jeXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0OTA4ODIsImV4cCI6MjAzMzA2Njg4Mn0.ISw-ZbgkLiMwWp-31XItj9BPChH_OjEwo5Mh0QP2Blk"
)