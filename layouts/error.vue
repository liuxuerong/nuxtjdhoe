<template>
  <div class="error">
    <div class="error-content">
      <h1 class="error-code">{{ error.statusCode }}</h1>
      <div class="error-wrapper-message">
        <h2 class="error-message">众里寻他 我已不再</h2>
      </div>
      <p class="error-link">
        <nuxt-link
          class="link"
          to="/">Back to the home page</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      default: function() {
        return {
          statusCode: 400
        }
      },
      type: Object
    }
  }
  // mounted() {
  //   this.$store.commit('option/SET_ERROR_COLUMU', true)
  // },
  // beforeDestroy() {
  //   this.$store.commit('option/SET_ERROR_COLUMU', false)
  // }
}
</script>

<style lang="scss" scoped>
.error {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  z-index: 999;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @keyframes error-item {
    0% {
      opacity: 0;
      transform: translate3d(0, -30%, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  > .error-content {
    > .error-code,
    > .error-link,
    > .error-wrapper-message {
      color: pink;
      animation: error-item ease-out both 0.5s 0.3s;
    }

    .link {
      &:hover {
        border-bottom: 1px solid;
      }
    }

    > .error-code {
      text-transform: uppercase;
      font-size: 200px;
      margin: 0;
    }

    > .error-wrapper-message {
      > .error-message {
        margin-top: 0;
      }
    }
  }
}
</style>
