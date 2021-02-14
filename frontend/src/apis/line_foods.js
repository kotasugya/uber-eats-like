// --- ここから追加 ---
import { REQUEST_STATE } from '../constants';
import axios from 'axios';
import { lineFoods, lineFoodsReplace } from '../urls/index'

export const postLineFoods = (params) => {
  return axios.post(lineFoods,
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
    .then(res => {
      return res.data
    })
    .catch((e) => { throw e; })
};

export const replaceLineFoods = (params) => {
  return axios.put(lineFoodsReplace,
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
    .then(res => {
      return res.data
    })
    .catch((e) => { throw e; })
};

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL, // 取得状況
  postState: REQUEST_STATE.INITIAL,  // 登録状況
  lineFoodsSummary: null,            // 仮注文データ
};

export const lineFoodsActionTyps = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  POSTING: 'POSTING',
  POST_SUCCESS: 'POST_SUCCESS',
}

export const fetchLineFoods = () => {
  return axios.get(lineFoods)
    .then(res => {
      return res.data
    })
    .catch((e) => { throw e; })
};

export const lineFoodsReducer = (state, action) => {
  switch (action.type) {
    case lineFoodsActionTyps.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case lineFoodsActionTyps.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        lineFoodsSummary: action.payload.lineFoodsSummary,
      };
    case lineFoodsActionTyps.POSTING:
      return {
        ...state,
        postState: REQUEST_STATE.LOADING,
      };
    case lineFoodsActionTyps.POST_SUCCESS:
      return {
        ...state,
        postState: REQUEST_STATE.OK,
      };
    default:
      throw new Error();
  }
}
// --- ここまで追加 ---