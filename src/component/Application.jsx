import { Section } from "@radix-ui/themes";
import { style } from "../style/style";

const Application = ({ children }) => {
  return (
    <Section py="0" style={style.secstyle}>
      {children}
    </Section>
  );
};

export default Application;
