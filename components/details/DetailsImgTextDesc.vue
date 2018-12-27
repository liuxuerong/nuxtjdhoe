<template>
  <div>
    <div
      v-if="desc.length"
      ref="detailsImgTextDesc"
      class="detailsImgTextDesc"
      v-html="desc"/>
  </div>
</template>
<script>
export default {
  name: 'DetailsImgTextDesc',
  props: {
    desc: String
  }
}
</script>
<style lang="stylus">
  .detailsImgTextDesc
    width 100%
    img
      width 100%
</style>
