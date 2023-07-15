import { Outlet } from 'react-router-dom';
import NavBar from '../header/NavBar'
import { Box, Container } from '@mui/material'

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Container
        maxWidth="xl"
      >
        <Box className="pt-16">
          <Outlet />
        </Box>
      </Container>
    </>
  )
}

export default RootLayout