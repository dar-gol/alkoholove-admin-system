import Spacings from "./spacings";
import Weights from "./weights";
import FontSize from "./fontSizes";
import ZIndex from "./zIndex";
import Colors from "./colors";

const setMode = (mode: string): "light" | "dark" => {
  if (["light", "dark"].includes(mode)) return mode as "light" | "dark";
  return "light";
};

export const createTheme = (mode: string = "light") => {
  const validMode = setMode(mode);
  return {
    spacings: Spacings,
    weights: Weights,
    fontSize: FontSize,
    zIndex: ZIndex,
    palette: Colors[validMode],
  };
};

export default createTheme;
