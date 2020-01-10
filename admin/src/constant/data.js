export const MENU_MAIN = [
	{
		title: '工作台',
		path: '/',
		icon: 'dashboard'
	},
	{
		title: '成员管理',
		path: '/member',
		icon: 'user'
	},
	{
		title: '工作台',
		path: '/',
		icon: 'dashboard'
	},
	{
		title: '图书管理',
		icon: 'book',
		children: [
			{title: '库存管理', path: '/book', icon: 'unordered-list'},
			{title: '借阅管理', path: '/rental', icon: 'reconciliation'}
		]
	},
	{
		title: '用户管理',
		icon: 'user',
		children: [
			{title: '超期罚款', path: '/overdue', icon: 'warning'},
			{title: '用户列表', path: '/userinfo', icon: 'usergroup-add'},
		]
	},
	{
		title: '权限管理',
		icon: 'safety-certificate',
		path: '/auth'
	},
	{
		title: '系统设置',
		path: '/sysconfig',
		icon: 'setting'
	},
]
