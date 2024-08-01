const now = new Date();

// Mengubah ke timezone Asia/Jakarta
const options = { timeZone: 'Asia/Jakarta', hour12: false };
const year = now.toLocaleString('en-CA', { ...options, year: 'numeric' });
const month = now.toLocaleString('en-CA', { ...options, month: '2-digit' });
const day = now.toLocaleString('en-CA', { ...options, day: '2-digit' });
const currentDate = `${year}-${month}-${day}`;
const currentTime = now.toLocaleTimeString('en-US', { ...options, hour: '2-digit', minute: '2-digit', second: '2-digit' });

const hours = parseInt(now.toLocaleString('en-US', { ...options, hour: '2-digit', hour12: false }), 10);
const minutes = parseInt(now.toLocaleString('en-US', { ...options, minute: '2-digit' }), 10);

const timeInMinutes = (hour: number, minute: number) => hour * 60 + minute;

export { now as currDateTime, currentDate, timeInMinutes, currentTime, hours, minutes };
