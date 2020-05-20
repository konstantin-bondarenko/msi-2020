import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MainScreen from './MainScreen';
import JokeBox from '../../Components/JokeBox/JokeBox';
import Favorite from '../../Components/Favorite/Favorite';
import DrawerToggle from '../../Components/SideDrawer/DrawerToggle/drawerToggle';
import Category from '../../UI/Category/Category';
import Spinner from '../../UI/Spinner/Spinner';
import Warning from '../../UI/Warning/Warning';

configure({adapter: new Adapter()})

describe('<MainScreen />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<MainScreen />)
    })

    it('should render <Favorite /> one time', () => {
        expect(wrapper.find(Favorite)).toHaveLength(1);
    })

    it('should render <DrawerToggle /> one time', () => {
        expect(wrapper.find(DrawerToggle)).toHaveLength(1);
    })

    it('should render <JokeBox /> one time if popup false', () => {
        expect(wrapper.find(JokeBox)).toHaveLength(1);
    })

    it('should render <JokeBox /> one time if popup true', () => {
        wrapper.setProps({popup: true, data: [{id: 1},{id: 2},{id: 3}]})
        expect(wrapper.find(JokeBox)).toHaveLength(3);
    })

    it('should render <Category /> if categories true', () => {
        wrapper.setProps({categories: true, category: [{},{},{}] })
        expect(wrapper.find(Category)).toHaveLength(3);
    })

    it('should render <Warning /> if search and warning', () => {
        wrapper.setProps({search: true, warning: true})
        expect(wrapper.find(Warning)).toHaveLength(1);
    })

    it('should render <Warning /> if categories and warning', () => {
        wrapper.setProps({categories: true, warning: true, category: [{},{},{}] })
        expect(wrapper.find(Warning)).toHaveLength(1);
    })
    it('should render <Warning /> if categories and warning', () => {
        wrapper.setProps({loading: true })
        expect(wrapper.find(Spinner)).toHaveLength(1);
    })
})