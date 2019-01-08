import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Suggestions from '../components/Suggestions.jsx';
import Carousel from '../components/Carousel.jsx';
import TooltipList from '../components/TooltipList.jsx'

Enzyme.configure({ adapter: new Adapter() });

describe('Suggestions Component', () => {
  test('renders Suggestion properly', () => {
    const wrapper = shallow(<Suggestions />);
    expect(wrapper).toHaveLength(1);
  });

  test('renders one Carousel component', () => {
    const wrapper = shallow(<Suggestions />);
    expect(wrapper.find(Carousel)).toHaveLength(1);
  });

  test('renders one tooltip component', () => {
    const wrapper = shallow(<Suggestions />);
    expect(wrapper.find(TooltipList)).toHaveLength(1);
  });
});
