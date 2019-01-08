import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Carousel from '../components/Carousel.jsx';
import RestaurantEntry from '../components/RestaurantEntry.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Carousel', () => {
  const restaurants = [{}, {}, {}, {}];

  test('should render the number of restaurants given as props', () => {
    const wrapper = shallow(
      <Carousel restaurants={restaurants} />
    );
    expect(wrapper.find(RestaurantEntry)).toHaveLength(4);
  });

  test('should not render prev button when displaying top 3 restaurants', () => {
    const active = 0;
    const wrapper = shallow(
      <Carousel restaurants={restaurants} active={active} />,
    );
    expect(wrapper.find('#prevButton').exists()).toBe(false);
  });

  test('should not render next button when displaying last 3 restaurants', () => {
    const active = 3;
    const wrapper = shallow(
      <Carousel restaurants={restaurants} active={active} />,
    );
    expect(wrapper.find('#nextButton').exists()).toBe(false);
  });

  test('should render both buttons when displaying 4th-6th restaurants', () => {
    const active = 1;
    const wrapper = shallow(
      <Carousel restaurants={restaurants} active={active} />,
    );
    expect(wrapper.find('#prevButton').exists()).toBe(true);
    expect(wrapper.find('#nextButton').exists()).toBe(true);
  });
});
