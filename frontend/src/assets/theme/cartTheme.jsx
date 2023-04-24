import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          //make the body colour little darker


          body: 'var(--joy-palette-neutral-50)',
          // surface: 'var(--joy-palette-neutral-50)',
        },
      },
    },
    dark: {
      palette: {
        background: {
          body: 'var(--joy-palette-common-black)',
          surface: 'var(--joy-palette-neutral-900)',
        },
      },
    },
  },
  fontFamily: {
    // display: "'Inter', var(--joy-fontFamily-fallback)",
    // body: "'Inter', var(--joy-fontFamily-fallback)",
  },
});
