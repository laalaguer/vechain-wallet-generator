<template>
  <div class="whole">
    <top-bar/>
    <div id="app">
      <b-container>
        <b-row align-h="center">
          <b-alert dismissible show class="text-left" variant="warning">
            {{$t('app.textOne')}}
            <br>
            {{$t('app.textTwo')}}
            <br>
            {{$t('app.textThree')}}
          </b-alert>
        </b-row>
        <b-row align-h="center">
          <b-col md="4">
            <generate-holder :text="$t('app.btnText')" v-on:generate="addNewWallet"></generate-holder>
          </b-col>
        </b-row>
        <b-row align-h="around">
          <card-holder v-for="(item, index) in cardHolders" 
            :key="item.id" 
            :item="item" 
            :public-address="item.addressEIP55Prefixed"
            :private-key="item.privateKey"
            :card-index="index"
            ></card-holder>
        </b-row>
      </b-container>
    </div>
  </div>
  
</template>

<script>
import TopBar from './components/TopBar.vue'
import GenerateHolder from './components/GenerateHolder.vue'
import CardHolder from './components/CardHolder.vue'
const calc = require('./calculations')

export default {
  name: 'app',
  data () {
    return {
      cardHolders: []
    }
  },
  methods:{
    addNewWallet(){
      let wallet = calc.createWallet()
      this.cardHolders.push(wallet)
    }
  },
  components: {
    TopBar,
    GenerateHolder,
    CardHolder
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
