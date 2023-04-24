import * as React from 'react';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Item from './SubsCard';
import ColorSchemeToggle from '../../utils/ColorSchemeToggle';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import useScript from '../../utils/useScript';

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function MySubsList() {

    const status = useScript(`https://unpkg.com/feather-icons`);

    useEnhancedEffect(() => {
      // Feather icon setup: https://github.com/feathericons/feather#4-replace
      // @ts-ignore
      if (typeof feather !== 'undefined') {
        // @ts-ignore
        feather.replace();
      }
    }, [status]);

    return (
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Box
                component="main"
                className="MainContent"
                sx={(theme) => ({
                    px: {
                        xs: 2,
                        md: 6,
                    },
                    pt: {
                        xs: `calc(${theme.spacing(2)} + var(--Header-height))`,
                        sm: `calc(${theme.spacing(2)} + var(--Header-height))`,
                        md: 3,
                    },
                    pb: {
                        xs: 2,
                        sm: 2,
                        md: 3,
                    },
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    height: '100dvh',
                    gap: 1,
                })}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Breadcrumbs
                        size="sm"
                        aria-label="breadcrumbs"
                        separator={<i data-feather="chevron-right" />}
                        sx={{
                            '--Breadcrumbs-gap': '1rem',
                            '--Icon-fontSize': '16px',
                            fontWeight: 'lg',
                            color: 'neutral.400',
                            px: 0,
                        }}
                    >
                        <Link
                            underline="none"
                            color="neutral"
                            fontSize="inherit"
                            href="#some-link"
                            aria-label="Home"
                        >
                            <i data-feather="home" />
                        </Link>
                        <Typography fontSize="inherit" variant="soft" color="primary">
                            Dashboard
                        </Typography>
                    </Breadcrumbs>
                    <ColorSchemeToggle
                        sx={{ ml: 'auto', display: { xs: 'none', md: 'inline-flex' } }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        my: 1,
                        gap: 1,
                        flexWrap: 'wrap',
                        '& > *': {
                            minWidth: 'clamp(0px, (500px - 100%) * 999, 100%)',
                            flexGrow: 1,
                        },
                    }}
                >
                    <Typography level="h1" fontSize="xl4">
                        My Subscriptions
                    </Typography>
                    <Box sx={{ flex: 999 }} />
                    <Box sx={{ display: 'flex', gap: 1, '& > *': { flexGrow: 1 } }} />
                </Box>
                <Box>
                    <Grid container sx={{ height: "100%" }} spacing={2}>
                        <Grid item sx={{ mb: 2 }} xs={12} sm={6} md={4} lg={4}>
                            <Item />
                        </Grid>
                        <Grid item sx={{ mb: 2 }} xs={12} sm={6} md={4} lg={4}>
                            <Item />
                        </Grid>
                        <Grid item sx={{ mb: 2 }} xs={12} sm={6} md={4} lg={4}>
                            <Item />
                        </Grid>
                        <Grid item sx={{ mb: 2 }} xs={12} sm={6} md={4} lg={4}>
                            <Item />
                        </Grid>
                        <Grid item sx={{ mb: 2 }} xs={12} sm={6} md={4} lg={4}>
                            <Item />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
