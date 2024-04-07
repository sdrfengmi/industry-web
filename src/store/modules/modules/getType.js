
export default {
  namespaced: true,
  state: {
    abc: []
  },
  actions: {
    async loadTdlylxList({ state }) {
      if (state.abc.length > 0) return;
      try {
        console.log('11')
      } catch (err) {
        console.error(err);
        state.abc = [];
        return
      }
      state.abc = [{ a: 123 }];
    }
  }
}