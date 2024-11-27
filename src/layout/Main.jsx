import { HeartIcon } from "@radix-ui/react-icons";
import {
  Flex,
  Text,
  Button,
  Box,
  TextField,
  Heading,
  ScrollArea,
} from "@radix-ui/themes";
import { useState, useEffect } from "react";

const Main = () => {
  const [todoArr, setCheck] = useState(() => {
    // 초기값 로드: localStorage에서 데이터 가져오기
    const savedTodos = localStorage.getItem("todoArr");
    return savedTodos ? JSON.parse(savedTodos) : []; // 저장된 값이 있으면 파싱, 없으면 빈 배열
  });
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
  }, [todoArr]);

  const changeInput = () => {
    if (inputText.trim() === "") return;
    const millis = Date.now();
    setCheck((prev) => [
      ...prev,
      { check: false, text: " " + inputText, textId: millis },
    ]);
    setInputText("");
  };
  const deleteTodo = (textId) => {
    setCheck((prev) => prev.filter((todo) => todo.textId !== textId)); // textId로 필터링
  };

  return (
    <Box
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: "var(--radius-3)",
        opacity: "0.8",
      }}
      py="10"
      px="5"
    >
      <Flex direction="column" gap="2">
        <Heading style={{ padding: "3% 0%" }}>오늘의 일정</Heading>
        <Box
          style={{
            backgroundColor: "var(--gray-a2)",
            borderRadius: "var(--radius-3)",
          }}
        >
          <Box py="5">
            <Flex direction="row" gap="2">
              <Box minWidth="800px">
                <TextField.Root
                  size="5"
                  placeholder="일정을 입력해 주세요"
                  variant="classic"
                  value={inputText} // 상태와 연결
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      changeInput();
                    }
                  }} // 엔터키 이벤트 추가
                />
              </Box>
              <Button onClick={changeInput}>입력</Button>
            </Flex>
          </Box>

          <ScrollArea
            type="always"
            scrollbars="both"
            style={{ maxHeight: "180px", maxWidth: "800px" }}
          >
            {todoArr.map((v, idx) => {
              return (
                <Box width="100%" key={idx} py="2">
                  <Flex direction="row" gap="2">
                    <Text as="div">
                      <HeartIcon />
                      {v.text}
                    </Text>
                    <Button
                      onClick={() => {
                        deleteTodo(v.textId);
                      }}
                    >
                      삭제
                    </Button>
                  </Flex>
                </Box>
              );
            })}
          </ScrollArea>
        </Box>
      </Flex>
    </Box>
  );
};

export default Main;
