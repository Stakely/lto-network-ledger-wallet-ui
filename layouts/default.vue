<template>
  <v-app class="bg-color">
    <v-main>
      <header class="default-color default-shadow">
        <div class="header-image pt-4 pt-sm-8 pb-4">
          <div class="wrapper px-8 mt-0 mt-sm-16 white--text">
            <h1>LTO Network</h1>
            <h2 class="text-h6 text-sm-h5">Ledger Hardware Wallet Interface</h2>
          </div>
        </div>
      </header>
      <div class="wrapper px-4">
        <nuxt />
      </div>
    </v-main>
    <v-footer inset padless class="default-shadow default-color">
      <div class="width-100 my-8">
        <div class="wrapper px-4 extra-wrap white--text">
          <v-row no-gutters class="mx-2">
            <v-col cols="12" md="6" class="px-2">
              <div class="d-flex align-center">
                <v-icon small class="white--text" left>mdi-github</v-icon><a href="https://github.com/iicc1/lto-network-ledger-staking-ui" target="_blank" class="white--text mx-1"><strong>Fork us on GitHub</strong></a>
              </div>
              <div class="d-flex align-center">
                <v-icon small class="white--text" left>mdi-bug-outline</v-icon><a href="https://github.com/iicc1/lto-network-ledger-staking-ui/issues" target="_blank" class="white--text mx-1">Bug reports / Improvements</a>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="px-2">
              <div class="d-flex align-center">
                <v-icon small class="white--text" left>mdi-telegram</v-icon>Need help? <a href="https://t.me/joinchat/BrVdbEUBdYOXu4N8mY9wEQ" target="_blank" class="white--text mx-1"><strong>Join LTO Network Tech chat</strong></a>
              </div>
              <div class="d-flex align-center">
                <v-icon small class="white--text" left>mdi-notebook-edit-outline</v-icon>Made by <a href="https://stakely.io" target="_blank" class="white--text mx-1"><strong>Stakely.io</strong></a> Team
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  
  .header-image {
    background-image: url('/lto-header-background.png');
    background-repeat: repeat;
    background-size: 100px 100px;
  }
</style>

<style>
  html, body, .bg-color {
    background-color: #f9faff!important;
  }
  .wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  .default-shadow { 
    box-shadow: 0 12px 24px 0 rgba(101, 93, 191, 0.13)!important;
  }
  .default-color {
    background: rgb(99,123,217);
    background: -moz-linear-gradient(45deg, rgba(99,123,217,1) 0%, rgba(126,149,239,1) 100%);
    background: -webkit-linear-gradient(45deg, rgba(99,123,217,1) 0%, rgba(126,149,239,1) 100%);
    background: linear-gradient(45deg, rgba(99,123,217,1) 0%, rgba(126,149,239,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#637bd9",endColorstr="#7e95ef",GradientType=1);
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .width-100 {
    width: 100%;
  }
  /* INPUTS OR */
  .theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
		background: #00000000!important;
	}
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
    box-shadow: none!important;
  }
  .v-input__icon .v-icon {
    color: rgb(99, 123, 217)!important;
    caret-color: rgb(99, 123, 217);
  }
  a:link {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none!important;
  }
  a:active {
    text-decoration: none;
  }
  .position-relative {
    position: relative;
  }
</style>
