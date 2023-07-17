import { useAppSelector } from '@/redux/hook';
import { Avatar, Box, Button, ButtonGroup, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Account = ({
    settings,
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu
}: {
    settings: string[],
    anchorElUser: HTMLElement | null,
    handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
    handleCloseUserMenu: (menuId: string) => void
}) => {
    const { user } = useAppSelector(state => state.user)

    if (user.email === null) {
        return (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {/*  login or register button*/}
                <ButtonGroup variant="contained" sx={{
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px'
                }} >
                    <Button
                        color="secondary"
                        component={Link} to="/login"
                    >
                        Login
                    </Button>
                    <Button component={Link} to="/register"
                    >
                        Register
                    </Button>
                </ButtonGroup>

            </Box>
        )
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default Account