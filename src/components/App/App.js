import React from 'react'
import { HeaderContainer } from '../../containers'
import { ReflexContainer/*, ReflexElement*/ } from 'react-reflex'
import { PropTypes } from 'prop-types'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLogin() // check is Auth0 lock is authenticating after login callback
  }

  render() {
    return(
      <ReflexContainer>
        <HeaderContainer />
        {this.props.children}
      </ReflexContainer>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  checkLogin: PropTypes.func.isRequired
}

export default App
