<template>
  <div class="vs-input">
    <div :class="['input-group', validation.state]">
      <label :for="id">{{ label }}</label>
      <input
        :id="id"
        :type="type"
        :value="value"
        :required="required"
        :invalid="validation != true"
        @input="input"
      />
    </div>
    <div class="vs-input__add-info" v-if="validation != true">
      <div class="summary">
        <div>
          <ul>
            <li :class="[validation.state]">{{ validation.title }}</li>
            <li v-for="(rule, i) in validation.rules"
              :key="i"
              :class="['ul-child', validation.state]"
            >
              <span>{{ rule }}</span>
            </li>
          </ul>
        </div>
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
    required: Boolean,
    validator: {
      type: Function,
      required: false,
      default: () => () => true,
    },
    type: {
      type: String,
      default: () => 'text',
    },
  },
});

@Component
export default class VsInput extends VsProps {
  private validation: InputValidationResult = true;

  input(e: InputEvent): void {
    const { value } = e.target as HTMLInputElement;
    this.$emit('input', value);
    this.validation = this.validator(value);
  }
}
</script>

<style scoped lang="scss">
@use "../assets/scss/partials/_variables" as *;

.vs-input {
  font-family: "Nt Sans", sans-serif;
  width: 100%;
  margin-top: 1.5em;

  &__add-info {
    font-size: 0.85em;

    .summary {
      display: flex;
      align-items: center;
      font-size: 0.95em;
      margin-left: 5px;
    }
  }
}

input:not([type="radio"]),
input:not([type="checkbox"]) {
  min-height: 32px;
  min-width: 280px;
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

  @each $state, $color in $ui_states {
      &.#{$state} {
        border-color: $color;
        color: $color;
      }
    }

  label {
    position: absolute;
    top: 0;
    left: 5px;
    transform: translateY(-65%);
    z-index: 2;
    color: inherit;
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
    color: inherit;
  }
}

.unicon {
  height: 20px;
}
</style>
