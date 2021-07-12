<template>
  <div class="py-4">
    <div>
      <div class="default-color rounded white--text py-2 px-4 d-flex align-center">
        <v-icon small left class="white--text">mdi-home-outline</v-icon> Welcome
      </div>
      <v-alert dense v-if="conn_alert.show" text outlined :color="conn_alert.type" :icon="icon[conn_alert.type]" class="position-relative mt-4">
				{{ conn_alert.message }}
				<v-icon @click="conn_alert.show = false" :color="conn_alert.type" class="close-x-button">mdi-close</v-icon>
			</v-alert>
      <v-row no-gutters class="mx-n2 mt-4">
        <v-col cols="12" md="6" class="px-2 d-flex align-stretch">
          <div class="white default-shadow rounded pa-4 width-100 position-relative">
            <div>
              <div class="section-title">TRANSFER</div>
              <v-icon class="float-right icon-position">mdi-swap-horizontal</v-icon>
            </div>
            <div class="section-box rounded mt-2 pa-4 overflow-hidden d-flex align-center justify-space-between text--secondary">
              The fastest way to send LTO tokens between wallets using your Ledger Hardware Wallet.
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="px-2 d-flex align-stretch mt-4 mt-md-0">
          <div class="white default-shadow rounded pa-4 width-100 position-relative">
            <div>
              <div class="section-title">LEASE</div>
              <v-icon class="float-right icon-position">mdi-vote-outline</v-icon>
            </div>
            <div class="section-box rounded mt-2 pa-4 overflow-hidden d-flex align-center justify-space-between text--secondary">
              Delegate your voting power to help protect the network while earning rewards. When leasing, your tokens stay in your wallet.
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters class="mx-n2">
        <v-col cols="12" md="6" class="px-2 d-flex align-stretch mt-4">
          <div class="white default-shadow rounded pa-4 width-100 position-relative">
            <div>
              <div class="section-title">ANCHOR</div>
              <v-icon class="float-right icon-position">mdi-anchor</v-icon>
            </div>
            <div class="section-box rounded mt-2 pa-4 overflow-hidden d-flex align-center justify-space-between text--secondary">
              Anchoring is a simple and cheap way to notarize documents or timestamp data on the blockchain making it tamper-proof.
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="px-2 mt-4 d-flex align-stretch position-relative">
          <div class="white default-shadow rounded pa-4 mt-4 mt-md-0 width-100">
            <div class="" style="height: 100%;">
              <div class="section-title width-100">{{ !lto_address ? 'CONNECT' : 'DISCONNECT' }} YOUR WALLET</div>
              <div class="section-box rounded mt-2 pa-4 overflow-hidden d-flex align-center justify-space-between text--secondary">
                <v-btn v-if="!lto_address" @click="connectLedger()" depressed large block class="white--text mt-1 default-color">
                  CONNECT LEDGER
                  <v-progress-circular v-if="loading.connect_ledger" indeterminate color="white" :size="14" :width="2" class="ml-2"></v-progress-circular>
                  <v-icon v-else right small class="white--text">mdi-arrow-right</v-icon>
                </v-btn>
                <v-btn v-else @click="disconnectLedger()" depressed large block class="white--text mt-1 default-color">
                  DISCONNECT LEDGER
                  <v-progress-circular v-if="loading.connect_ledger" indeterminate color="white" :size="14" :width="2" class="ml-2"></v-progress-circular>
                  <v-icon v-else right small class="white--text">mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="position-relative mt-4 transition-all" :style="'opacity:' + form_opacity" id="wallet">
      <img v-if="form_opacity != 1" src="/trasparent.png" class="trasparent-bg">
      <div class="default-color rounded white--text py-2 px-4 d-flex align-center">
        <v-icon small left class="white--text">mdi-wallet-outline</v-icon> Ledger Hardware Wallet
      </div>
      <v-alert dense v-if="alert.show" text outlined :color="alert.type" :icon="icon[alert.type]" class="position-relative mt-4">
				{{ alert.message }}
				<v-icon @click="alert.show = false" :color="alert.type" class="close-x-button">mdi-close</v-icon>
			</v-alert>
      <v-row no-gutters class="mx-n2 mt-4">
        <v-col cols="12" md="6" class="px-2 d-flex align-stretch">
          <div class="white default-shadow rounded pa-4 width-100">
            <div class="overflow-hidden">
              <div class="section-title float-left">BALANCE</div>
              <a :href="`https://${ !mainnet_network ? 'testnet-' : '' }explorer.lto.network/address/${ lto_address }`" target="_blank">
                <div class="float-right d-flex align-center text--secondary text-body-2">SHOW IN EXPLORER <v-icon class="ml-2 text--secondary" small>mdi-open-in-new</v-icon></div>
              </a>
            </div>
            <v-row no-gutters class="mx-n2">
              <v-col cols="12" md="6" class="px-2 mt-2 d-flex align-stretch">
                <div class="section-box rounded pa-4 overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                  <div>Total</div>
                  <div class="float-right"><strong><animated-number :value="total_lto" :formatValue="formatTwoDecimals" :duration="1000"/></strong> LTO</div>
                </div>
              </v-col>
              <v-col cols="12" md="6" class="px-2 mt-4 mt-sm-2 d-flex align-stretch">
                <div class="section-box rounded pa-4 overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                  <div>Available</div>
                  <div class="float-right"><strong><animated-number :value="available_lto" :formatValue="formatTwoDecimals" :duration="1000"/></strong> LTO</div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="px-2 mt-4 mt-md-0 d-flex align-stretch">
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
      <v-row no-gutters class="mx-n2 d-flex align-stretch position-relative">
        <v-col cols="12" class="px-2 mt-4">
          <div class="white default-shadow rounded pa-4">
            <v-row no-gutters class="mx-n2">
              <v-col cols="12" md="10" class="px-2">
                <div class="section-title">YOUR LEDGER ADDRESS</div>
                <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                  <v-text-field readonly color="#637bd9" v-model="lto_address" dense hide-details filled :append-icon="lto_address ? (is_valid_address(lto_address) ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline') : ''"></v-text-field>
                </div>
              </v-col>
              <v-col cols="12" md="2" class="px-2 mt-4 mt-md-0">
                <div class="section-title">ADDRESS ID</div>
                <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                  <v-select v-model="lto_address_id" height="40px" :menu-props="{ bottom: true, offsetY: true }" item-color="primary" color="#637bd9" :items="lto_address_ids" hide-details dense filled></v-select>
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters class="mx-n2">
              <v-col cols="12" md="2" class="px-2 mt-4">
                <div class="section-title">TRANSACTION TYPE</div>
                <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                  <v-select v-model="transaction_selected" height="40px" :menu-props="{ bottom: true, offsetY: true }" item-color="primary" color="#637bd9" :items="transaction_type" hide-details dense filled></v-select>
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
                <div class="section-title">DATA (HEX)</div>
                <div class="mt-2 section-box-dense rounded overflow-hidden d-flex align-center justify-space-between text--secondary width-100">
                  <v-text-field color="#637bd9" v-model="data" :append-icon="data ? (is_valid_hex(data) ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline') : ''" dense hide-details filled></v-text-field>
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
            <v-row no-gutters class="mt-4">
              <v-col cols="12">
                <v-btn @click="signTransaction()" depressed large class="float-right white--text default-color">
                  SIGN TRANSACTION
                  <v-progress-circular v-if="loading.sign_transaction" indeterminate color="white" :size="14" :width="2" class="ml-2"></v-progress-circular>
                  <v-icon v-else right small class="white--text">mdi-arrow-right</v-icon>
                </v-btn>
                <v-dialog v-model="dialogs.broadcast_transaction" max-width="480">
                  <v-card class="pa-2">
                    <div class="default-color rounded white--text py-2 px-4 d-flex align-center">
                      <v-icon small left class="white--text">mdi-script-text-key-outline</v-icon>Signed Transaction
                    </div>
                    <v-alert v-if="modal_alert.show" dense text outlined :color="modal_alert.type" :icon="icon[modal_alert.type]" class="position-relative mb-0 mt-2">
                      {{ modal_alert.message }}
                      <v-icon @click="modal_alert.show = false" :color="modal_alert.type" class="close-x-button">mdi-close</v-icon>
                    </v-alert>
                    <v-card-text class="pa-0">
                      <v-row v-if="!broadcast_tx" no-gutters class="mx-n1">
                        <v-col cols="12" class="px-1">
                          <div class="mt-2">
                            <div class="section-title-small">TRANSACTION TYPE</div>
                            <div class="section-box-dense rounded overflow-hidden">
                              <v-text-field class="input-text-value custom-boxes rounded" color="#637bd9" :value="tx_types[json_signed_tx.type]" readonly dense hide-details filled></v-text-field>
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="6" class="px-1" v-if="json_signed_tx.amount">
                          <div class="mt-2">
                            <div class="section-title-small">AMOUNT</div>
                            <div class="section-box-dense rounded overflow-hidden">
                              <v-text-field class="input-text-value custom-boxes rounded" color="#637bd9" :value="to_lto(json_signed_tx.amount)" readonly dense hide-details filled></v-text-field>
                            </div>
                          </div>
                        </v-col>
                        <v-col :cols="!json_signed_tx.amount ? 12 : 6" class="px-1">
                          <div class="mt-2">
                            <div class="section-title-small">FEE</div>
                            <div class="section-box-dense rounded overflow-hidden">
                              <v-text-field class="input-text-value custom-boxes rounded" color="#637bd9" :value="to_lto(json_signed_tx.fee)" readonly dense hide-details filled></v-text-field>
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" class="px-1" v-if="json_signed_tx.recipient">
                          <div class="mt-2">
                            <div class="section-title-small">RECIPIENT</div>
                            <div class="section-box-dense rounded overflow-hidden">
                              <v-text-field class="input-text-value custom-boxes rounded" color="#637bd9" :value="json_signed_tx.recipient" readonly dense hide-details filled></v-text-field>
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" class="px-1" v-if="json_signed_tx.leaseId">
                          <div class="mt-2">
                            <div class="section-title-small">LEASE ID</div>
                            <div class="section-box-dense rounded overflow-hidden">
                              <v-text-field class="input-text-value custom-boxes rounded" color="#637bd9" :value="json_signed_tx.leaseId" readonly dense hide-details filled></v-text-field>
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" class="px-1">
                          <div class="mt-3">
                            <v-expansion-panels>
                              <v-expansion-panel>
                                <v-expansion-panel-header class="pa-3 section-box-dense rounded" @click="show_raw_data = !show_raw_data">
                                  <div class="section-title-small">RAW DATA</div>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="pa-0">
                                  <div class="section-box-dense rounded overflow-x-scroll pa-2 mt-1">
                                    <vue-json-pretty :data="json_signed_tx"> </vue-json-pretty>
                                  </div>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                          </div>
                        </v-col>
                      </v-row>
                      <div v-else class="mt-2">
                        <div class="section-title-small">TRANSACTION IDENTIFIER</div>
                        <div class="section-box-dense rounded overflow-hidden">
                          <v-text-field class="input-text-value custom-boxes rounded" color="#637bd9" v-model="broadcast_tx" dense hide-details filled>
                            <template v-slot:append>
                              <a target="_blank" ref="nofollow" :href="`https://${ !mainnet_network ? 'testnet-' : '' }explorer.lto.network/transaction/${ broadcast_tx }`" left>
                                <v-icon color="#637bd9">
                                  mdi-open-in-new
                                </v-icon>
                              </a>
                            </template>
                          </v-text-field>
                        </div>
                      </div>
                    </v-card-text>
                    <v-card-actions v-if="!broadcast_tx" class="pa-0 mt-3">
                      <v-spacer></v-spacer>
                      <v-btn outlined color="#637bd9" @click="dialogs.broadcast_transaction = false">
                        CANCEL
                      </v-btn>
                      <v-btn @click="broadcastTransaction()" depressed class="float-right white--text default-color">
                        BROADCAST TRANSACTION
                        <v-progress-circular v-if="loading.broadcast_transaction" indeterminate color="white" :size="14" :width="2" class="ml-2"></v-progress-circular>
                        <v-icon v-else right small class="white--text">mdi-arrow-right</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
