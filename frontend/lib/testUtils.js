import casual from 'casual';

// seed it so we get consistent results
casual.seed(777);

const fakeFarm = () => ({
	__typename: 'Farm',
	id: '1234567890',
	name: 'Farmy McFarmson',
	description: 'Great Stuff',
	location: 'The World',
	email: 'email@email.com',
	phone: '123-456-7890',
	image: 'farm.jpg',
	website: 'www.farm.com'
});

const fakeUser = () => ({
	__typename: 'User',
	id: '4234',
	name: casual.name,
	email: casual.email,
	permissions: ['ADMIN'],
	orders: [],
	cart: []
});

// Fake LocalStorage
class LocalStorageMock {
	constructor() {
		this.store = {};
	}

	clear() {
		this.store = {};
	}

	getFarm(key) {
		return this.store[key] || null;
	}

	setItem(key, value) {
		this.store[key] = value.toString();
	}

	removeItem(key) {
		delete this.store[key];
	}
}

export { LocalStorageMock, fakeFarm, fakeUser, fakeCartItem, fakeOrder, fakeOrderItem };
