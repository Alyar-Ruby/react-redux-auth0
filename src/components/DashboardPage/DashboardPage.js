import React from 'react'
import './DashboardPage.css'

class DashboardPage extends React.Component {
  constructor(props) {
    super(props)
  }

  sidebarContent() {
    return (
      <div className='tabs'> 
        <div className='tab'>
          <input className='tab-radio' type='radio' id='tab-1' name='tab-group-1' defaultChecked></input>
          <label className='tab-label' htmlFor='tab-1'>Design</label>
          
          <div className='tab-panel'>
            <div className='tab-content'>
              <p>Your AWS inventory 1</p>
              <p>&nbsp;</p>
              <p>Add an AWS account to import your inventory and enable live data</p>
            </div>
          </div> 
        </div>
        
        <div className='tab'>
          <input className='tab-radio' type='radio' id='tab-2' name='tab-group-1'></input>
          <label className='tab-label' htmlFor='tab-2'>Live</label>
          
          <div className='tab-panel'>
            <div className='tab-content'>
              <p>Your AWS inventory 2</p>
              <p>&nbsp;</p>
              <p>Add an AWS account to import your inventory and enable live data</p>
              <button className='pushButton' type='button'>
                <p className='plusicon'>+</p>
                Add AWS Account
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='dashboard-content'>
        <div className='grid__col-xs-6 grid__col-sm-4 grid__col-md-3'>
          { this.sidebarContent() }
        </div>
        <div className='grid__col_xs-6 grid__col-sm-7 grid__col-md-7'>
          <div className='welcomeBox'>
            <h1>Welcome to Cloudtaps</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollited.
            </p>
          </div>
        </div>
      </div>

    )
  }
}

export default DashboardPage