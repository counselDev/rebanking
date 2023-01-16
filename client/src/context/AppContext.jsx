import axios from "axios";
import { useContext, createContext, useReducer } from "react";
import reducer from "./reducer";
import * as ACTIONS from "./actions";

const AppContext = createContext();

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

export const useAppContext = () => {
  return useContext(AppContext);
};

export const initialState = {
  user: user || null,
  token: token || null,
  cardStats: null,
  monthlyStats: null,
  customersApplication: null,
  allTransactions: null,
  allCustomers: null,
  allAgents: null,
  userZoneTransactions: null,
  singleUserTransactions: null,
  userCustomers: null,
  zones: null,
  users: null,
  totalStaffs: null,
  numOfPages: 1,
  searchCustomers: "",
  searchAgents: "",
  searchZone: "",
  isLoading: false,
  isPostLoading: false,
  successMessage: "",
  errorMessage: "",
  selectedApplication: null,
  selectedPendingApplication: null,
  path: "",
  whoIsLogging: "user",
  showMobileNav: false,
  moneyFormat: new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }),
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Instance Setup
  const authFetch = axios.create({
    baseURL: "/api",
  });

  //request Interceptor
  authFetch.interceptors.request.use(
    (config) => {
      dispatch({ type: ACTIONS.FETCH_START });
      config.headers.Authorization = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      dispatch({ type: ACTIONS.FETCH_STOP });
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      dispatch({ type: ACTIONS.FETCH_STOP });
      return response;
    },
    (error) => {
      dispatch({ type: ACTIONS.FETCH_STOP });
      const err = error.response;
      // console.log(err);

      if (err.status === 401 || err.status === 500) {
        // logout();
        dispatch({ type: ACTIONS.INIT_STATE });
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const login = async (payload) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START, kind: "postLoad" });
      const res = await axios.post(
        `/api/auth/login?userType=${state.whoIsLogging}`,
        payload
      );
      const { token, user } = res.data;

      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user,
          token,
        },
      });

      addUserToLocalStorage({ user, token });

      dispatch({ type: ACTIONS.FETCH_STOP, kind: "postLoad" });
      return user;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_STOP, kind: "postLoad" });
      setError(error);
    }
  };

  const getAllAgents = async () => {
    const { searchAgents } = state;
    try {
      const res = await authFetch.get(`/users/?search=${searchAgents}`);
      dispatch({
        type: ACTIONS.SET_AGENTS,
        payload: { allAgents: res.data },
      });
    } catch (error) {
      setError(error);
    }
  };
  const getAllCustomers = async () => {
    const { searchCustomers } = state;
    try {
      const res = await authFetch.get(`/customers/?search=${searchCustomers}`);
      dispatch({
        type: ACTIONS.SET_CUSTOMERS,
        payload: { allCustomers: res.data },
      });
    } catch (error) {
      setError(error);
    }
  };
  const getAllTransactions = async () => {
    const { searchAgents } = state;
    try {
      const res = await authFetch.get(
        `/transactions?search=${searchAgents}&sort=latest`
      );
      dispatch({
        type: ACTIONS.SET_TRANSACTIONS,
        payload: { allTransactions: res.data },
      });
    } catch (error) {
      setError(error);
    }
  };
  const getUserZoneTransactions = async () => {
    try {
      const { user } = state;

      const res = await authFetch.get(
        `/transactions/${user?._id}?zoneId=${user?.zone?.zoneId}`
      );
      dispatch({
        type: ACTIONS.SET_USER_ZONE_T,
        payload: { userZoneTransactions: res.data },
      });
    } catch (error) {
      setError(error);
    }
  };
  const getSingleUserTransactions = async () => {
    try {
      const { searchAgents } = state;
      let url = `/transactions/user`;
      if (searchAgents) {
        url += `?search=${searchAgents}`;
      }
      const res = await authFetch.get(url);
      dispatch({
        type: ACTIONS.SET_SINGLE_USER_T,
        payload: { singleUserTransactions: res.data },
      });
    } catch (error) {
      setError(error);
    }
  };

  const getStats = async () => {
    try {
      const cardsRes = await authFetch.get("/stats");
      const monthlyRes = await authFetch.get("/stats/monthly");
      dispatch({
        type: ACTIONS.SET_STATS,
        payload: {
          cardStats: cardsRes.data,
          monthlyStats: monthlyRes.data,
        },
      });
    } catch (error) {
      setError(error);
    }
  };

  const getUserCustomers = async () => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const { user, searchCustomers } = state;

      let url = `/customers/zone/${user.zone.zoneId}`;
      if (searchCustomers) {
        url = url + "?search=" + searchCustomers;
      }
      const res = await authFetch.get(url);
      dispatch({
        type: ACTIONS.SET_USER_CUSTOMERS,
        payload: { userCustomers: res.data },
      });

      dispatch({ type: ACTIONS.FETCH_STOP });
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_STOP });

      setError(error);
    }
  };

  const getCustomerInfo = async (id) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });

      const res = await authFetch.get(`/customers/${id}`);

      dispatch({ type: ACTIONS.FETCH_STOP });
      return res.data;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_STOP });

      setError(error);
    }
  };

  const addSaved = async (payload) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START, kind: "postLoad" });
      const { user } = state;

      const { data } = await authFetch.post("/transactions/", {
        amount: payload.amount,
        zone: user.zone.zoneId,
        customer: payload.customerId,
      });

      setMessage(" Money Saved Successfully ");
      dispatch({ type: ACTIONS.FETCH_STOP, kind: "postLoad" });
      return data;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_STOP, kind: "postLoad" });

      setError(error);
    }
  };

  const addAgent = async (payload) => {
    try {
      const { zone } = payload;

      if (!zone) {
        setError({ response: { data: { msg: "Please Select A Zone" } } });
        return;
      }
      dispatch({ type: ACTIONS.FETCH_START, kind: "postLoad" });

      const { data } = await authFetch.post("/users/", payload);

      setMessage(" Agents Added Successfully ");
      await getAllAgents();
      dispatch({ type: ACTIONS.FETCH_STOP, kind: "postLoad" });
      return data;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_STOP, kind: "postLoad" });
      setError(error);
    }
  };
  const addZone = async (payload) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START, kind: "postLoad" });

      const { data } = await authFetch.post("/zones/", payload);

      setMessage(" Zone Created Successfully ");
      await getZones();
      dispatch({ type: ACTIONS.FETCH_STOP, kind: "postLoad" });
      return data;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_STOP, kind: "postLoad" });
      setError(error);
    }
  };

  const getZones = async () => {
    try {
      const res = await authFetch.get(`/zones`);
      dispatch({
        type: ACTIONS.SET_ZONES,
        payload: { zones: res.data },
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const addCustomer = async (payload) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START, kind: "postLoad" });
      console.log("addCustomer");

      const res = await authFetch.post(`/customers`, payload);
      setMessage(" Customer added Successfully");

      dispatch({ type: ACTIONS.FETCH_STOP, kind: "postLoad" });
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_STOP, kind: "postLoad" });

      setError(error);
    }
  };

  const handleFieldChange = (field, value) => {
    dispatch({ type: ACTIONS.HANDLE_CHANGE, payload: { field, value } });
  };

  const updateApplicationState = async (id, attachment) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });

      const res = await authFetch.patch(`/applications/${id}`, {
        attachment: JSON.stringify(attachment),
      });
      await getStats();

      dispatch({ type: ACTIONS.FETCH_STOP });
      return res.data;
    } catch (error) {
      setError(error);
    }
  };

  const logout = () => {
    dispatch({ type: ACTIONS.LOGOUT });
    removeUserFromLocalStorage();
  };
  const clearMessage = () => {
    dispatch({ type: ACTIONS.CLEAR_MESSAGE });
  };

  const setMessage = (msg) => {
    dispatch({
      type: ACTIONS.SET_SUCCESS,
      payload: { successMessage: msg },
    });

    setTimeout(() => {
      clearMessage();
    }, 5000);
  };
  const setError = (error) => {
    if (error?.response) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error?.response?.data?.msg },
      });
    } else {
      // dispatch({
      //   type: ACTIONS.SET_ERROR,
      //   payload: { msg: error },
      // });
      console.error(error);
    }

    setTimeout(() => {
      clearMessage();
    }, 5000);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        login,
        getStats,
        logout,
        handleFieldChange,
        clearMessage,
        getAllTransactions,
        getAllAgents,
        getAllCustomers,
        getUserZoneTransactions,
        getSingleUserTransactions,
        getZones,
        getCustomerInfo,
        getUserCustomers,
        updateApplicationState,
        addCustomer,
        addSaved,
        addAgent,
        addZone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
