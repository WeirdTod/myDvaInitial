const getUsers = () => {
	return {
		users: [{
			id: 0,
			name: 'addddmin0',
			about: 'admin0',
			email: 'abc@qq.com',
		}, {
			id: 1,
			name: 'admin1',
			about: 'admin1',
			email: 'abcd@qq.com',
		}]
	};
}

const users = {
	users: [{
		id: 0,
		name: 'admin0',
		about: 'admin0',
		email: 'abc0@qq.com',
		power: 'abc',
		disable: 0,
	}, {
		id: 1,
		name: 'admin1',
		about: 'admin1',
		email: 'abcd1@qq.com',
		power: 'abcde',
		disable: 1,
	}, {
		id: 2,
		name: 'admin2',
		about: 'admin2',
		email: 'abcd2@qq.com',
		power: 'acd',
		disable: 0,
	}]
};

export { getUsers, users };