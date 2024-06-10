import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
     "https://tleklgsvkuwhcfmmidzo.supabase.co",
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZWtsZ3N2a3V3aGNmbW1pZHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyMjM5NDksImV4cCI6MjAwMTc5OTk0OX0.uq_htOwBsGoBhvKgvv3QreK3FM8df59sZrNA3jnI8-k"
)