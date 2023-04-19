import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
  fontFamily: {
    display: "'Inter', var(--joy-fontFamily-fallback)",
    body: "'Inter', var(--joy-fontFamily-fallback)",
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.size === 'xs' && {
            '--Icon-fontSize': '1rem',
            '--Button-gap': '0.25rem',
            minHeight: 'var(--Button-minHeight, 1.75rem)',
            fontSize: theme.vars.fontSize.xs,
            paddingBlock: '2px',
            paddingInline: '0.5rem',
          }),
          ...(ownerState.size === 'xl' && {
            '--Icon-fontSize': '2rem',
            '--Button-gap': '1rem',
            minHeight: 'var(--Button-minHeight, 4rem)',
            fontSize: theme.vars.fontSize.xl,
            paddingBlock: '0.5rem',
            paddingInline: '2rem',
          }),
        }),
      },
    },
  },
});
