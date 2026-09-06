export const WHATSAPP_NUMBER = "918547731887";

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getGeneralBookingMessage() {
  return "Hello HAMMOCK Suites & Rooms, I would like to enquire about booking a stay. Please share room availability and booking details.";
}

export function getRoomBookingMessage(roomName: string) {
  return `Hello HAMMOCK Suites & Rooms, I would like to enquire about booking ${roomName}. Please share availability and booking details.`;
}
