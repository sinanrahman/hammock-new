import { notFound } from 'next/navigation';
import { roomsData } from '../data';
import RoomModal from '../RoomModal';

export function generateMetadata({ params }: { params: { roomId: string } }) {
  const room = roomsData.find(r => r.id === params.roomId);
  if (!room) return { title: 'Room Not Found' };
  
  return {
    title: `${room.name} | HAMMOCK`,
    description: room.description
  };
}

export default async function RoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const resolvedParams = await params;
  const room = roomsData.find(r => r.id === resolvedParams.roomId);
  
  if (!room) {
    notFound();
  }

  // When loaded directly, we can just render the modal fullscreen over nothing, 
  // or render it as a standard page. We'll render it as a standard page that looks like the modal.
  return (
    <>
      <RoomModal room={room} isIntercepted={false} />
    </>
  );
}
