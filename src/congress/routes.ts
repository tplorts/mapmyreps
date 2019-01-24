import { RouteComponentProps } from 'react-router-dom';
import { Dictionary } from 'lodash';

export interface StateRouteParams extends Dictionary<string> {
  postal: string;
}

export type StateRouteProps = RouteComponentProps<StateRouteParams>;


export interface LegislatorRouteParams extends StateRouteParams {
  bioguideId: string;
}

export type LegislatorRouteProps = RouteComponentProps<LegislatorRouteParams>;
