import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Event type for Supabase
export interface SupabaseEvent {
	id?: string;
	created_at: string;
	event_name: string;
	location: string;
	description: string;
	type: string;
	link: string;
	link_display: string;
	start_time: string;
	end_time: string;
	attendees?: number;
	updated_at?: string;
}
