import { useAppSelector } from '@/redux/hook';
import { Nav_IDS } from '@/shared/enum';
import { Avatar, Box, Button, ButtonGroup, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const settings = [
    {
        id: Nav_IDS.BOOKS,
        title: 'Books',
        path: '/books',
    },
    {
        id: Nav_IDS.NEW_BOOK,
        title: 'New Book',
        path: '/books/new',
    },
    {
        id: Nav_IDS.LOGOUT,
        title: 'Logout',
        path: '/logout',
    },

];
const Account = ({

    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu
}: {

    anchorElUser: HTMLElement | null,
    handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
    handleCloseUserMenu: (menuId: Nav_IDS) => void
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
                    <MenuItem key={setting.id} onClick={() => handleCloseUserMenu(setting.id)}>

                        <Typography textAlign="center">{setting.title}</Typography>

                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default Account