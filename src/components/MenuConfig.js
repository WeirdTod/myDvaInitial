const MenuConfig = [{
	id: 100,
	name: 'home',
	path: '',
	icon: 'user',
	power: 'a',
},{
	id: 0,
	name: '用户管理',
	path: 'users',
	icon: 'user',
	power: 'b',
}, {
	id: 1,
	name: '责任人管理',
	path: 'principal',
	icon: 'usergroup-add',
	power: 'c',
}, {
	id: 2,
	name: '设备管理',
	path: 'devices',
	icon: 'scan',
	power: 'd',
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
		power: 'e',
	}, {
		id: 5,
		name: '结构视图',
		path: 'structure',
		icon: 'book',
		power: 'f',
	}],
}];

export default MenuConfig;