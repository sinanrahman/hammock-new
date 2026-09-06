export type Room = {
  id: string;
  name: string;
  image: string;
  shortDescription: string;
  description: string;
  amenities: string[];
};

export const roomsData: Room[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `room-${i + 1}`,
  name: `Room ${String(i + 1).padStart(2, '0')}`,
  image: `/images/rooms/room-${i + 1}.jpg`,
  shortDescription: 'Thoughtfully designed space shaped around comfort.',
  description: 'A calm, thoughtfully designed space created for a comfortable stay.',
  amenities: [],
}));
