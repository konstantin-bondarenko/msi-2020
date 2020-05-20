import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SideDrawer from './SideDrawer';
import Backdrop from '../../UI/Backdrop/Backdrop';
import DrawerToggle from './DrawerToggle/drawerToggle';
import Favorite from '../Favorite/Favorite';

configure({adapter: new Adapter()})

describe('<SideDrawer />', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<SideDrawer />);
    })

    it('should render <Backdrop /> one time', () => {
        expect(wrapper.find(Backdrop)).toHaveLength(1);
    })
    it('should render <DrawerToggle /> one time', () => {
        expect(wrapper.find(DrawerToggle)).toHaveLength(1);
    })
    it('should render <Favorite /> one time', () => {
        expect(wrapper.find(Favorite)).toHaveLength(1);
    })

})