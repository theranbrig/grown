import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import IndividualFarm, { INDIVIDUAL_FARM_QUERY } from '../components/IndividualFarm';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeFarm } from '../lib/testUtils';

describe('Individual Farm Page', () => {
	it('should render the individual farm page', async () => {
		const mocks = [
			{
				request: { query: INDIVIDUAL_FARM_QUERY, variables: { id: '1234567890' } },
				result: {
					data: {
						farm: fakeFarm()
					}
				}
			}
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<IndividualFarm id="1234567890" />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		expect(toJSON(wrapper.find('h4'))).toMatchSnapshot();
		expect(toJSON(wrapper.find('img'))).toMatchSnapshot();
		expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
	});

	it('Errors with a not found farm', async () => {
		const mocks = [
			{
				request: { query: INDIVIDUAL_FARM_QUERY, variables: { id: '1234567890' } },
				result: {
					errors: [{ message: 'Farm Not Found' }]
				}
			}
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<IndividualFarm id="1234567890" />
			</MockedProvider>
		);
		await wait();
		wrapper.update();
		console.log(wrapper.debug());
		expect(toJSON(wrapper.find('p'))).toMatchSnapshot();
	});
});
