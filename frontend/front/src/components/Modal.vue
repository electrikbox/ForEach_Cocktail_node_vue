<template>
    <div class="modal fade show d-block" tabindex="-1" role="dialog" @click.self="close">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header"></slot>
            <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
            <slot name="verre"></slot>
            <slot name="garniture"></slot>
            <slot name="categories"></slot>
            <slot name="image"></slot>
          </div>
        </div>
      </div>
    </div>
</template>



<script setup>
const emit = defineEmits(['close']);
const close = () => emit('close');
</script>



<style scoped>
.modal.fade.show.d-block {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}
</style>
