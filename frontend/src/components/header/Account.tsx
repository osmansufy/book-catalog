import { useAppSelector } from '@/redux/hook';
import { AccountCircle } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Box, Button, ButtonGroup, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Account = ({
    handleProfileMenuOpen,
    menuId
}: {
    handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void,
    menuId: string
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
                    >
                        <Link to="/login"
                            style={{ color: 'white' }}
                        >Login</Link>
                    </Button>
                    <Button href="/register"
                        color="warning"
                    >
                        <Link to="/register"
                            style={{ color: 'white' }}
                        >Register</Link>
                    </Button>
                </ButtonGroup>

            </Box>
        )
    }

    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                    <MailIcon />
                </Badge>
            </IconButton>
            <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
            >
                <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
        </Box>
    )
}

export default Account