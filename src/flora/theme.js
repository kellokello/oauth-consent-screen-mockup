import { DEFAULT_THEME } from '@zendeskgarden/react-theming'
import { PALETTE } from './palette'

/**
 * Garden components, Flora colors.
 * Primary is Flora blue (same role as the Sign in button), not Garden Kale
 * and not Flora olive green.
 */
export const FLORA_THEME = {
  ...DEFAULT_THEME,
  palette: {
    ...DEFAULT_THEME.palette,
    ...PALETTE,
  },
  colors: {
    ...DEFAULT_THEME.colors,
    primaryHue: 'blue',
    dangerHue: 'red',
    warningHue: 'yellow',
    successHue: 'green',
    neutralHue: 'grey',
    chromeHue: 'kale',
  },
  fonts: {
    ...DEFAULT_THEME.fonts,
    system:
      'system-ui, -apple-system, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif',
  },
}
