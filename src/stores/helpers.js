export const startCountdown = (setTimer) =>{
  const getTime = () => {
    const now = new Date();
    const hours = Math.floor(23 - now.getHours()); // Hour (0-23)
    const minutes = Math.floor(59 - now.getMinutes()); // Minutes (0-59)
    const seconds = Math.floor(60 - now.getSeconds()); // Seconds (0-59)

   // time.value =`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
   setTimer(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
  }
  getTime()
  setInterval(() =>{getTime()},1000)
}
