import * as ACTIONS from "./actions";
import { initialState } from "./AppContext";

export default function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload.msg,
      };
    case ACTIONS.SET_SUCCESS:
      return {
        ...state,
        successMessage: action.payload.msg,
      };
    case ACTIONS.FETCH_START:
      if (action.kind === "postLoad") {
        return {
          ...state,
          isPostLoading: true,
        };
      } else {
        return {
          ...state,
          isLoading: true,
        };
      }

    case ACTIONS.FETCH_STOP:
      if (action.kind === "postLoad") {
        return {
          ...state,
          isPostLoading: false,
        };
      } else {
        return {
          ...state,
          isLoading: false,
        };
      }
    case ACTIONS.INIT_STATE:
      return {
        ...initialState,
      };

    case ACTIONS.CLEAR_MESSAGE:
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
      };
    case ACTIONS.SET_USER_CUSTOMERS:
      return {
        ...state,
        userCustomers: action.payload.userCustomers,
      };
    case ACTIONS.SET_ZONES:
      return {
        ...state,
        zones: action.payload.zones,
      };

    case ACTIONS.SET_STATS:
      return {
        ...state,
        cardStats: action.payload.cardStats,
        monthlyStats: action.payload.monthlyStats,
      };
    case ACTIONS.SET_AGENTS:
      return {
        ...state,
        allAgents: action.payload.allAgents,
      };
    case ACTIONS.SET_CUSTOMERS:
      return {
        ...state,
        allCustomers: action.payload.allCustomers,
      };
    case ACTIONS.SET_TRANSACTIONS:
      return {
        ...state,
        allTransactions: action.payload.allTransactions,
      };
    case ACTIONS.SET_USER_ZONE_T:
      return {
        ...state,
        userZoneTransactions: action.payload.userZoneTransactions,
      };
    case ACTIONS.SET_SINGLE_USER_T:
      return {
        ...state,
        singleUserTransactions: action.payload.singleUserTransactions,
      };
    case ACTIONS.SET_STAFFS:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    default:
      return state;
  }
}
