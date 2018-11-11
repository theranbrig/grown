import { shallow, mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Header from '../components/Header';
import HomeInformationBox from '../components/HomeInformationBox';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { MockedProvider } from 'react-apollo/test-utils';

const fakeBox = {
	header: 'Title',
	subHeader: 'More Words',
	information: 'Writing',
	image: 'picture.jpg'
};

const notSignedInMocks = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: { data: { me: null } }
	}
];

describe('Header', () => {
	it('should render the Header Logo', () => {
		const wrapper = shallow(<Header />);
		const img = wrapper.find('img');
		expect(img.props().alt).toContain('Grown Logo');
	});
});

describe('NavBar', () => {
	it('should render the Navbar', async () => {
		const wrapper = mount(
			<MockedProvider mocks={notSignedInMocks}>
				<Nav />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const nav = wrapper.find('.navigation-bar');
		expect(toJSON(nav)).toMatchSnapshot();
	});
});

describe('Home Information Box', () => {
	it('should render the Home Information Box', async () => {
		const wrapper = mount(
			<MockedProvider mocks={notSignedInMocks}>
				<HomeInformationBox header={fakeBox.header} image={fakeBox.image} />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		const Header = wrapper.find('Header');
		expect(toJSON(Header)).toMatchSnapshot();
		const img = wrapper.find('Image');
		expect(toJSON(img)).toMatchSnapshot();
	});
});
