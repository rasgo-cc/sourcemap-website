<template>
  <div>
    <div class="nav">
      <div class="nav__content">
        <div class="nav__logo">SourceMap</div>
        <div class="nav__menu">
          <ul>
            <li><a href="">What is this?</a></li>
            <li class="highlight"><a href="">Contribute</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="side">
        <div v-if="results.length > 0" class="results__summary">
          {{ results.length }} Ecologic sources
        </div>
        <div class="results">
          <card
            v-for="(place, index) in results"
            :key="index"
            :place="place"
            :expanded="expandedResult == index"
            @click.native="expandResult(index)"
          />
        </div>
      </div>
      <div class="map-wrapper">
        <the-map ref="map" :markers="markers" @update:center="onUpdateCenter" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import Card from '@/components/Card.vue'
import TheMap from '@/components/TheMap.vue'
import _ from 'lodash'
import { Place } from '@/models/api'
import { MarkerData } from '@/models/map'

@Component({
  components: { TheMap, Card }
})
export default class Home extends Vue {
  dummy: Array<number> = _.range(12)

  results: Array<Place> = []
  expandedResult: number | null = null
  // markers: Array<MarkerData> = []

  $refs: any = {
    map: TheMap
  }

  onUpdateCenter(data) {
    this.fetchPlaces(data.lat, data.lng)
  }

  async fetchPlaces(lat, lng) {
    const results = await this.$axios.$get(
      `${process.env.API_URL}/places/search?lat=${lat}&lng=${lng}`
    )
    this.results = results.data
  }

  expandResult(index: number) {
    console.log('expandResult', index)
    if (this.expandedResult === index) {
      this.expandedResult = null
    } else {
      this.expandedResult = index
      const [latitude, longitude] = this.markers[index].position
      this.$refs.map.setCenter(latitude, longitude)
    }
  }

  get markers(): Array<MarkerData> {
    return this.results
      ? this.results.map(
          (data: Place, index: number): MarkerData => {
            return {
              position: [data.latitude, data.longitude],
              permalink: data.permalink,
              name: data.name,
              active: index === this.expandedResult
            }
          }
        )
      : []
  }

  mounted() {
    this.fetchPlaces(38.731796, -9.139386)
  }
}
</script>
