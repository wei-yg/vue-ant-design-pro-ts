import router from "../../router";

const state = {
  step: {
    payAccount: "2904xxxx@qq.com",
    receiverAccount: {
      type: "alipay",
      number: "111",
    },
    userName: "111",
    money: 1,
    desc: "11"
  }
};

const actions = {
  async saveStep1FormData({ commit }:any, { payload }:any) {
    commit("saveStep1FormData", payload);
    router.push("/form/step-form/result");
  }
};

const mutations = {
  saveStep1FormData(state: any, { payload }: any) {
    state.step = {
      ...state.step,
      ...payload
    };
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
