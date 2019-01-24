import React from 'react';
import { Link } from 'react-router-dom';
import Icon, { IconName } from '../Icon';
import styles from './NextPrevLink.module.scss';

interface Props {
  urlSegment: string | null;
  iconName: IconName;
}

const NextPrevLink: React.SFC<Props> = ({ urlSegment, iconName }) => {
  if (urlSegment === null) {
    return (
      <a>
        <div className={`${styles.root} ${styles.disabled}`}>
          <Icon name={iconName} />
        </div>
      </a>
    );
  }

  return (
    <Link to={urlSegment} className='svg-icon-button'>
      <div className={styles.root}>
        <Icon name={iconName} />
      </div>
    </Link>
  );
};

export default NextPrevLink;
