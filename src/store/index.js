import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import goals from './modules/goals'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let localStorage = createPersist({
    namespace: 'proposer-tool-sdg',
    initialState: {},
    expires: 90 * 24 * 60 * 60 * 1e3 // 30 days
})

export default new Vuex.Store({
  modules: {
    goals,
  },
  strict: debug,
  plugins: [localStorage]
})
