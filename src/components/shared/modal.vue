<template>
  <transition name="modal">
    <div class="modal" v-if="show" :style="{ position }">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header blue-gradient">
            <slot name="header"></slot>
          </div>
          <div class="modal-body container-modal">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    position: {
      type: String,
      required: false,
      twoWay: true,
      default: "fixed"
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.modal {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: table;
  transition: opacity 0.3s ease;
  .modal-container {
    max-width: 100%;
    min-width: 100%;
    max-height: 100%;
    padding: 0px;
  }
  .modal-header {
  }

  &-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &-container {
    background: #fff;
    max-width: 80%;
    min-width: 40%;
    max-height: 92%;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(255, 6, 6, 0.33);
    transition: all 0.3s ease;
    margin: 0 auto;
    padding: 23px 25px;
  }

  &-footer {
    margin-top: 0px;
  }

  &-enter,
  &-leave {
    opacity: 0;
  }

  &-enter &-container,
  &-leave &-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .container-modal {
    overflow-y: scroll;
    height: 600px;
  }
}
</style>
