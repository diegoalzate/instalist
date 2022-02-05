import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    "https://bpxvygqgphuornaexayl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyOTY1MDkyNiwiZXhwIjoxOTQ1MjI2OTI2fQ.h87JOH4Mnb9hdcBNAXXjJVUyuy1BsIqOqjwtRPJbqk4"
)