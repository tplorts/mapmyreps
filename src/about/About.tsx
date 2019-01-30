import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styles from './About.module.scss';
import Icon from '../Icon';

interface Author {
  role: string;
  name: string;
  url: string;
}

const authors = [
  {
    name: 'Andrew Sass',
    role: 'Design',
    url: 'http://andrewsass.com',
  },
  {
    name: 'Ted Lorts',
    role: 'Development',
    url: 'http://theodoria.software',
  },
];

const renderAuthor = (author: Author) => (
  <li key={author.url}>
    <div className={styles.role}>{author.role}</div>
    <div className={styles.author}>
      <a href={author.url}>{author.name}</a>
    </div>
  </li>
);

const About = () => (
  <div className={styles.root}>
    <div className='container'>
      <Link className='svg-icon-button' to='/'>
        <Icon name='map' />
      </Link>
      <section className='authors'>
        <h2>Authors</h2>
        <ul>{_.map(authors, renderAuthor)}</ul>
      </section>
      <section className='data-sources'>
        <h2>Data Sources</h2>
        <ul>
          <li>
            <span>Members and committees of Congress: </span>
            <a href='https://theunitedstates.io/'>the @unitedstates project</a>
          </li>
          <li>
            <span>Cartographic data of the 50 states &amp; DC: </span>
            <a href='https://github.com/topojson/us-atlas'>
              U.S. Atlas TopoJSON
            </a>
          </li>
          <li>
            <span>Cartographic data of congressional districts: </span>
            <a href='https://www.census.gov/'>
              The United States Census Bureau
            </a>
            <ul>
              <li>
                <span>And thanks to Mike Bostock for his helpful </span>
                <a href='https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c'>
                  guide
                </a>
                <span>
                  {' '}
                  on working with the cartographic data from the US Census
                  Bureau.
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  </div>
);

function openOptionsDialog() {}

export default About;
