import React from 'react';
import { FiArrowLeft, FiPower, FiUser } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '@hooks/auth';

import logo from '@assets/logo.png';

import checkImageFaker from '@utils/checkImageFaker';

import { Container, HeaderContent, Menu, Profile } from './styles';

const Header: React.FC = () => {
  const {
    signOut,
    user: { name, avatarUrl, avatar, id }
  } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const getAvatar = checkImageFaker({ avatarUrl, avatar, id });

  return (
    <Container>
      <HeaderContent>
        <Link to="/">
          <img src={logo} alt="Agenda Tattoo" />
        </Link>

        <Menu>
          {location.pathname !== '/dashboard' && (
            <li>
              <span onClick={() => history.goBack()} aria-hidden="true">
                <FiArrowLeft size={24} />
              </span>
            </li>
          )}
          <li>
            <Link to="/providers">Tatuadores</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </Menu>

        <Profile>
          {getAvatar ? (
            <img src={getAvatar.toString()} alt={name} />
          ) : (
            <FiUser size={30} />
          )}
          <div>
            <span>Bem-vindo,</span>
            <Link to="/profile">
              <strong>{name}</strong>
            </Link>
          </div>

          <button type="button" onClick={signOut}>
            <FiPower size={20} />
          </button>
        </Profile>
      </HeaderContent>
    </Container>
  );
};

export default Header;
