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
		email: 'abc@qq.com',
	}, {
		id: 1,
		name: 'admin1',
		about: 'admin1',
		email: 'abcd@qq.com',
	}]
};

export { getUsers, users };