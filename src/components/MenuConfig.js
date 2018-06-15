const MenuConfig = [{
	id: 100,
	name: 'home',
	path: '',
	icon: 'user',
},{
	id: 0,
	name: '用户管理',
	path: 'users',
	icon: 'user',
}, {
	id: 1,
	name: '责任人管理',
	path: 'principal',
	icon: 'usergroup-add',
}, {
	id: 2,
	name: '设备管理',
	path: 'devices',
	icon: 'scan',
}, {
	id: 3,
	name: '实时数据',
	icon: 'dashboard',
	path: 'view',
	children: [{
		id: 4,
		name: '分布视图',
		path: 'distribute',
		icon: 'global',
	}, {
		id: 5,
		name: '结构视图',
		path: 'structure',
		icon: 'book',
	}],
}];

export default MenuConfig;