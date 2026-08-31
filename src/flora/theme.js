import { DEFAULT_THEME } from '@zendeskgarden/react-theming'
import { PALETTE } from './palette'

const { colors: gardenColors } = DEFAULT_THEME

export const FLORA_THEME = {
  ...DEFAULT_THEME,
  palette: {
    ...DEFAULT_THEME.palette,
    ...PALETTE,
  },
  colors: {
    ...gardenColors,
    primaryHue: 'blue',
    dangerHue: 'red',
    warningHue: 'yellow',
    successHue: 'green',
    neutralHue: 'grey',
    chromeHue: 'kale',
    variables: {
      ...gardenColors.variables,
      light: {
        ...gardenColors.variables.light,
        background: {
          ...gardenColors.variables.light.background,
          default: 'palette.white',
          raised: 'palette.white',
          recessed: 'neutralHue.100',
          subtle: 'neutralHue.100',
        },
        border: {
          ...gardenColors.variables.light.border,
          default: 'neutralHue.300',
          emphasis: 'neutralHue.600',
          subtle: 'neutralHue.200',
        },
        foreground: {
          ...gardenColors.variables.light.foreground,
          default: 'neutralHue.900',
          subtle: 'neutralHue.800',
          onEmphasis: 'palette.white',
          primary: 'primaryHue.700',
        },
      },
    },
  },
  fonts: {
    ...DEFAULT_THEME.fonts,
    system:
      'system-ui, -apple-system, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif',
  },
}

