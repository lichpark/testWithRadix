import {
  Flex,
  Text,
  Button,
  Box,
  TextField,
  Heading,
  ScrollArea,
  Avatar,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { style } from "../style/style";
const Aside = ({ city, temp }) => {
  //프롬프트 입력 사용자명 뿌려주기

  const [userName, setUserName] = useState(() => {
    // 초기값 로드: localStorage에서 데이터 가져오기
    const savedUserNm = localStorage.getItem("userNm");
    //console.log(savedUserNm);
    return savedUserNm ? savedUserNm : "Guest"; // 저장된 값이 있으면 파싱, 없으면 빈 배열
  });

  useEffect(() => {
    if (userName === "Guest") {
      // userName이 없을 경우 입력 요청
      const insUser = prompt("사용자 이름을 입력해 주세요:") || "Guest"; // 입력이 없으면 "Guest"로 설정
      setUserName(insUser); // 상태 업데이트
      localStorage.setItem("userNm", insUser); // localStorage에 저장
    }
  }, [userName]);

  const logout = () => {
    localStorage.removeItem("userNm");
    setUserName((prev) => "Guest");
  };

  //날짜 관련 처리
  const today = new Date();
  const starttime = today.toLocaleTimeString();
  const [time, setTime] = useState(starttime);
  useEffect(() => {
    setInterval(() => {
      const time = new Date().toLocaleTimeString();
      setTime((prev) => time);
    }, 1000);
  }, []);

  // 현재 날짜를 가져옵니다.
  const formattedDate = `${today.getFullYear()}년 ${
    today.getMonth() + 1
  }월 ${today.getDate()}일`;

  //랜덤 운세
  const diceArr = ["영", "일", "이", "삼", "사", "오", "육"];
  const [randtext, setRandText] = useState(diceArr["0"]);

  const changeRand = () => {
    const max = 6;
    const res = Math.floor(Math.random() * max) + 1;

    // console.log(res);
    setRandText((prev) => diceArr[res]);
  };

  return (
    <div>
      <Flex direction="row" gap="2">
        <Box width="400px" height="64px" style={style.boxstyle}>
          <Text size="5" weight="bold" align="center">
            {userName},님 안녕하세요
          </Text>
          <Button onClick={logout}>Logout</Button>
        </Box>
      </Flex>
      <Box
        width="400px"
        my="5"
        style={{
          backgroundColor: "white",
          borderRadius: "var(--radius-3)",
          opacity: "0.5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text as="div" size="7" weight="bold" style={{ padding: "10px" }}>
          {formattedDate}
        </Text>
        <Text as="div" size="7" weight="bold" style={{ padding: "10px" }}>
          {time}
        </Text>
      </Box>
      <Box
        width="400px"
        py="2"
        px="2"
        my="5"
        style={{
          backgroundColor: "white",
          opacity: "0.5",
          borderRadius: "var(--radius-3)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box py="4" px="4">
          <Text as="div" size="5" weight="bold">
            날씨
          </Text>
          <Text as="div" size="4" weight="bold">
            {city}
          </Text>
          <Text as="div" size="4" weight="bold">
            {temp}
          </Text>
        </Box>
      </Box>
      <Box
        width="400px"
        py="2"
        px="2"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          borderRadius: "var(--radius-3)",
          opacity: "0.8",
        }}
      >
        <Flex
          direction="row"
          gap="2"
          style={{ justifyContent: "space-between" }}
        >
          <Box>
            <Text weight="bold">주사위 굴리기: </Text>
            <Button color="blue" variant="solid" onClick={changeRand}>
              굴려
            </Button>
          </Box>
          <Box>
            <Avatar
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              style={{ borderRadius: "9999px" }}
            />
          </Box>
        </Flex>
        <Text as="div" align="center" style={{ padding: "5px" }}>
          {randtext}
        </Text>
      </Box>
    </div>
  );
};

export default Aside;
