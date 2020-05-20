import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Layout from './Layout';
import SideDrawer from '../../Components/SideDrawer/SideDrawer';
import MainScreen from '../MainScreen/MainScreen';

configure({adapter: new Adapter()})

describe('<Layout />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Layout />)
    })

    it('should render <SideDrawer /> one time', () => {
        expect(wrapper.find(SideDrawer)).toHaveLength(1);
    })
    it('should render <MainScreen /> one time', () => {
        expect(wrapper.find(MainScreen)).toHaveLength(1);
    })
})

describe('Layout fetch', () => {
    it('fetches data from server when server returns a successful response', done => { // 1
      const mockSuccessResponse = {};
      const mockJsonPromise = Promise.resolve(mockSuccessResponse);
      const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
      });
      jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
      
      const wrapper = shallow(<Layout />);
                              
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenCalledWith('https://api.chucknorris.io/jokes/random');
  
      process.nextTick(() => {
        expect(wrapper.state()).toEqual({
            showSideDrawer: false,
            data: [{like: false}],
            temp: [],
            category: {},
            matchUp: [],
            url: 'https://api.chucknorris.io/jokes/',
            path: 'random',
            search: false,
            categories: false,
            popup: false,
            like: false,
            warning: false,
            active: false,
            loading: false,
            words: ''
        });
  
        global.fetch.mockClear();
        done();
      });
    });
  });