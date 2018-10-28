import { shallow } from 'enzyme';
import Header from '../components/Header';
import HomeInformationBox from '../components/HomeInformationBox';
import Nav from '../components/Nav';

const fakeBox = {
	header: 'Title',
	subHeader: 'More Words',
	information: 'Writing',
	image: 'picture.jpg'
};

describe('Header', () => {
	it('should render the Header Logo', () => {
		const wrapper = shallow(<Header />);
		const img = wrapper.find('img');
		expect(img.props().alt).toContain('Grown Logo');
	});
});

describe('NavBar', () => {
	it('should render the Navbar', () => {
		const wrapper = shallow(<Nav />);
		const homeLink = wrapper.find('a');
		const navigation = wrapper.find('.navigation-bar');
		expect(homeLink.length).toBe(2);
		expect(navigation.find('Link').exists()).toBe(true);
	});
});

describe('Home Information Box', () => {
	it('should render the Home Information Box', () => {
		const wrapper = shallow(<HomeInformationBox header={fakeBox.header} image={fakeBox.image} />);
		const Header = wrapper.find('Header');
		expect(Header.children().text()).toBe(fakeBox.header);
		const img = wrapper.find('Image');
		expect(img.props().src).toContain(fakeBox.image);
	});
});
