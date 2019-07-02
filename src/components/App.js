import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Auth/Login';
import CreateLink from './Link/CreateLink';
import ForgotPassword from './Auth/ForgotPassword';
import SearchLinks from './Link/SearchLinks';
import LinkList from './Link/LinkList';
import LinkDetail from './Link/LinkDetail';
import Header from './Header';
import useAuth from '../components/Auth/useAuth'
import firebase,{firebaseContext} from '../firebase'
function App() {
	const user = useAuth()
	return (
		<BrowserRouter>
		<firebaseContext.Provider value ={{user,firebase}}>
			<div className="app-container">
				<Header />
				<div className="route-container">
					<Switch>
						<Route path="/" exact render={() => <Redirect to="/new/1" />} />
						<Route path="/create" component={CreateLink} />
						<Route path="/login" component={Login} />
						<Route path="/forgot" component={ForgotPassword} />
						<Route path="/search" component={SearchLinks} />
						<Route path="/top" component={LinkList} />
						<Route path="/new/:page" component={LinkList} />
						<Route path="/link/:linkId" component={LinkDetail} />
					</Switch>
				</div>
			</div>
			</firebaseContext.Provider>
		</BrowserRouter>
	);
}

export default App;
