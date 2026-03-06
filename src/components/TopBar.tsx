"use client";
import { apiHandler } from "@/api/apiHandler";
import { logout, selectUser } from "@/redux/slices/authSlice";
import { setIsLoading } from "@/redux/slices/utilSlice";
import { useAppDispatch } from "@/redux/store/store";
import { useSidebarState } from "@/utils/helper.client";
import { Logout } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { ROUTES } from "src/utils/Constant";
import { showToast } from "src/utils/helper";

const TopBar = () => {
  const isSidebarOpen = useSidebarState();

  const router = useRouter();

  const dispatch = useAppDispatch();
  const userData = useSelector(selectUser);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userIcon, setUserIcon] = React.useState(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    let icon = null;

    if (userData?.userName?.split(" ")?.length > 1) {
      icon = `${userData?.userName?.split(" ")[0].charAt(0)?.toUpperCase()}${userData?.userName?.split(" ")[1].charAt(0)?.toUpperCase()}`;
    } else {
      icon = userData?.userName?.slice(0, 2)?.toUpperCase();
    }
    setUserIcon(icon);
  }, [userData]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    dispatch(setIsLoading(true));
    try {
      const res = await apiHandler.admin.signOut();
      if (res?.status === 200 || res?.status === 201) {
        showToast("success", res?.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      Cookies.remove("token");
      dispatch(logout());
      router.push(ROUTES.admin.signIn);
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="h-[67px] w-full sm:h-20">
      <div
        className={`${
          isSidebarOpen ? "w-full lg:w-[calc(100%-16.67%)]" : "w-[calc(100%-76px)]"
        } fixed right-0 z-40 ml-px flex h-fit items-center justify-end gap-2 bg-primary-100 py-3 sm:gap-4 sm:p-5 lg:h-20`}
      >
        <div>
          <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
            <IconButton onClick={handleClick} size="small">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 font-bold sm:h-10 sm:w-10">{userIcon}</div>
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default memo(TopBar);
