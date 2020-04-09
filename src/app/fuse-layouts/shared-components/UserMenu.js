import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import * as authActions from 'app/auth/store/actions';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserMenu(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			<Button className="h-64" onClick={userMenuClick}>
				{user.data.photoURL ? (
					<Avatar className="" alt="user photo" src={user.data.photoURL} />
				) : (
						<Avatar className="">{user.data.displayName}</Avatar>
					)}

				<div className="hidden md:flex flex-col mx-12 items-start">
					<Typography component="span" className="normal-case font-600 flex">
						{user.data.displayName}
					</Typography>
					<Typography className="text-11 capitalize" color="textSecondary">
						{user.role.toString()}
					</Typography>
				</div>

				<Icon className="text-16 hidden sm:flex" variant="action">
					keyboard_arrow_down
				</Icon>
			</Button>

			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				{!user.role || user.role.length === 0 ? (
					<>
						<MenuItem component={Link} to="/login" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>lock</Icon>
							</ListItemIcon>
							<ListItemText primary="Login" />
						</MenuItem>
					</>
				) : (
						<>
							<MenuItem component={Link} to="/university/profile/university" onClick={userMenuClose} role="button">
								<ListItemIcon className="min-w-40">
									<Icon>school</Icon>
								</ListItemIcon>
								<ListItemText primary="Edit University Profile" />
							</MenuItem>
							<MenuItem component={Link} to="/university/profile/user" onClick={userMenuClose} role="button">
								<ListItemIcon className="min-w-40">
									<Icon>person</Icon>
								</ListItemIcon>
								<ListItemText primary="Edit User Profile" />
							</MenuItem>
							{/* <MenuItem component={Link} to="/sms/mail" onClick={userMenuClose} role="button">
								<ListItemIcon className="min-w-40">
									<Icon>mail</Icon>
								</ListItemIcon>
								<ListItemText primary="Inbox" />
							</MenuItem> */}
							<MenuItem
								onClick={() => {
									dispatch(authActions.logoutUser());
									userMenuClose();
								}}
							>
								<ListItemIcon className="min-w-40">
									<Icon>exit_to_app</Icon>
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</MenuItem>
						</>
					)}
			</Popover>
		</>
	);
}

export default UserMenu;
