import { ERRO, ALLHOSPITALS } from './mutations-types'

export default {
    [ERRO]: (state, erro) => {
        state.erro = erro
    },
    [ALLHOSPITALS]: (state, allHospitals) => {
        state.allHospitals = allHospitals
    },
}