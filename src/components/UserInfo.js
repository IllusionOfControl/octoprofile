import React from 'react';
import PropTypes from 'prop-types';
import Octicon, { Briefcase, Calendar, Location } from '@primer/octicons-react';
import UserInfoStyles from './styles/UserInfoStyles';
import { Section } from '../style';

const UserInfo = ({ userData }) => (
  <Section dark>
    {userData && (
      <UserInfoStyles>
        <div className="avatar">
          <img src={userData.avatar_url} alt="avatar" />
        </div>

        <h1>{userData.name}</h1>

        {userData.bio && (
        <h3>
          {userData.bio}
        </h3>
        )}

        <h2>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            @{userData.login}
          </a>
        </h2>

        <div className="info">
          {userData.company && (
            <span className="info__item">
              <Octicon icon={Briefcase} size="small" />
              {userData.company}
            </span>
          )}

          {userData.location && (
            <span className="info__item">
              <Octicon icon={Location} size="small" />
              {userData.location}
            </span>
          )}

          {userData.created_at && (
            <span className="info__item">
              <Octicon icon={Calendar} size="small" />
              Joined{' '}
              {new Date(userData.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
        </div>

        <div className="stats">
          <div className="stats__item">
            <span className="num">{userData.public_repos}</span>
            <span className="num-label">Repositories</span>
          </div>
          <div className="stats__item">
            <span className="num">{userData.followers}</span>
            <span className="num-label">Followers</span>
          </div>
          <div className="stats__item">
            <span className="num">{userData.following}</span>
            <span className="num-label">Following</span>
          </div>
        </div>
      </UserInfoStyles>
    )}
  </Section>
);

UserInfo.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default UserInfo;
