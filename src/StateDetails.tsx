import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';

interface StateRouteParams {
  postal: string;
}

class StateDetails extends PureComponent<
  RouteComponentProps<StateRouteParams>
> {
  render() {
    return (
      <div>
        <p>{this.props.match.params.postal}</p>
        <Link to="/">Back</Link>
      </div>
    );
  }
}

export default withRouter(StateDetails);
