import Spacings from './spacings';
import Weights from './weights';
import FontSize from './fontSizes';
import ZIndex from './zIndex';
import Colors from './colors';

export const createTheme = () => ({
  spacings: Spacings,
  weights: Weights,
  fontSize: FontSize,
  zIndex: ZIndex,
  palette: Colors.light,
});

export default createTheme;
