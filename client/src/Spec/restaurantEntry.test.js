import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RestaurantEntry from '../components/RestaurantEntry';

const sampleData = {
  bookmarked: true,
  food: 'eos eveniet aut',
  id: 1,
  minimum: 14,
  name: 'Gottlieb - Gulgowski',
  picture: "https://s.hdnux.com/photos/72/15/17/15351087/7/premium_landscape.jpg",
  review: {username: "Jameson", review: "Soluta sed perferendis."},
  reviewNo: 509,
  reviewSummary: {
    stars: 9,
    good: 69,
    onTime: 66,
    accurate: 82,
  },
  suggestions: [3, 4, 28, 29, 35, 43, 52, 54, 62, 83, 91, 99],
  waitingTime: 14,
};


Enzyme.configure({ adapter: new Adapter() });

describe('RestaurantEntry Component', () => {
  test('should render component properly', () => {
    const wrapper = shallow(<RestaurantEntry restaurant={sampleData}/>);
    expect(wrapper).toHaveLength(1);
  });

  test('should render one image with provided url', () => {
    const wrapper = shallow(<RestaurantEntry restaurant={sampleData}/>);
    expect(wrapper.find('.restaurantPic')).toHaveLength(1);
  });

  test('should render one restaurant name', () => {
    const wrapper = shallow(<RestaurantEntry restaurant={sampleData}/>);
    expect(wrapper.find('.name')).toHaveLength(1);
    expect(wrapper.find('.name').text()).toEqual('Gottlieb - Gulgowski');
  });

  test('should render one cuisine type', () => {
    const wrapper = shallow(<RestaurantEntry restaurant={sampleData}/>);
    expect(wrapper.find('.cuisine')).toHaveLength(1);
    expect(wrapper.find('.cuisine').text()).toEqual('eos, eveniet...');
  });
});
