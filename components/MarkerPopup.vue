<template>
  <div class="marker-popup__wrapper">
    <div class="marker-popup__icon">
      <div class="icon-place__supermarket--hover" />
    </div>
    <div class="marker-popup__info">
      <div class="place__name">{{ name }}</div>
      <div class="place__category--supermarket">Supermarket</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class MarkerPopup extends Vue {
  @Prop({ type: String })
  name

  @Prop({ type: String })
  category
}
</script>
