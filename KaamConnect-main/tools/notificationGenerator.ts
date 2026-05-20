/**
 * Mocks the generation of bilingual notification messages.
 */
export async function notificationGeneratorTool(booking: any) {
  const { booking_code, provider_name, scheduled_at, location } = booking;
  
  const sms_urdu = `Apki booking confirm ho gayi hai. ${provider_name} ${scheduled_at} par ${location} ayenge. Booking ID: ${booking_code}`;
  return {
    user_message_en: `Your booking is confirmed. ${provider_name} will arrive at ${location} at ${scheduled_at}. Booking ID: ${booking_code}`,
    user_message_ru: sms_urdu,
    sms_urdu,
    provider_message: `Apko ek naya kaam mila hai. ${scheduled_at}, ${location}. Booking ID: ${booking_code}`
  };
}
