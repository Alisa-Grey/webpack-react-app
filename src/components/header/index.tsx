import React, { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Avatar,
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@mui/material';
import CustomButton from '../common/button';
import Logo from '../../assets/img/logo.jpg';
import './style.scss';

const menu = [
  { title: 'Current loans', link: '/customer/loans' },
  { title: 'My profile', link: '/customer/profile' },
  { title: 'History', link: '/customer/history' },
];

interface IHeaderProps {
  data: { [key: string]: string | number };
}

const Header: FC<IHeaderProps> = ({ data }) => {
  const headerLogo = new Image();
  headerLogo.src = Logo;
  const avatar = (data.first_name as string)[0];

  const [open, setOpen] = useState(false);
  const [btnClass, setBtnClass] = useState('');
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
    setBtnClass('opened');
  };

  const handleClose = (event: Event | React.SyntheticEvent): void => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
    setBtnClass('');
  };

  function handleListKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <Box className="header">
      <img src={Logo} alt="Company logo" className="header__logo" />
      <Box
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <div>
          <Button className={`menu__button ${btnClass}`}>
            <Avatar className="avatar">{avatar}</Avatar>
            {`${data.first_name} ${data.last_name}`}
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom"
            transition
            disablePortal
            style={{ zIndex: '99' }}
          >
            {({ TransitionProps, placement }): any => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {menu.map((item, index) => (
                        <MenuItem key={index} className="menu__item">
                          <Link to={`${item.link}`} className="menu__link">
                            {item.title}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Box>
    </Box>
  );
};

export default Header;
