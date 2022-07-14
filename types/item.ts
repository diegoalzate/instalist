export type Item = {
    id: string;
    profile_id?: string;
    bought_by?: string;
    list_id?: string;
    name?: string;
    url?: string;
    bought: boolean;
    favorite?: boolean;
    updated_at?: Date;
    created_at?: Date;
  }