import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from "react-router-dom";
import {Avatar, Badge, BadgeProps, styled, Tooltip} from "@mui/material";
import {useAuth} from "../context/AuthContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useCart} from "../context/CartContext";

const pages = [
    {
        name: "Accueil",
        navigation: "/home"
    },
    {
        name: "Tous les produits",
        navigation: "/allproducts"
    },
    {
        name: "Chercher un produit",
        navigation: "/research"
    },
    {
        name: "Mes commandes",
        navigation: "/orders"
    },


];
const settings = [
    {
        name: "Gérer",
        navigation: "/"
    },
    {
        name: "Se déconnecter",
        navigation: "/login"
    }

];

const StyledBadge = styled(Badge)<BadgeProps>(({theme}) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const {logout} = useAuth();
    const {totalProducts} = useCart();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
        handleCloseUserMenu();
    }



    return (
        <AppBar position="static" sx={{
            backgroundColor: "#006164"
        }}>
            <Container maxWidth="xl">

                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: {xs: 'block', md: 'none'}}}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={() => navigate(page.navigation)}
                                          sx={{cursor: "pointer"}}>
                                    <Typography sx={{textAlign: 'center'}}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => navigate(page.navigation)}
                                sx={{my: 2, color: 'white', display: 'block', cursor: "pointer"}}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", width: 100}}>

                        <IconButton aria-label="cart" onClick={() => navigate("/cart")}>
                            <StyledBadge badgeContent={totalProducts.length} color="success" sx={{color: "white"}}>
                                <ShoppingCartIcon sx={{cursor: "pointer", color: "white"}}/>
                            </StyledBadge>
                        </IconButton>


                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Paramètres">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
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
                                    setting.name === "Se déconnecter" ? (
                                        <MenuItem key={setting.name} onClick={handleLogout}>
                                            <Typography sx={{textAlign: 'center'}}>{setting.name}</Typography>
                                        </MenuItem>
                                    ) : (
                                        <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                            <Typography sx={{textAlign: 'center'}}>{setting.name}</Typography>
                                        </MenuItem>
                                    )

                                ))}
                            </Menu>
                        </Box>
                    </Box>

                </Toolbar>
            </Container>

        </AppBar>
    );
}

export default ResponsiveAppBar;
