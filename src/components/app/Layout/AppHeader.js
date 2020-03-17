import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { AppBar, Toolbar, IconButton, InputBase, Menu, MenuItem } from '@material-ui/core';
import { Person as AccountIcon, Search as SearchIcon } from '@material-ui/icons';
import classNames from 'classnames';

// styles
import useStyles from './styles';

// components
import { Typography } from '../../Wrappers/Wrappers';

// context
import { signOut } from '../../../stores/UserStore';

function Header() {
  const history = useHistory();

  const classes = useStyles();

  // local
  const [profileMenu, setProfileMenu] = useState(null);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const UserName = localStorage.getItem('user_name');

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          React
        </Typography>
        <div className={classes.grow} />
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
            {UserName}
            </Typography>
          </div>
          <MenuItem className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>Profile</MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography className={classes.profileMenuLink} color="primary" onClick={() => signOut(history)}>
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
