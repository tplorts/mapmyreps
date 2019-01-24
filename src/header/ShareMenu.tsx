import React, { PureComponent } from 'react';
import _ from 'lodash';
import { shareMedia, SocialMedium, getShareUrl } from '../utilities/sharing';
import { classNames } from '../utilities/styles';
import headerStyles from './MainHeader.module.scss';
import styles from './ShareMenu.module.scss';

class ShareMenu extends PureComponent {
  state = {
    isOpen: false,
  };

  setOpen = (isOpen: boolean) => this.setState({ isOpen });

  open = () => this.setOpen(true);
  close = () => this.setOpen(false);

  render = () => (
    <div
      className={classNames([styles.wrapper, this.state.isOpen && styles.open])}
    >
      <div>
        <button
          className={`${styles.openButton} ${headerStyles.link}`}
          onClick={this.open}
        >
          Share
        </button>
      </div>
      <div className={styles.options}>
        {_.map(shareMedia, this.renderLink)}
        <button className={styles.closeButton} onClick={this.close}>
          Close
        </button>
      </div>
    </div>
  );

  renderLink = (medium: SocialMedium) => (
    <a
      key={medium}
      className={`${styles.link} socicon-${medium}`}
      onClick={this.close}
      href={getShareUrl(medium)}
      target='_blank'
    />
  );
}

export default ShareMenu;
