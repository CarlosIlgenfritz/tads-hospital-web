import actions from './action'
import getters from './getters'
import mutations from './mutations'

const state = {
    erro: undefined,
    allHospitals: [],
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}