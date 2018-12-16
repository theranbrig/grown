import { shallow } from 'enzyme';
import Farms from '../components/Farms';
import Farm from '../components/Farm';

const fakeFarm = {
  id: '1234567890',
  name: 'Farmy McFarmson',
  description: 'Great Stuff',
  location: 'The World',
  email: 'email@email.com',
  phone: '123-456-7890',
  image: 'farm.jpg',
  website: 'www.farm.com',
};

describe('View All Farms Component', () => {
  it('should render the view all farms component', () => {
    const wrapper = shallow(<Farms />);
    const title = wrapper.find('h2');
    expect(title.text()).toContain('View GROWN Farms');
  });
});

describe('View Farm Item Box', () => {
  it('should render out an individual farm link properly.', () => {
    const wrapper = shallow(<Farm farm={fakeFarm} />);
    const farmName = wrapper.find('h3');
    const image = wrapper.find('Image');
    const location = wrapper.find('p');
    expect(farmName.text()).toBe(fakeFarm.name);
    expect(image.props().src).toBe(fakeFarm.image);
    expect(location.text()).toBe(`<Icon />${fakeFarm.location}`);
  });
});
