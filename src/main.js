import Vue from 'vue'
import App from './App.vue'
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-boost";

Vue.config.productionTip = false;
Vue.use(VueApollo);

const Client = new ApolloClient({
  uri: "http://localhost:4000"
});

const apolloProvider = new VueApollo({
  defaultClient: Client
});
new Vue({
  render: h => h(App),
  apolloProvider
}).$mount('#app');
