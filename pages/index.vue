<template>
  <div class="pb-4">
    <v-row no-gutters class="mx-n2">
      <v-col cols="12" md="6" class="px-2 mt-4 d-flex align-stretch">
        <div class="white default-shadow rounded pa-4 width-100">
          <div class="overflow-hidden">
            <div class="section-title float-left">BALANCE</div>
            <div class="float-right d-flex align-center text--secondary text-body-2">SHOW IN EXPLORER <v-icon class="ml-2 text--secondary" small>mdi-open-in-new</v-icon></div>
          </div>
          <v-row no-gutters class="mx-n2">
            <v-col cols="12" md="6" class="px-2 mt-2 d-flex align-stretch">
              <div class="section-box rounded pa-4 overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                <div>Total</div>
                <div class="float-right"> <strong>500</strong> LTO</div>
              </div>
            </v-col>
            <v-col cols="12" md="6" class="px-2 mt-4 mt-sm-2 d-flex align-stretch">
              <div class="section-box rounded pa-4 overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                <div>Available</div>
                <div class="float-right"> <strong>40</strong> LTO</div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="px-2 mt-4 d-flex align-stretch">
        <div class="white default-shadow rounded pa-4 width-100">
          <div class="section-title">NETWORK SWITCH</div>
          <div class="section-box rounded mt-2 pa-4 overflow-hidden d-flex align-center justify-space-between text--secondary">
            <div>LTO <strong>{{ mainnet_network ? 'Mainnet' : 'Testnet' }}</strong> Environment</div>
            <v-switch
              class="float-right my-0 mr-n2"
              color="#637bd9"
              v-model="mainnet_network"
              inset
              hide-details
            ></v-switch>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-n2 d-flex align-stretch">
      <v-col cols="12" class="px-2 mt-4">
        <div class="white default-shadow rounded pa-4">
          <v-row no-gutters class="mx-n2">
            <v-col cols="12" md="10" class="px-2">
              <div class="section-title">YOUR LEDGER ADDRESS</div>
              <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                <v-text-field color="#637bd9" v-model="lto_address" dense hide-details filled :append-icon="lto_address ? (is_valid_address(lto_address) ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline') : ''"></v-text-field>
              </div>
            </v-col>
            <v-col cols="12" md="2" class="px-2 mt-4 mt-md-0">
              <div class="section-title">ADDRESS ID</div>
              <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                <v-select v-model="lto_address_id" height="40px" :menu-props="{ bottom: true, offsetY: true }" item-color="#637bd9" color="#637bd9" :items="lto_address_ids" hide-details dense filled></v-select>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters class="mx-n2">
            <v-col cols="12" md="2" class="px-2 mt-4">
              <div class="section-title">TRANSACTION TYPE</div>
              <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                <v-select v-model="transaction_selected" height="40px" :menu-props="{ bottom: true, offsetY: true }" item-color="#637bd9" color="#637bd9" :items="transaction_type" hide-details dense filled></v-select>
              </div>
            </v-col>
            <v-col v-if="['Transfer'].includes(transaction_selected)" cols="12" md="10" class="px-2 mt-4">
              <div class="section-title">TO ADDRESS</div>
              <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                <v-text-field color="#637bd9" v-model="to_address" dense hide-details filled :append-icon="to_address ? (is_valid_address(to_address) ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline') : ''"></v-text-field>
              </div>
            </v-col>
            <v-col v-if="['Start Lease'].includes(transaction_selected)" cols="12" md="10" class="px-2 mt-4">
              <div class="section-title">VALIDATOR ADDRESS</div>
              <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                <v-text-field color="#637bd9" v-model="validator_address" dense hide-details filled :append-icon="validator_address ? (is_valid_address(validator_address) ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline') : ''"></v-text-field>
              </div>
            </v-col>
            <v-col v-if="['Cancel Lease'].includes(transaction_selected)" cols="12" md="10" class="px-2 mt-4">
              <div class="section-title">LEASE ID</div>
              <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                <v-text-field color="#637bd9" v-model="lease_id" dense hide-details filled></v-text-field>
              </div>
            </v-col>
            <v-col v-if="['Anchor'].includes(transaction_selected)" cols="12" md="10" class="px-2 mt-4">
              <div class="section-title">DATA</div>
              <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                <v-text-field color="#637bd9" v-model="data" dense hide-details filled></v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters class="mx-n2 mt-4">
            <v-col v-if="['Transfer', 'Start Lease'].includes(transaction_selected)" cols="6" class="px-2">
              <div class="section-title">AMOUNT</div>
              <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                <v-text-field color="#637bd9" v-model="amount" dense hide-details filled></v-text-field>
              </div>
            </v-col>
            <v-col :cols="['Transfer', 'Start Lease'].includes(transaction_selected) ? '6' : '12'" class="px-2">
              <div class="section-title">TRANSACTION FEE</div>
              <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                <v-text-field color="#637bd9" v-model="fee" dense hide-details filled></v-text-field>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        mainnet_network: true,
        lto_address: null,
        lto_address_id: 0,
        lto_address_ids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        transaction_selected: 'Transfer',
        transaction_type: ['Transfer', 'Start Lease', 'Cancel Lease', 'Anchor'],
        to_address: null,
        validator_address: null,
        lease_id: null,
        data: null,
        amount: null,
        fee: null
      }
    },
    computed: {
      is_valid_address: function () {
        return function ( address ) {
          let regex;
          if (this.mainnet_network) {
              regex = /^(3[jJ]\w{33})$/;
          } else {
              regex = /^(3[mMnN]\w{33})$/;
          }
          if (regex.test(address)) {
              return true
          } else {
              return false
          }
        }
      }
    },
    watch: {
      'transaction_selected': function () {
        this.clearData()
        if (this.transaction_selected == 'Transfer') {
          this.fee = 1
        } else if (this.transaction_selected == 'Start Lease') {
          this.fee = 1
        } else if (this.transaction_selected == 'Anchor') {
          this.fee = 0.25
        }
      },
    },
    methods: {
      clearData() {
        this.to_address = null
        this.validator_address = null
        this.lease_id = null
        this.data = null
        this.amount = null
        this.fee = null
      }
    }
  }
</script>

<style scoped>
  .section-title {
    color: rgb(99,123,217);
    font-size: 1em;
    text-transform: uppercase;
    font-weight: 500;
  }
  .section-box {
    background-color: #f2f4fd;
    min-height: 60px;
  }
  .section-box-dense {
    background-color: #f2f4fd;
  }
</style>