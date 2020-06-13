import * as types from './mutations-types'
import SERVICE from '../../service/hospitalService'
export default {
    getAllHospitalsFromApi({ getters, commit, rootState, rootGetters }) {
        return SERVICE.getAllHospital().then(response => {
                return commit(types.ALLHOSPITALS, response.data)
            })
            .catch(erro => {
                return commit(types.ERRO, erro)
            })
    },
    saveHospitalOnApi({ getters, commit, rootState, rootGetters }, dataToSave) {
        return SERVICE.saveHospital(dataToSave).then(response => {
                getters.getAllHospitals.push(response.data)
                commit(types.ALLHOSPITALS, getters.getAllHospitals)
                return response

            })
            .catch(erro => {
                return commit(types.ERRO, erro)
            })
    },
    updateHospitalOnApi({ getters, commit, rootState, rootGetters }, dataToSave) {
        return SERVICE.updateHospital(dataToSave._id, dataToSave).then(response => {
                commit(types.ALLHOSPITALS, response.data)

                return response

            })
            .catch(erro => {
                return commit(types.ERRO, erro)
            })
    }

}