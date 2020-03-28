import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { AppBar, Toolbar, IconButton, InputBase, Menu, MenuItem } from '@material-ui/core';
import { Person as AccountIcon, Search as SearchIcon } from '@material-ui/icons';
import classNames from 'classnames';

// styles
import useStyles from './styles';

// components
import { Typography } from '../../Wrappers/Wrappers';

// context
import { getUserName } from '../../Auth/getUserName';
import { signOut } from '../../../stores/AuthStore';

function Header() {
  const { t } = useTranslation('auth');
  const history = useHistory();
  const classes = useStyles();

  // local
  const [profileMenu, setProfileMenu] = useState(null);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const UserId = localStorage.getItem('user_id');

  var UserName = '';
  // useEffect(() => {
    // function handleStatusChange(status) {
      UserName = getUserName(UserId);
    // }
  // });

  function gotoUserProfile() {
    history.push('/user/' + UserId + '/edit');
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          React via GraphQL front-end
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
          <MenuItem className={classNames(classes.profileMenuLink)} onClick={() => gotoUserProfile()}>Profile</MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography className={classes.profileMenuLink} color="primary" onClick={() => signOut(history)}>
              {t('Sign Out')}
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
