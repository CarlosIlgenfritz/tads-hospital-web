import axios from './axios/axios'

export default {
    saveHospital(dataToSave) {
        return axios.post(`/adicionaHospital`, dataToSave)
    },
    getAllHospital() {
        return axios.get(`/listaHospital`)

    },
    updateHospital(idHospital, dataToUpdate) {
        return axios.put(`/atualizaHospital/${idHospital}`, dataToUpdate)
    }

}