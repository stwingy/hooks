import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import {firebaseContext} from '../firebase'
function Header() {
	const {user,firebase} = React.useContext(firebaseContext)
	return (
		<div className="header">
      <div className="flexy1">
			<img src="/logo.png" alt="logo" className="logo" />
			
				<NavLink to="/" className="header-title">
					Hooks News
				</NavLink>
			</div>
			<NavLink to="/" className="header-link">
				new
			</NavLink>
			<div className="divider">|</div>
			<NavLink to="/top" className="header-link">
				top
			</NavLink>
			<div className="divider">|</div>
			<NavLink to="/search" className="header-link">
				search
			</NavLink>
			{user && (<><div className="divider">|</div>
			<NavLink to="/create" className="header-link">
				submit
			</NavLink></>)}

			<div className="flexy">
				{user ?(
                 <>
				 <div className ="header-name">{user.displayName}</div>
                
				<div className="header-link" onClick ={()=>firebase.logout()}>logout</div>
				 
				 </>
				):
				(<NavLink to="/login" className="header-login">
					login
				</NavLink>)}
			</div>
		</div>
	);
}

export default withRouter(Header);
