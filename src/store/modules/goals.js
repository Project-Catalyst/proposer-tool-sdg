// initial state
const getDefaultState = () => ({
  selectedGoals: [],
  selectedSubgoals: [],
  selectedMetrics: []
})
const state = getDefaultState()

// getters
const getters = {}

// actions
const actions = {
}

// mutations
const mutations = {
  addGoal(state, goal) {
    var found = state.selectedGoals.filter((sgoal) => goal.id === sgoal.id)
    if (found.length === 0) {
      state.selectedGoals.push(goal)
    }
    state.selectedGoals = state.selectedGoals.sort((a, b) => a.id - b.id)
  },
  removeGoal(state, goal) {
    var found = state.selectedGoals.filter((sgoal) => goal.id === sgoal.id)
    if (found.length > 0) {
      state.selectedGoals.splice(found, 1)
    }
  },
  addSubgoal(state, subgoal) {
    var found = state.selectedSubgoals.filter((ssgoal) => ssgoal.id === subgoal.id)
    if (found.length === 0) {
      state.selectedSubgoals.push(subgoal)
    }
    state.selectedSubgoals = state.selectedSubgoals.sort(
      (a, b) => a.id.localeCompare(b.id)
    )
  },
  removeSubgoal(state, subgoal) {
    var found = state.selectedSubgoals.filter((ssgoal) => ssgoal.id === subgoal.id)
    if (found.length > 0) {
      state.selectedSubgoals.splice(found, 1)
    }
  },
  setMetrics(state, metrics) {
    state.selectedMetrics = metrics
  },
  resetState (state) {
    Object.assign(state, getDefaultState())
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
