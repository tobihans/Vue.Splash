<template>
  <div class="vs-input" :class="summaryType">
    <div class="input-group">
      <label :for="id">{{ label }}</label>
      <input :id="id" :type="type" :value="value" @input="input" />
    </div>
    <div class="vs-input__add-info" v-if="summary.length > 0">
      <div class="summary">
        <unicon
          name="exclamation-triangle"
          fill="#ff9090"
          iconStyle="monochrome"
          width="20"
          height="20"
        />
        <span>{{ summary }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const VsProps = Vue.extend({
  props: {
    id: String,
    label: String,
    value: String,
    summary: {
      type: String,
      default: () => '',
    },
    type: {
      type: String,
      default: () => 'text',
    },
    summaryType: {
      default: () => 'info',
    },
  },
});

@Component
export default class VsInput extends VsProps {
  input(e: InputEvent): void {
    this.$emit('input', (e.target as HTMLInputElement).value);
  }
}
</script>

<style scoped lang="scss">
.vs-input {
  font-family: "Nt Sans", sans-serif;
  width: 100%;
  margin-top: 1.5em;

  &__add-info {
    font-size: 0.85em;

    .summary {
      display: flex;
      align-items: center;

      span {
        margin-left: 5px;
      }
    }
  }
}

input:not([type="radio"]),
input:not([type="checkbox"]) {
  min-height: 32px;
  min-width: 286px;
  width: 100%;
  height: 100%;
}

input,
input:active,
input:focus {
  outline: none;
  border: none;
}

.input-group {
  // padding:  0.15em 0.25em;
  border: 2px solid #111;
  width: 100%;
  border-radius: 0.25em;
  position: relative;
  font-weight: 300;
  margin-bottom: 1.5px;

  label {
    position: absolute;
    top: 0;
    left: 5px;
    transform: translateY(-65%);
    z-index: 2;
    background: #fff;
    padding: 0 0.2em;
    font-weight: 400;
    font-size: 0.75em;
  }

  input {
    font-size: 0.9em;
    font-weight: 400;
    font-family: "Antokor Mono Light", sans-serif;
    padding: 0.15em 0.25em 0.15em 0.45em;
    line-height: 5px;
  }
}

.unicon {
  height: 20px;
}
</style>
