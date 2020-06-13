<template>
  <div>
    <modal :show="show">
      <div slot="header" class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="d-flex justify-content-center text-white">
              <h1>LIBERAR PACIENTE</h1>
            </div>
          </div>
        </div>
      </div>
      <div slot="body" class="container">
        <div class="row form-group">
          <div class="col-md-12">
            <label>Selecione o hospital</label>
            <select class="form-control" v-model="hospitalSelecionado">
              <option
                v-for="hospital in getAllHospitals"
                :key="hospital._id"
                :value="hospital"
              >{{ hospital.tipo }}{{ hospital.leitos }}</option>
            </select>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Sexo</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(paciente,idx) in hospitalSelecionado.pacientes" :key="idx">
                  <th scope="row">{{ idx+1 }}</th>
                  <td>{{ paciente.nome }}</td>
                  <td>{{ paciente.sexo }}</td>
                  <td>
                    <button class="btn btn-success btn-sm" @click="releasePatient(idx)">Dar alta</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <hr />
      <div slot="footer" class="footer_page">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <button class="btn btn-danger" @click="exitModal()">Fechar</button>
            </div>
            <div class="col-md-6 text-right">
              <button class="btn btn-success" @click="saveHospital()">Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import modal from "./shared/modal";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { modal },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      hospitalSelecionado: {},
      nomePaciente: "",
      sexoPaciente: ""
    };
  },
  computed: {
    ...mapGetters("hospital", ["getAllHospitals"])
  },
  methods: {
    ...mapActions("hospital", [
      "updateHospitalOnApi",
      "getAllHospitalsFromApi"
    ]),
    exitModal() {
      this.$emit("exitModal", false);
    },
    releasePatient(idx) {
      this.hospitalSelecionado.pacientes.splice(idx, 1);
    },
    saveHospital() {
      this.updateHospitalOnApi(this.hospitalSelecionado).then(response => {
        if (response.status === 200)
          this.$vToastify.success("Paciente liberados com sucesso", "Paciente");
        this.exitModal();
      });
    }
  },
  mounted() {
    this.getAllHospitalsFromApi();
  }
};
</script>
<style  scoped>
.footer_page {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid #d6d6d6;
  background: #fff;
}
</style>