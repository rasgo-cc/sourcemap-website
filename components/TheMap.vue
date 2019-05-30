<template>
  <div class="map__wrapper">
    <button
      v-if="showSearchHere"
      class="map__search-here"
      @click="onSearchHere"
    >
      Search This Area
    </button>
    <no-ssr>
      <l-map
        ref="map"
        :zoom="13"
        :center="center"
        @update:center="onUpdateCenter"
      >
        <l-tile-layer
          :url="mapTileServerUrl"
          attribution="Thanks"
        ></l-tile-layer>
        <l-control-attribution prefix="A custom prefix">
        </l-control-attribution>
        <l-marker
          v-for="marker in markers"
          :key="marker.name"
          :lat-lng="marker.position"
        >
          <l-popup>
            <marker-popup :name="marker.name" category="supermarket" />
          </l-popup>
          <l-icon :icon-anchor="markerIconAnchor(marker)">
            <img :src="markerIconImage(marker)" />
          </l-icon>
        </l-marker>
      </l-map>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import MarkerPopup from '@/components/MarkerPopup.vue'
import { MarkerData } from '@/models/map'
// import { LMap } from 'vue2-leaflet'

@Component({
  components: {
    MarkerPopup
  }
})
export default class TheMap extends Vue {
  @Prop({ type: Array, default: () => [] })
  markers!: MarkerData

  center = [38.731796, -9.139386]
  centerMoved = false

  showSearchHere = false

  $refs: any = {
    map: Object
  }

  onUpdateCenter(data) {
    this.center = data
    this.showSearchHere = true
    // this.$emit('update:center', data)
  }

  onSearchHere() {
    this.$emit('searchOn', this.center)
    this.showSearchHere = false
  }

  setCenter(latitude, longitude) {
    console.log('setCenter', latitude, longitude)
    this.$refs.map.mapObject.flyTo([latitude, longitude], 15)
  }

  markerIconAnchor(marker: MarkerData) {
    return marker.active ? [25, 72] : [16, 48]
  }

  markerIconImage(marker: MarkerData) {
    if (marker.active) {
      return 'assets/img/pin-supermarket-selected.svg'
    }
    return 'assets/img/pin-supermarket.svg'
  }

  get mapTileServerUrl() {
    return process.env.MAP_TILE_SERVER
  }
}
</script>
