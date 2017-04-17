import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import DashboardPage from './DashboardPage'

describe('(Component) <DashboardPage />', () => {
  it('should render the correct page title', () => {
    const wrapper = shallow(<DashboardPage />)
    expect(wrapper.find('h2').text()).to.equal('Dashboard')
  })

  it('should render a <p> with correct text', () => {
    const wrapper = shallow(<DashboardPage />)
    expect(wrapper.find('p').text()).to.equal('Some info about React Redux Auth0 Kit.')
  })
})