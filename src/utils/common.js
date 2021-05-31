import store from "../store";

export function checkLoginStatus() {
    return !!(store.state.token && store.state.userInfo);
}