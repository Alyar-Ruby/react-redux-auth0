import React, { PropTypes } from 'react'
import './CommandButton.css'

class CommandButton extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['normal', 'default', 'cancel']),
    style: PropTypes.object,
    className: PropTypes.string,
    clickHandler: PropTypes.func,
    children: PropTypes.any,
  }

  constructor(props) {
    super(props)
  }

  onClick(event) {
    event.preventDefault()

    const { clickHandler } = this.props
    if (clickHandler == undefined)
      return

    const handler = clickHandler()

    if (handler/* && handler instanceof Promise*/) {
      handler.then(() => {
        // ...
      })
    }
  }

  render() {
    const classNames = 'pushButton ' + (this.props.type != 'cancel' ? '' : 'cancelButton ' ) + (this.props.className != undefined ? this.props.className : '')

    return (
      <button className={classNames} onClick={event => this.onClick(event)} style= { this.props.style != undefined ? this.props.style : {} } >
        { this.props.children }
      </button>
    )
  }
}

export default CommandButton