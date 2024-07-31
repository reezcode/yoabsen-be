const now = new Date();
const currDateTime = new Date(now);

// Tambah 7 jam
currDateTime.setHours(currDateTime.getHours() + 7);
// tambah 1 menit 30 detik
currDateTime.setMinutes(currDateTime.getMinutes() + 1);
currDateTime.setSeconds(currDateTime.getSeconds() + 30);

const year = currDateTime.getFullYear();
const month = String(currDateTime.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
const day = String(currDateTime.getDate()).padStart(2, '0');
const currentDate = `${year}-${month}-${day}`;
const currentTime = currDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
});

const timeInMinutes = (hour: number, minute: number) => hour * 60 + minute;

export { currDateTime, currentDate, timeInMinutes, currentTime };
