import Spacings from "./spacings";
import Weights from "./weights";
import FontSize from "./fontSizes";
import ZIndex from "./zIndex";
import Colors from "./colors";

const setMode = (
  mode: string,
  isHighContrast: boolean
): "light" | "dark" | "highContrastLight" | "highContrastDark" => {
  if (isHighContrast && mode === "light") return "highContrastLight";
  if (isHighContrast && mode === "dark") return "highContrastDark";
  if (mode === "light") return "light";
  if (mode === "dark") return "dark";
  return "light";
};

export const createTheme = (mode: string = "light", isHighContrast = false) => {
  const validMode = setMode(mode, isHighContrast);
  return {
    spacings: Spacings,
    weights: Weights,
    fontSize: FontSize,
    zIndex: ZIndex,
    palette: Colors[validMode],
    isHighContrast,
  };
};

export default createTheme;
