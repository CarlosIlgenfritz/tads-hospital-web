<template>
  <div>
    <modal :show="show">
      <div slot="header" class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="d-flex justify-content-center text-white">
              <h1>CADASTRO HOSPITAL</h1>
            </div>
          </div>
        </div>
      </div>
      <div slot="body" class="container">
        <div class="row form-group">
          <div class="col-md-12">
            <label>Leitos</label>
            <input type="number" class="form-control" v-model="numberLeitos" />
            <label>Tipo</label>
            <input type="text" class="form-control" v-model="textTipo" />
            <label>Cor a ser apresentada no gráfico</label>
            <input type="color" class="form-control" v-model="colorHospital" />
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
import { mapActions } from "vuex";
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
      numberLeitos: 0,
      textTipo: "",
      colorHospital: ""
    };
  },
  methods: {
    ...mapActions("hospital", ["saveHospitalOnApi"]),
    exitModal() {
      this.$emit("exitModal", false);
    },
    saveHospital() {
      this.saveHospitalOnApi({
        leitos: this.numberLeitos,
        tipo: this.textTipo,
        chartRGBColor: this.colorHospital
      }).then(response => {
        if (response.status === 200)
          this.$vToastify.success(
            "Hospital cadastrado com sucesso",
            "Hospital"
          );
        this.exitModal();
      });
    }
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