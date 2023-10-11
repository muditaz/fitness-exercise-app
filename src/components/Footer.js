import { Box, Stack } from '@mui/material';
import Logo from '../assets/images/Logo.png';

const Footer = () => (
  <Box mt="80px" bgcolor="#FFF3F4">
    <Stack gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px">
    <img src={Logo} alt="logo" style={{ width: '48px', height: '48px', margin: '0px 20px' }} /><h1>FitFab</h1> <h3>All Rights Reserved</h3>
    </Stack>
  </Box>
);

export default Footer;