import React, { Component,Fragment } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Barchart from "./barchart/Barchart";

class PageContent extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
          <Route path="/" exact name="Barchart" component={Barchart} />
          <Route component={()=><h1>Page Not Found</h1>} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default PageContent;
