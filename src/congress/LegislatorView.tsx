import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Icon from '../Icon';
import * as Root from '../rootTypes';
import * as formatters from '../utilities/formatters';
import styles from './LegislatorView.module.scss';
import NextPrevLink from './NextPrevLink';
import { LegislatorRouteProps } from './routes';
import * as selectors from './selectors';
import { Committee, Legislator, Subcommittee } from './types';

const mapStateToProps = (
  state: Root.State,
  ownProps: LegislatorRouteProps
) => ({
  legislator: selectors.getSelectedLegislator(state, ownProps),
  previousUrlSegment: selectors.getPreviousLegislatorUrlSegment(
    state,
    ownProps
  ),
  nextUrlSegment: selectors.getNextLegislatorUrlSegment(state, ownProps),
});

type Props = LegislatorRouteProps & ReturnType<typeof mapStateToProps>;

class LegislatorView extends PureComponent<Props> {
  render() {
    const { legislator } = this.props;
    if (!legislator) {
      return null;
    }

    const { party, phone, district, availableExternalLinks } = legislator;
    const hasPhoneNumber = !!phone;
    const hasDistrict = legislator.isRepresentative;
    const partyClassName = styles[party];

    return (
      <div className={styles.root}>
        <section>
          <img className={styles.headshot} src={legislator.imageUrl} />
          <div className={styles.title}>
            <h2 className={partyClassName}>{party}</h2>
            <h2>{legislator.titleName}</h2>
          </div>
          <div className={styles.contact}>
            {hasPhoneNumber && (
              <a
                className={`button ${party}`}
                href={`tel:${legislator.sanitizedPhoneNumber}`}
              >
                <Icon name='phone' />
                <span>{phone}</span>
              </a>
            )}
            <div className={styles.socialMedia}>
              {_.map(
                legislator.availableSocialMedia,
                this.renderSocialMediumLink
              )}
            </div>
          </div>
        </section>
        <section className={styles.meta}>
          {hasDistrict && (
            <div className={styles.district}>
              <h4>District</h4>
              <h3>{formatters.district(district)}</h3>
            </div>
          )}
          <div className={styles.office}>
            <h4>Office</h4>
            <h3>{legislator.office}</h3>
          </div>
        </section>
        <section>
          <h4>Committee Assignments</h4>
          <ul className={styles.committees}>
            {_.map(legislator.committees, this.renderCommitteeListing)}
          </ul>
        </section>
        <section>
          <h4>On Other Websites</h4>
          <div className={styles.externalLinks}>
            {_.map(availableExternalLinks, this.renderExternalLink)}
          </div>
        </section>
        <div className={styles.legislatorNav}>
          <NextPrevLink
            urlSegment={this.props.previousUrlSegment}
            iconName='arrowLeft'
          />
          <NextPrevLink
            urlSegment={this.props.nextUrlSegment}
            iconName='arrowRight'
          />
        </div>
      </div>
    );
  }

  renderSocialMediumLink = (medium: any) => (
    <a
      key={medium.name}
      className={`button socicon-${medium.name}`}
      href={medium.url}
    />
  );

  renderExternalLink = (link: any) => (
    <a
      key={link.label}
      className='button small'
      href={link.url}
    >
      {link.label}
    </a>
  );

  renderCommitteeListing = (committee: Committee) => {
    const legislator = this.props.legislator as Legislator;
    const { thomasId, url } = committee;
    const hasUrl = !!url;
    const subcommittees = legislator.subcommittees[thomasId];
    const hasSubcommittees = !!subcommittees && subcommittees.length > 0;

    return (
      <li key={thomasId}>
        <span className={styles.committeeName}>
          {hasUrl ? <a href={url}>{committee.name}</a> : committee.name}
        </span>
        {hasSubcommittees && (
          <ul className={styles.subcommittees}>
            {_.map(subcommittees, this.renderSubcommitteeListing)}
          </ul>
        )}
      </li>
    );
  };

  renderSubcommitteeListing = (subcommittee: Subcommittee) => (
    <li key={subcommittee.thomasId}>
      <span className='muted'>Subcommittee on </span>
      <span>{subcommittee.name}</span>
    </li>
  );
}

const reduxConnected = connect(mapStateToProps);

export default withRouter(reduxConnected(LegislatorView));
