<template>
  <button :class="buttonClass" @click="click">{{ title }}</button>
</template>

<script>
export default {
  name: 'ButtonCurrent',
  props: {
    title: {
      type: String,
      default: 'Button'
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    buttonClass() {
      return {
        'red': this.color === 'red',
        'green': this.color === 'green'
      };
    }
  },
  methods: {
    click() {
      this.$emit('click');
    }
  }
}
</script>

<style scoped>
button {
  width: 155px;
  height: 47px;
  border-radius: 10px;
  background: var(--primary-color);
  color: var(--actif-color);
  border: none;
  cursor: pointer;
}

button:hover {
  background: var(--selection-color);
}

.red {
  background: var(--red-color);
  color: var(--actif-color);
}

.green {
  background: var(--green-color);
  color: var(--actif-color);
}
</style>
