/**
 * Mocks scheduling a reminder.
 */
export async function reminderSchedulerTool(bookingId: string, time: string) {
  return {
    reminder_id: `REM-${Math.floor(Math.random() * 9000) + 1000}`,
    scheduled_at: time,
    status: 'scheduled'
  };
}
