const today = new Date();
const starttime = today.toLocaleTimeString();
const [time, setTime] = useState(starttime);
setInterval(() => {
  const time = new Date().toLocaleTimeString();
  setTime((prev) => time);
}, 1000);

// 현재 날짜를 가져옵니다.
const formattedDate = `${today.getFullYear()}년 ${
  today.getMonth() + 1
}월 ${today.getDate()}일`;
