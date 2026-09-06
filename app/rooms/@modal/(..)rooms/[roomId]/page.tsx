import { notFound } from 'next/navigation';
import { roomsData } from '../../../data';
import RoomModal from '../../../RoomModal';

export default async function RoomInterceptedPage({ params }: { params: Promise<{ roomId: string }> }) {
  const resolvedParams = await params;
  const room = roomsData.find(r => r.id === resolvedParams.roomId);
  
  if (!room) {
    notFound();
  }

  return <RoomModal room={room} isIntercepted={true} />;
}
