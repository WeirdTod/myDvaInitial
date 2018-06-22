import { hashHistory } from 'dva/router';

//处理异步请求
import request from '../utils/request';
import qs from 'qs';
async function query(params) {
	return request(`/api/users${qs.stringify(params)}`);
}

export default {
	namespace: 'users', 

	state: {
		list: [],
		loading: false,
	},

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				if (location.pathname === '/home/users') {
					dispatch({
						type: 'query',
						payload: {}
					});
				}
			});
		},
	},

	effects: {
		*query({ payload }, { select, call, put}){
			yield put({ type: 'showLoading' });
			const { data } = yield call(query);
			if (data) {
				yield put({
					type: 'querySuccess',
					payload: {
						list: data.users,
					}
				});
			}
		},
		*create(){},
		*'delete'(){},
		*update(){},
	},

	reducers: {

		showLoading(state, action){
			return {...state, loading: true};
		},

		showModal(){},

		hideModal(){},

		//使用静态数据返回
		querySuccess(state, action){
			const { list } = action.payload;
			return {...state, list, loading: false};
		},

		setEditable(state, { payload }){
			const { list } = state;
			const { id, editable } = payload;
			const newList = list.map(item => ({...item}));
			let target = newList.filter(item => item.id === id)[0];
			if (target) {
				target.editable = editable;
			}
			return {...state, list: newList};
		},

		cancel(state, { payload }){
			const { list } = state;
			const { id, value } = payload;
			const newList = list.map(item => ({...item}));
			let target = newList.filter(item => item.id === id)[0];
			if (target) {
				target = Object.assign(target, value);
				target.editable ? delete target.editable : void 0;
			}
			return {...state, list: newList};
		},

		handleChange(state, { payload }){
			const { id, column, value } = payload;
			const newList = state.list.map(item => ({...item}));
			let target = newList.filter(item => item.id === id)[0];
			if (target) {
				target[column] = value;
			}
			return {...state, list: newList};
		},

		createSuccess(){},

		deleteSuccess(){},

		updateSuccess(state, { payload }){
			
		},

	},
}