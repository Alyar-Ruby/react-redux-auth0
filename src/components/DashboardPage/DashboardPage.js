import React from 'react'
import './DashboardPage.css'

const DashboardPage = () => (
  <div>
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
  </div>
)

export default DashboardPage