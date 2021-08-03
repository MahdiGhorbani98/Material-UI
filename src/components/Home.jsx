import React from 'react'
import AppBar  from '@material-ui/core/AppBar'
import Toolbar  from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {makeStyles , createTheme, ThemeProvider ,withStyles, createMuiTheme} from '@material-ui/core/styles';
import { Avatar, CardActions, CardContent, CardHeader, Container, Typography } from '@material-ui/core';
import {  blue  } from '@material-ui/core/colors';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Card from '@material-ui/core/Card';
import { Favorite, MoreVert, Share } from '@material-ui/icons';
import Masonry from 'react-masonry-css';
import { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail'



const useStyle = makeStyles((themeStyles)=> ({
   

    root:{

    },
    appBar:{
        boxShadow:1
    },
    menuButton : {
        marginLeft : themeStyles.spacing(1)
    },
    title:{
        flexGrow : 1,
        userSelect:'none',
        marginLeft : themeStyles.spacing(2)

    },
    gridContainer :{
        marginTop:themeStyles.spacing(12),
    }
}))


export default function Home(props) {
    const notes = props.notes;
    const [lightTheme,setLightTheme] = useState(true);
    const [anchor,setAnchore] = useState(false);

    const toggleDrawer = ( open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setAnchore(open)
    }
    const changeTheme= ()=>{
        setLightTheme(!lightTheme)
    }

    const theme = React.useMemo(
        ()=> createTheme({
            palette:{
                type :lightTheme?'light':'dark',
                primary:{
                    main: lightTheme? blue[500] : '#26a69a',
                },
                secondary: {
                    main: lightTheme?'#f50057' :'#ff5722' 
                }
                
                
            }
        }),[lightTheme]
    )


    const classes = useStyle();
    const breakpointCols = {
        default:3,
        1100:2,
        700:1
    }

    const menuList = ()=>(
                    <List style={{width:250}}>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
    )
    return (
        <div>
            <ThemeProvider theme = {theme}>
            <CssBaseline />
                <Drawer anchor={'left'} open={anchor} onClose={toggleDrawer(false)}>
                    {menuList()}
                    <Divider />
                    {menuList()}

                </Drawer>
                <AppBar  >
                    <Toolbar>
                        
                        <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>

                        <Typography className={classes.title} variant="h6" >
                            Material-UI
                        </Typography>

                        <IconButton onClick={changeTheme} color="inherit">
                            {lightTheme? <Brightness4OutlinedIcon/> : <BrightnessHighIcon/>}
                        </IconButton>

                        <Button color="inherit">Login</Button>
                    </Toolbar>
            </AppBar>
            <Container  className={classes.gridContainer}>
                <Masonry
                  breakpointCols={breakpointCols}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                    {
                        notes.map(note=> (
                                <Card className={classes.root} key ={note.id}>
                                    <CardHeader className={classes.cardHeader}
                                    avatar ={
                                        <Avatar style={{backgroundColor: '#'+Math.floor(Math.random()*16777215).toString(16) }} >
                                            {note.title.charAt(0)}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton>
                                            <MoreVert/>
                                        </IconButton>
                                    }
                                    title={note.title} />
                                    <Divider/>
                                    <CardContent>
                                        <Typography variant='body2' color='textSecondary'>
                                            {note.details}
                                        </Typography>
                                    </CardContent> 
                                    <CardActions>
                                        <IconButton color='secondary' aria-label="add to favorites">
                                            <Favorite />
                                        </IconButton>

                                        <IconButton>
                                            <Share/>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                        ))
                    }
                </Masonry>
            </Container>

            </ThemeProvider>
        </div>
    )
}
