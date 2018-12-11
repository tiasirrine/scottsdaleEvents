import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Estimates from './Estimates';
import ViewEstimate from './ViewEstimate';

const Routes = props => {
	return (
		<Switch>
			<Route exact path="/estimates" component={Estimates} />
			<Route exact path="/estimates/:id" component={ViewEstimate} />
		</Switch>
	);
};

export default Routes;
