// initial state
const getDefaultState = () => ({
  selectedGoals: [],
  selectedSubgoals: [],
  selectedMetrics: [],
  selectedIndexes: []
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
  addIndex(state, uhri) {
    // ADJUST THIS FUNCTION TO UHRI
    var found = state.selectedIndexes.filter((ssgoal) => ssgoal.id === uhri.id)
    if (found.length === 0) {
      state.selectedIndexes.push(uhri)
    }
    state.selectedIndexes = state.selectedIndexes.sort(
      (a, b) => a.id.localeCompare(b.id)
    )
  },
  removeIndex(state, uhri) {
    // ADJUST THIS FUNCTION TO UHRI
    var found = state.selectedIndexes.filter((ssgoal) => ssgoal.id === uhri.id)
    if (found.length > 0) {
      state.selectedIndexes.splice(found, 1)
    }
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
