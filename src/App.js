import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import List from './pages/List';
import Detail from './pages/Detail';

function App() {
  return (
	  <Router>
		  <Switch>
			  <Route path='/' component={List} exact />
			  <Route path='/detail/:id' component={Detail} exact />
		  </Switch>
	  </Router>
  );
}

export default App;
