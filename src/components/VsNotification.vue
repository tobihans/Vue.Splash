<template>
  <div :class="['message', type, position]">
    <div class="content">
        <span v-if="title.length > 0" class="title">{{ `${title}:&nbsp;` }}</span>
        <span>{{ content }}</span>
    </div>
    <div v-if="dismissible" class="dismiss" @click="dismiss">
      <unicon name="multiply" fill="#f5f5f5"/>
    </div>
  </div>
</template>

<script lang="ts">
// TODO: add transitions
// TODO: shape prop (toast or popup)
// TODO: Make content fit one line without wrapping

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class VsNotification extends Vue {
  @Prop({ type: String }) private content!: string;

  @Prop({ type: String }) private type!: string;

  @Prop({
    type: Number,
    required: false,
    default: () => 0,
  })
  private autoclose!: number;

  @Prop({
    type: Boolean,
    required: false,
    default: () => false,
  })
  private dismissible!: boolean;

  @Prop({
    type: String,
    required: false,
    default: () => '',
  })
  private title!: string;

  @Prop({
    type: String,
    required: false,
    default: () => 'top-center',
    // eslint-disable-next-line
    validator: (value: string) => {
      return ([
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ]).indexOf(value) > -1;
    },
  })
  private position!: Position;

  dismiss(): void {
    this.$destroy();
    // eslint-disable-next-line
    this.$el.parentNode?.removeChild(this.$el);
  }

  mounted(): void {
    if (this.autoclose > 0) {
      setTimeout(this.dismiss, this.autoclose * 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables" as *;

.message {
  z-index: 50000;
  position: fixed;
  padding: 4px 8px;
  margin: 4px 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  font-family: "Nt Sans", sans-serif;
  min-height: calc(32px + 0.30em + 2px);
  max-width: 286px;
  width: 100%;
  margin-top: 1.5em;
  border: none;
  outline: none;
  border-radius: 0.2em;
  cursor: pointer;
  background: #111;
  color: #fff;
  min-height: 52px;

  @each $state, $color in $ui_states {
    &.#{$state} {
      background: $color;
    }
  }

  .content {
    padding-right: 2px;
    font-size: 0.9em;

    .title {
      font-family: "Nt Sans Sembd", sans-serif;
      font-size: 1.05em;
    }
  }

  .dismiss, .unicon {
    display: flex;
    align-items: flex-end;
    justify-content: center;

  }

  .dismiss {
    height: 100%;
    flex: 0 0 10%;
    padding: 2px;
    border-left: 1.5px dashed #f5f5f5;
  }
}

.message.top-left {
  top: 12px;
  left: 8px;
}

.message.top-center {
  top: 12px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.message.top-right {
  top: 12px;
  right:8px;
}

.message.bottom-left {
  bottom:12px;
  left: 8px;
}

.message.bottom-center {
  bottom: 12px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.message.bottom-right {
  bottom: 12px;
  right: 8px;
}
</style>
