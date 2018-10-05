import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Dashboard from './pages/dashboard/Dashboard';
import Cockpit from './pages/cockpit/Cockpit';    
import InfoBox from './InfoBox'

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
    root: {
          flexGrow: 1,
        },
    grow: {
          flexGrow: 1,
        },
    menuButton: {
          marginLeft: -12,
          marginRight: 20,
    }
};

class App extends React.Component {
  state = {
    anchorEl: null,
    badSpot: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);


    const renderMenu = <Menu id="menu-appbar"
        anchorEl={anchorEl}
        aria-owns={open ? 'material-appbar' : null}
        anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
        }}
        open={open}
        onClose={this.handleClose} >

        <MenuItem onClick={this.handleClose}>
          <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>Dashboard </Link>
        </MenuItem>

        <MenuItem onClick={this.handleClose}>
          <Link to="/cockpit" style={{ textDecoration: 'none', display: 'block' }}>Settings </Link>
        </MenuItem>
      </Menu>

      return (
        <div>
          <Router>
            <div>
              <div className={classes.root}>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton className={classes.menuButton} 
                      aria-owns={open ? 'material-appbar' : null}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit" 
                      aria-label="Menu">
                      <MenuIcon />
                    </IconButton>
                    <InfoBox />
                  </Toolbar>
                </AppBar>
                {renderMenu}
              </div>
              <div>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/cockpit' component={Cockpit} />
              </div>
            </div>
          </Router>
        </div>
    );
  }
}

export default withStyles(styles)(App);
