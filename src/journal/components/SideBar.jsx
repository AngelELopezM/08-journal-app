import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth }) => {

    const { displayName } = useSelector(x => x.auth);
    const { notes } = useSelector(x => x.journal);

    const name = displayName === null ? 'No name' : displayName;

    return (
        <Box
            component={'nav'}
            sx={{
                width: { sm: drawerWidth },
                flexShrink: { sm: 0 }
            }}
        >
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component={'div'}>
                        {name}
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {
                        notes.map(x => (
                            <SideBarItem key={x.id} {...x}/>
                        ))
                    }
                </List>
            </Drawer>

        </Box>
    )
}
