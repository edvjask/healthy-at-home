import React from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {useUserContext} from "../contexts/UserAuthContext";
import {useNavigate} from "react-router-dom";

export const UserInfoBox = () => {
    const settings = ["Profile", "Account", "Dashboard", "Logout"];

    const {user, logoutUser} = useUserContext();
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const isProviderFacebook = user?.providerData[0].providerId === "facebook.com";
    const appendFbToken = () => {
        //get from localstorage
        const token = window.localStorage.getItem("FB_TOKEN");
        return `?access_token=${token}`;
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserMenuOptions = (setting: string) => {
        switch (setting) {
            case "Logout":
                if (logoutUser) {
                    logoutUser();
                }
                navigate("/login");
                break;
            default:
                return;
        }
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <IconButton
                onClick={handleOpenUserMenu}
                aria-label="account-current"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
            >
                <Avatar
                    alt={user?.displayName ?? 'Avatar'}
                    src={
                        (isProviderFacebook ? user.photoURL + appendFbToken() : user?.photoURL) ?? undefined
                    }
                />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem
                        key={setting}
                        onClick={() => handleUserMenuOptions(setting)}
                    >
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