const BigNumber = require('bignumber.js')
const bs58 = require('bs58')

import TransportU2F from '@ledgerhq/hw-transport-u2f';
import {WavesLedger} from 'lto-ledger-js-unofficial-test';
import * as Transactions from '../scripts/transactions.js';
import AnimatedNumber from "animated-number-vue";

  export default {
    components: {
      AnimatedNumber
    },
    data () {
      return {
        mainnet_network: true,
        lto_address: null,
        lto_public_key: null,
        lto_address_id: 0,
        lto_address_ids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        transaction_selected: 'Transfer',
        transaction_type: ['Transfer', 'Start Lease', 'Cancel Lease', 'Anchor'],
        to_address: null,
        validator_address: null,
        lease_id: null,
        data: null,
        amount: null,
        fee: 1,
        total_lto: 0,
        available_lto: 0,
        ledger: null,
        ledgerOptions: {
          debug: false,
          openTimeout: 3000,
          listenTimeout: 30000,
          exchangeTimeout: 30000,
          networkCode: 76, // 76 mainnet - 84 tesnet
          transport: TransportU2F
        },
        loading: {
          sign_transaction: false,
          connect_ledger: false,
          broadcast_transaction: false
        },
        form_opacity: 0.3,
        alert: {
          show: false,
          type: null,
          message: null
        },
        modal_alert: {
          show: false,
          type: null,
          message: null
        },
        conn_alert: {
          show: false,
          type: null,
          message: null
        },
        icon: {
          error: 'mdi-alert-circle-outline',
          success: 'mdi-check-circle-outline'
        },
        dialogs: {
          broadcast_transaction: false
        },
        json_signed_tx: {},
        broadcast_tx: null,
        tx_types: {
          '4': 'Transfer',
          '8': 'Start Lease',
          '9': 'Cancel Lease',
          '15': 'Anchor'
        },
        show_raw_data: false
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
      },
      is_valid_hex: function () {
        return function ( hexadecimal ) {
          let regexp = /^[0-9a-fA-F]+$/
          return regexp.test(hexadecimal)
        }
      },
      to_lto: function () {
        return function ( amount ) {
          return BigNumber(amount).div(100000000)
        }
      },
      shorten_address: function () {
        return function ( address ) {
          return address.slice(0, 6) + '...' + address.slice(-5)
        }
      },
    },
    watch: {
      'transaction_selected': function () {
        this.clearData()
        if (this.transaction_selected == 'Transfer') {
          this.fee = 1
        } else if (this.transaction_selected == 'Start Lease') {
          this.fee = 1
        } else if (this.transaction_selected == 'Cancel Lease') {
          this.fee = 1
        } else if (this.transaction_selected == 'Anchor') {
          this.fee = 0.35
        }
      },
      'mainnet_network': function () {
        this.networkChanged()
      },
      'lto_address_id': function () {
        this.addressIdChanged()
      }
    },
    mounted() {
      // Fetch wallet balance data every 15s
      setInterval(() => this.getBalances(), 15000)
    },
    methods: {
      formatTwoDecimals(value) {
        return `${ Number(value).toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }`;
      },
      async connectLedger() {
        this.loading.connect_ledger = true
        try {
          this.ledger = new WavesLedger(this.ledgerOptions)
          const userInfo = await this.ledger.getUserDataById(this.lto_address_id)

          if (userInfo.address) {
            this.lto_address = userInfo.address
            this.lto_public_key = userInfo.publicKey
            this.form_opacity = 1
            this.loading.connect_ledger = false
            this.getBalances()
            this.clearAlert('general')
            this.clearAlert('welcome')
            this.$vuetify.goTo('#wallet', { duration: 700, easing: 'easeInCubic'})
          } else {
            throw new Error('Not able to get the address ' + JSON.stringify(userInfo))
          }
        } catch (error) {
          console.log(error.message)
          this.pushAlert('welcome', 'error', 'Ledger error: ' + error.message)
          this.loading.connect_ledger = false
        }
      },
      disconnectLedger() {
        this.lto_address = null
        this.form_opacity = 0.3
        this.clearData()
      },
      networkChanged() {
        if (this.ledgerOptions.networkCode === 76) {
          this.ledgerOptions.networkCode = 84
        } else if (this.ledgerOptions.networkCode === 84) {
          this.ledgerOptions.networkCode = 76
        }
        this.connectLedger()
      },
      addressIdChanged() {
        this.connectLedger()
      },
      async signTransaction() {
        this.loading.sign_transaction = true
        // Clear previously broadcasted tx
        this.broadcast_tx = null
        this.clearAlert('modal')

        // Check Input Data
        if (this.transaction_selected == 'Transfer') {
          if (!this.to_address) {
            this.loading.sign_transaction = false
            return this.pushAlert('general', 'error', 'A destination account must be entered to proceed with the transaction.')
          }
          if (!this.amount) {
            this.loading.sign_transaction = false
            return this.pushAlert('general', 'error', 'An amount must be entered to proceed with the transaction.')
          }
          if (!this.fee) {
            this.loading.sign_transaction = false
            return this.pushAlert('general', 'error', 'A fee amount must be entered to proceed with the transaction.')
          }

          this.json_signed_tx = {
            type: 4,
            senderPublicKey: this.lto_public_key, 
            recipient: this.to_address,
            fee: BigNumber(this.fee).multipliedBy(100000000).decimalPlaces(0).toNumber(),
            amount: BigNumber(this.amount).multipliedBy(100000000).decimalPlaces(0).toNumber(),
            timestamp: new Date().getTime()
          }
          
          const transaction_bytes = Transactions.prepareBytes(this.json_signed_tx)
          try {
            this.json_signed_tx.signature = await this.ledger.signTransaction(this.lto_address_id, '', transaction_bytes, 1)
          } catch (error) {
            console.log(error.message)
            this.pushAlert('general', 'error', 'Ledger error: ' + error.message)
            this.loading.sign_transaction = false
            return
          }
          
          this.loading.sign_transaction = false
          this.dialogs.broadcast_transaction = true
        } else if (this.transaction_selected == 'Start Lease') {
          if (!this.validator_address) {
            this.loading.sign_transaction = false
            return this.pushAlert('general', 'error', 'A Validator Address must be entered to proceed with the transaction.')
          }
          if (!this.amount) {
            this.loading.sign_transaction = false
            return this.pushAlert('general', 'error', 'An amount must be entered to proceed with the transaction.')
          }
          if (!this.fee) {
            this.loading.sign_transaction = false
            return this.pushAlert('general', 'error', 'A fee amount must be entered to proceed with the transaction.')
          }

          this.json_signed_tx = {
            type: 8,
            senderPublicKey: this.lto_public_key, 
            recipient: this.validator_address,
            fee: BigNumber(this.fee).multipliedBy(100000000).decimalPlaces(0).toNumber(),
            amount: BigNumber(this.amount).multipliedBy(100000000).decimalPlaces(0).toNumber(),
            timestamp: new Date().getTime()
          }

          const transaction_bytes = Transactions.prepareBytes(this.json_signed_tx)
          try {
            this.json_signed_tx.signature = await this.ledger.signTransaction(this.lto_address_id, '', transaction_bytes, 1)
          } catch (error) {
            console.log(error.message)
            this.pushAlert('general', 'error', 'Ledger error: ' + error.message)
            this.loading.sign_transaction = false
            return
          }
          
          this.loading.sign_transaction = false
          this.dialogs.broadcast_transaction = true
        } else if (this.transaction_selected == 'Cancel Lease') {
          if (!this.lease_id) {
            this.loading.sign_transaction = false
            return this.pushAlert('general', 'error', 'A Lease ID must be entered to proceed with the transaction.')
          }
          if (!this.fee) {
            this.loading.sign_transaction = false
            return this.pushAlert('general', 'error', 'A fee amount must be entered to proceed with the transaction.')
          }

          this.json_signed_tx = {
            type: 9,
            senderPublicKey: this.lto_public_key, 
            leaseId: this.lease_id,
            fee: BigNumber(this.fee).multipliedBy(100000000).decimalPlaces(0).toNumber(),
            timestamp: new Date().getTime()
          }

          const transaction_bytes = Transactions.prepareBytes(this.json_signed_tx)
          try {
            this.json_signed_tx.signature = await this.ledger.signTransaction(this.lto_address_id, '', transaction_bytes, 1)
          } catch (error) {
            console.log(error.message)
            this.pushAlert('general', 'error', 'Ledger error: ' + error.message)
            this.loading.sign_transaction = false
            return
          }
          
          this.loading.sign_transaction = false
          this.dialogs.broadcast_transaction = true
        } else if (this.transaction_selected == 'Anchor') {
          if (!this.data) {
            this.loading.sign_transaction = false
            return this.pushAlert('general', 'error', 'A Data string must be entered to proceed with the transaction.')
          }
          if (!this.isValidHex(this.data)) {
            this.loading.sign_transaction = false
            return this.pushAlert('general', 'error', 'The data entered must be encoded in hexadecimal.')
          }
          if (!this.fee) {
            this.loading.sign_transaction = false
            return this.pushAlert('general', 'error', 'A fee amount must be entered to proceed with the transaction.')
          }

          const b58Anchor = bs58.encode(Buffer.from(this.data, 'hex'))

          this.json_signed_tx = {
            type: 15,
            version: 1,
            senderPublicKey: this.lto_public_key, 
            fee: BigNumber(this.fee).multipliedBy(100000000).decimalPlaces(0).toNumber(),
            timestamp: new Date().getTime(),
            anchor_raw: this.data,
            anchors: [b58Anchor],
            proofs: []
          }

          const transaction_bytes = Transactions.prepareBytes(this.json_signed_tx)
          try {
            // Anchor signature is placed inside the proofs array
            this.json_signed_tx.proofs.push(await this.ledger.signTransaction(this.lto_address_id, '', transaction_bytes, 1))
          } catch (error) {
            console.log(error.message)
            this.pushAlert('general', 'error', 'Ledger error: ' + error.message)
            this.loading.sign_transaction = false
            return
          }
          
          this.loading.sign_transaction = false
          this.dialogs.broadcast_transaction = true
        }
      },
      async broadcastTransaction () {
        this.loading.broadcast_transaction = true
        try {
          let url = 'https://nodes.lto.network/transactions/broadcast'
          if (!this.mainnet_network) {
            url = 'https://testnet.lto.network/transactions/broadcast'
          }
          let res = await fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.json_signed_tx)
          })
          res = await res.json()
          if (res.error) {
            throw new Error(res.message)
          } else {
            // Add some delay so the transaction is available in the explorer
            await setTimeout(() => {}, 2000); 
            this.loading.broadcast_transaction = false
            this.pushAlert('modal', 'success', 'Transaction has been sent successfuly.')
            this.broadcast_tx = res.id
            // Update wallet balances since the user has performed a transaction
            this.getBalances()
          }
        } catch (error) {
          this.loading.broadcast_transaction = false
          this.dialogs.broadcast_transaction = false
          this.pushAlert('general', 'error', 'Transaction failed: ' + error.message)
        }
      },
      pushAlert (location, type, message) {
        if (location == 'general') {
          this.alert.type = type
          this.alert.message = message
          this.alert.show = true
        } else if (location == 'modal') {
          this.modal_alert.type = type
          this.modal_alert.message = message
          this.modal_alert.show = true
        } else if (location == 'welcome') {
          this.conn_alert.type = type
          this.conn_alert.message = message
          this.conn_alert.show = true
        }
      },
      clearAlert (location) {
        if (location == 'general') {
          this.alert.type = null
          this.alert.message = null
          this.alert.show = false
        } else if (location == 'modal') {
          this.modal_alert.type = null
          this.modal_alert.message = null
          this.modal_alert.show = false
        } else if (location == 'welcome') {
          this.conn_alert.type = null
          this.conn_alert.message = null
          this.conn_alert.show = false
        }
      },
      isValidHex (hexadecimal) {
        let regexp = /^[0-9a-fA-F]+$/
        return regexp.test(hexadecimal)
      },
      clearData() {
        this.to_address = null
        this.validator_address = null
        this.lease_id = null
        this.data = null
        this.amount = null
        this.fee = null
      },
      async getBalances() {
        if (!this.lto_address) return
        try {
          let url = 'https://nodes.lto.network/addresses/balance/details/'
          if (!this.mainnet_network) {
            url = 'https://testnet.lto.network/addresses/balance/details/'
          }
          let res = await fetch(url +  this.lto_address, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          res = await res.json()
          if (res.error) {
            throw new Error(error.message)
          } else {
            this.total_lto = BigNumber(res.regular).dividedBy(100000000).toNumber()
            this.available_lto = BigNumber(res.available).dividedBy(100000000).toNumber()
          }
        } catch (error) {
          console.log(error.message)
          this.pushAlert('general', 'error', 'Error getting wallet balance: ' + error.message)
        }
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
  .section-title-small {
    color: rgb(99,123,217);
    font-size: 14px;
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
  .icon-position {
    position: absolute;
    top: 16px;
    right: 16px;
  }
  .transition-all {
    transition: all 0.5s;
  }
  .trasparent-bg {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  .close-x-button {
		position: absolute;
		top: 6px;
		right: 6px;
		cursor: pointer;
		font-size: 1.1em;
	}
  .overflow-x-scroll {
    overflow-x: scroll;
  }
</style>

<style>
.v-expansion-panel::before {
  box-shadow: none!important;
}
.v-expansion-panel-content__wrap {
  padding: 0px!important;
}
.v-expansion-panel-header {
  min-height: 0px;
}
</style>