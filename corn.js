const cron = require('node-cron');
const Event = require("./models/event");

cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const events = await Event.find({ eventStatus: { $ne: 'completed' } });

    for (const event of events) {
      const [hours, minutes] = event.time.split(':');
      const eventDate = new Date(event.date);        
      eventDate.setHours(hours, minutes, 0, 0);

      if (now >= eventDate) {
        event.eventStatus = 'completed';
        await event.save();
      }
    }
  } catch (err) {
    console.error('Error updating event statuses:', err);
  }
});
