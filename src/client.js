import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    "https://rlfdfigtmygotnxagdwh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODQ3NDc2NSwiZXhwIjoxOTQ0MDUwNzY1fQ.pU0r-IVHzpMuYzaY6TxZadbvV1S7GsApvK1pQlu_2fw"
)