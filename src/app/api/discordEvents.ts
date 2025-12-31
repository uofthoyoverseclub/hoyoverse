export interface DiscordEvent {
  id: string;
  name: string;
  description: string;
  scheduled_start_time: string;
  scheduled_end_time: string | null;
  status: number;
  entity_metadata?: {
    location?: string;
  };
  image?: string;
}

export async function fetchDiscordEvents(): Promise<DiscordEvent[]> {
  const res = await fetch('/api/discord-events');

  if (!res.ok) {
    throw new Error('Failed to load events');
  }

  return res.json();
}
