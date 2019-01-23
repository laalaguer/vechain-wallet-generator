<template>
  <div class="whole">
    <top-bar/>
    <div id="app">
      <b-container>
        <b-row align-h="center"><!-- Banner row -->
          <b-alert dismissible show class="text-left" variant="warning">
            {{$t('app.textOne')}}
            <br>
            {{$t('app.textTwo')}}
            <br>
            {{$t('app.textThree')}}
            <br>
            {{$t('app.textFour')}}
          </b-alert>
        </b-row>

        <b-row align-h="center">
          <b-col sm="12" md="8" lg="6">
            <b-card no-body>
              <b-tabs card>
                <b-tab :title="$t('app.tabPrivateKeyTitle')" active><!-- Tab: Public/Private key style-->
                  <b-container id="tabPrivateKey">
                    <b-row align-h="center"><!-- Generate button row -->
                      <b-col md="4">
                        <generate-holder functionality="generateaddress" :text="generatePButtonText" v-on:generateaddress="showRegerateWalletModal"></generate-holder>
                      </b-col>
                    </b-row>
                    <b-row align-h="center"><!-- Vet card holder row -->
                      <card-holder v-for="item in cardHolders" 
                        :key="item.privateKey"  
                        :public-address="item.addressEIP55Prefixed"
                        :private-key="item.privateKey"
                        :card-index="cardIndex"
                        >
                      </card-holder>
                    </b-row>
                  </b-container>
                  <b-modal 
                    ref="regenerateAddressModal"
                    :cancel-title="$t('modals.cancelButtonText')"
                    :ok-title="$t('modals.okayButtonText')"
                    @ok="addNewWallet">{{ $t('modals.regenerateWalletText') }}</b-modal>
                </b-tab>
                <b-tab :title="$t('app.tabMnemonicTitle')" ><!-- Tab: Mnemonic style-->
                  <b-container id="tabMnemonic">
                    <b-row align-h="center"><!-- Generate button row -->
                      <b-col md="4">
                        <generate-holder functionality="generatemnemonic" :text="generateMButtonText" v-on:generatemnemonic="showRegenerateMnemonicModal"></generate-holder>
                      </b-col>
                    </b-row>
                    <b-row align-h="center"><!-- Vet card holder row -->
                      <mnemonic-holder v-for="item in mnemonicHolders"
                        :key="item.wallet.privateKey"
                        :title="$t('cardHolder.addressTitle')"
                        :secondtitle="$t('cardHolder.mnemonicTitle')"
                        :subtitle="$t('cardHolder.addressSubTitle')"
                        :buttontitle="$t('cardHolder.mnemonicCopy')"
                        :wallet="item.wallet"
                        :words="item.words"
                        :card-index="mnemonicIndex"
                      >
                      </mnemonic-holder>
                    </b-row>
                  </b-container>
                  <b-modal 
                    ref="regenerateMnemonicModal"
                    :cancel-title="$t('modals.cancelButtonText')"
                    :ok-title="$t('modals.okayButtonText')"
                    @ok="addNewMnemonic">{{ $t('modals.regenerateMnemonicText') }}</b-modal>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
  
</template>

<script>
import TopBar from './components/TopBar.vue'
import GenerateHolder from './components/GenerateHolder.vue'
import CardHolder from './components/CardHolder.vue'
import MnemonicHolder from './components/MnemonicHolder.vue'

const calc = require('./calculations')
const mnemonic = require('./mnemonic')

export default {
  name: 'app',
  data () {
    return {
      cardHolders: [],
      cardIndex: 0,

      mnemonicHolders: [],
      mnemonicIndex: 0
    }
  },
  methods:{
    showRegerateWalletModal(){
      if (this.cardHolders.length > 0){
        this.$refs.regenerateAddressModal.show()
      } else {
        this.addNewWallet()
      }
    },
    showRegenerateMnemonicModal(){
      if (this.mnemonicHolders.length > 0){
        this.$refs.regenerateMnemonicModal.show()
      } else {
        this.addNewMnemonic()
      }
    },
    addNewWallet(){
      let wallet = calc.createWallet()  // Data structure of a single ETH/VIP wallet
      this.cardHolders.push(wallet)
      this.cardIndex ++;
      if (this.cardHolders.length > 1){
        this.cardHolders.shift()
      }
    },
    addNewMnemonic(){
      let words = mnemonic.getRandomWords()  // A string.
      let firstPrivateKey = mnemonic.getFirstVetPrivateKeyFromWords(words)  // A buffer.
      let wallet = calc.gatherWallet(firstPrivateKey)  // Data structure of a single ETH/VIP wallet

      let m_object = {
        words: words.split(' '),
        wallet: wallet
      }

      this.mnemonicHolders.push(m_object)
      this.mnemonicIndex ++;
      if (this.mnemonicHolders.length > 1){
        this.mnemonicHolders.shift()
      }
    }
  },
  components: {
    TopBar,
    GenerateHolder,
    CardHolder,
    MnemonicHolder
  },
  computed: {
    generatePButtonText: function(){
      if (this.cardIndex > 0){
        return this.$t('app.btnTextAgain')
      } else {
        return this.$t('app.btnText')
      }
    },
    generateMButtonText: function(){
      if (this.mnemonicIndex > 0){
        return this.$t('app.btnTextAgain')
      } else {
        return this.$t('app.btnText')
      }
    }
  }
}
</script>

<style>
.whole {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  text-align: center;
  margin-top: 30px;
}
</style>
