const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ commit }, { user }) {
        commit('loginSuccess', user);
    },
    logout({ commit }) {
        commit('logout');
    }
};

const mutations = {
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};