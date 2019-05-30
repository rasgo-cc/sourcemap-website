<template>
  <div class="card">
    <div class="card__header" :class="expandedClasses">
      <div class="place__info">
        <div class="place__name">{{ place.name }}</div>
        <div class="place__category--supermarket" :class="expandedClasses">
          Supermarket
        </div>
      </div>
      <div class="place__icon--supermaket" :class="expandedClasses"></div>
    </div>
    <hr v-if="!expanded" />

    <div class="card__details">
      <ul>
        <li><i class="place-details__icon--address"></i>{{ place.address }}</li>
      </ul>
      <collapse-transition>
        <ul v-if="expanded">
          <li v-if="place.hours">
            <i class="place-details__icon--hours"></i>{{ place.hours }}
          </li>
          <li v-if="place.phone">
            <i class="place-details__icon--phone"></i>{{ place.phone }}
          </li>
          <li v-if="place.website">
            <i class="place-details__icon--website"></i
            ><a :href="place.website" target="_blank">{{ place.website }}</a>
          </li>
        </ul>
      </collapse-transition>
    </div>
    <!-- <collapse-transition> -->
    <hr v-if="expanded" />
    <!-- </collapse-transition> -->
    <!-- <collapse-transition> -->
    <div v-if="expanded" class="card__footer">
      <a href="">Do you see something wrong?</a>
    </div>
    <!-- </collapse-transition> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { State } from '@/models/card'
import { CollapseTransition } from 'vue2-transitions'

@Component({
  components: { CollapseTransition }
})
export default class Card extends Vue {
  @Prop({ type: Object })
  place

  @Prop({ type: Boolean, default: false })
  expanded

  get expandedClasses() {
    return this.expanded ? 'inverted' : ''
  }
}
</script>
