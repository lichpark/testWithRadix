import { useEffect, useState } from "react";
import Aside from "./Aside";
import Main from "./Main";
import { Flex, Box } from "@radix-ui/themes";

const MainWrp = () => {
  const backobj = {
    Snow: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d0da577d-27d8-48f5-84c3-b6c5d78968ea/dc0a8ex-3fc866b3-6d75-4aa5-9bd5-5ff6a818604b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QwZGE1NzdkLTI3ZDgtNDhmNS04NGMzLWI2YzVkNzg5NjhlYVwvZGMwYThleC0zZmM4NjZiMy02ZDc1LTRhYTUtOWJkNS01ZmY2YTgxODYwNGIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.0jtlX_bjaV2EEHWXJFw1B5TzcW7V6oA-dSnVtVKi7uM",
    Clear:
      "https://news.airbnb.com/wp-content/uploads/sites/4/2022/12/05-Hobbiton-Airbnb-Aerial-Millhouse-Credit-Larnie-Nicolson.jpg",
  };
  const [bgimg, setBgimg] = useState(backobj["Clear"]);
  //   fetch("https://fakerapi.it/api/v2/images?_quantity=1&_type=any")
  //     .then((r) => r.json())
  //     .then((v) => {
  //       const imgurl = v.data[0].url;
  //       console.log(imgurl);
  //       setBgimg((prev) => imgurl);
  //     });

  const API_KEY = "3af745e55c0152da567c5ffd089f9e00";

  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("0");

  //useEffect(onGeoConfirm, []);
  function onGeoConfirm(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    //console.log(`You live in ${lat} ${lon}`);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //const citySpan = document.querySelector(".city");
        //const weatherSpan = document.querySelector(".temp");

        //   citySpan.innerText = data.name;
        //   weatherSpan.innerText = `${data.weather[0].main} ${Math.round(data.main.temp)}℃`;
        //console.log(data.name);
        setCity((prev) => data.name);
        setTemp(
          (prev) => `${data.weather[0].main} ${Math.round(data.main.temp)}℃`
        );
        setBgimg((prev) => backobj[data.weather[0].main]);
      });
  }

  function onGeoError() {
    alert("위치 확인 권한 미허용시 날씨 조회가 불가능합니다.");
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoConfirm, onGeoError);
  }, []);

  return (
    <section
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box style={{ padding: "5% 0%" }}>
        <Flex
          direction="row"
          gap="5"
          style={{ justifyContent: "center", margin: "0 auto" }}
        >
          <Aside city={city} temp={temp} />
          <Main />
        </Flex>
      </Box>
    </section>
  );
};

export default MainWrp;