<template>
  <div>
    <div class="container-fluid">
      <div class="row mt-3">
        <div class="col-md-4">
          <div class="card blue-gradient color-block">
            <div class="card-body align-self-center">
              <h5 class="card-title text-white">Cadastro de Hospital</h5>
              <a href="#" class="btn btn-primary" @click="openHospitalRegisterModal()">Cadastrar</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card blue-gradient color-block mb-3 mx-auto">
            <div class="card-body align-self-center">
              <h5 class="card-title text-white">Cadastro de Paciente</h5>
              <a href="#" class="btn btn-primary" @click="openPacienteRegisterModal()">Cadastrar</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card blue-gradient color-block mb-3 mx-auto">
            <div class="card-body align-self-center">
              <h5 class="card-title text-white">Alta de Paciente</h5>

              <a href="#" class="btn btn-primary" @click="openReleasePatienteModal()">Dar Alta</a>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-4">
            <LineChartOccupationIndex class="sizeChart" :chart-data="lineChartOccupationIndexData"></LineChartOccupationIndex>
          </div>
          <div class="col-4">
            <numberOfBedsStillAvaliable
              class="sizeChart"
              :chart-data="numberOfBedsStillAvaliableData"
            ></numberOfBedsStillAvaliable>
          </div>

          <div class="col-4">
            <table class="table mw-100">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Número de leitos totais</th>
                  <th scope="col">Número de leitos disponiveis</th>

                  <th scope="col">Indice de ocupação</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(hospital,idx) in getAllHospitals" :key="hospital._id+1">
                  <th scope="row">{{ idx+1 }}</th>
                  <td>{{ hospital.tipo }}</td>
                  <td>{{ hospital.leitos }}</td>
                  <td>{{ hospital.leitos - hospital.pacientes.length }}</td>

                  <td>{{ (hospital.pacientes.length / hospital.leitos) * 100 | rounder }}%</td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <hospitalRegister
      v-show="openHospitalRegister"
      @exitModal="openHospitalRegister = $event"
      :show="openHospitalRegister"
    ></hospitalRegister>
    <pacienteRegister
      v-show="openPacienteRegister"
      @exitModal="openPacienteRegister = $event"
      :show="openPacienteRegister"
    ></pacienteRegister>
    <releasePatiente
      v-show="openReleasePatiente"
      @exitModal="openReleasePatiente = $event"
      :show="openReleasePatiente"
    ></releasePatiente>
  </div>
</template>
<script>
import LineChartOccupationIndex from "./charts/lineChartOccupationIndex";
import numberOfBedsStillAvaliable from "./charts/numberOfBedsStillAvailableChart";
import hospitalRegister from "./hospitalRegister";
import pacienteRegister from "./pacienteRegister";
import releasePatiente from "./releasePatient";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    LineChartOccupationIndex,
    hospitalRegister,
    pacienteRegister,
    releasePatiente,
    numberOfBedsStillAvaliable
  },
  data() {
    return {
      hospitalSelecionado: undefined,
      numberBeds: 0,
      lineChartOccupationIndexData: {},
      numberOfBedsStillAvaliableData: {},
      openHospitalRegister: false,
      openPacienteRegister: false,
      openReleasePatiente: false
    };
  },
  computed: {
    ...mapGetters("hospital", ["getAllHospitals"])
  },
  watch: {
    hospitalSelecionado(to) {
      if (to != undefined) this.numberBeds = to.leitos - to.pacientes.length;
    },
    getAllHospitals(to) {
      if (to != undefined) {
        this.hospitalSelecionado = undefined;
        this.OccupationIndexFillData();
        this.BedsStillAvailableFillData();
      }
    }
  },
  methods: {
    ...mapActions("hospital", ["getAllHospitalsFromApi"]),
    OccupationIndexFillData() {
      let dataSet = [];
      this.getAllHospitals.map(hospitais => {
        dataSet.push({
          label: hospitais.tipo,
          backgroundColor: hospitais.chartRGBColor,
          data: [
            ((hospitais.pacientes.length / hospitais.leitos) * 100).toFixed(1)
          ]
        });
      });
      this.lineChartOccupationIndexData = {
        labels: ["Indice de ocupação(%)"],
        datasets: dataSet
      };
    },
    BedsStillAvailableFillData() {
      let dataSet = [];
      this.getAllHospitals.map(hospitais => {
        dataSet.push({
          label: hospitais.tipo,
          backgroundColor: hospitais.chartRGBColor,
          data: [hospitais.leitos - hospitais.pacientes.length]
        });
      });
      this.numberOfBedsStillAvaliableData = {
        labels: ["Numero de leitos disponiveis"],
        datasets: dataSet
      };
    },

    openHospitalRegisterModal() {
      this.openHospitalRegister = !this.openHospitalRegister;
    },
    openPacienteRegisterModal() {
      this.openPacienteRegister = !this.openPacienteRegister;
    },
    openReleasePatienteModal() {
      this.openReleasePatiente = !this.openReleasePatiente;
    }
  },
  created() {
    this.getAllHospitalsFromApi();
  }
};
</script>
<style  scoped>
.sizeChart {
  width: 500px;
  height: 500px;
}
</style>