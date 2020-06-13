import Vue from 'vue'
import Vuex from 'vuex'
import hospital from '../modules/hospital/index'
Vue.use(Vuex)

const modules = {
    hospital
}
export default new Vuex.Store({
    modules
})