import React from 'react'
import {Route, Redirect, HashRouter as Router} from 'react-router-dom'
import {Switch} from 'react-router'
import Progress from 'react-progress-2'

import './App.scss'
import { Grid } from '@material-ui/core';

const redirectToOrganizationRepoSearch = () => <Redirect to="/org/" />

const OrganizationRepoSearch = React.lazy(() => import('./container/OrganizationRepoSearch/OrganizationRepoSearch'))
const BranchList = React.lazy(() => import('./container/BranchList/BranchList'))

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={"Loading... Please wait"}>
        <div>
          <Progress.Component />
          <div className="container">
              <Grid container spacing={3}>
                <Grid item xs={3}/>
                <Grid item xs={6}>
                  <Router>
                    <Switch>
                        <Route path="/" exact={true} component={redirectToOrganizationRepoSearch} />
                        <Route path="/org/:orgName" component={OrganizationRepoSearch} />
                        <Route path="/org" component={OrganizationRepoSearch} />
                        <Route path="/branch/:orgName/:repoName" component={BranchList} />
                    </Switch>
                  </Router>
                </Grid>
                <Grid item xs={3}/>
              </Grid>
          </div>
        </div>
      </React.Suspense>
    </div>
  );
}

export default App;
