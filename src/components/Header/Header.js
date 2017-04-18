import React from 'react'
// import { Link } from 'react-router'
// import { ReflexElement } from 'react-reflex'
import { PropTypes } from 'prop-types'
import './Header.css'
import defaultUserIcon from '../../images/defaultuser.png'

const Header = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) =>
  <nav role='navigation' className='header grid'>
    <ul className='grid__col-sm-12 grid-wrap grid--direction-row grid--align-center'>
      <li className='-logo'>
        <a href='/'>
          <span className='-img'>CloudTaps</span>
        </a>
      </li>
      { !isAuthenticated ? (
        <li className='cmd'>
          <a onClick={onLoginClick}>Login</a>
        </li>
      ) : (<div>
        <li>
          <span className='-profile'>{profile.nickname}</span>
        </li>
        <li className='dropdown cmd' onClick={onLogoutClick}>
          <img className='avatar' src={ profile.picture.length > 0 ? profile.picture : defaultUserIcon } />
          <i className='arrow-down'></i>
        </li>
        </div>
      )}
    </ul>
    {
      console.log(error)
    }
  </nav>

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  error: PropTypes.string,
  onLoginClick: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired
}

export default Header
