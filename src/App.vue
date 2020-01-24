<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Sores</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/intro">Introduction</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- routes will be rendered here -->
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
import FHIR from 'fhirclient';

export default {
    data () {
        return {
            pat_info: null,
            obs_info: null
        }
    },
    mounted() {
        
        FHIR.oauth2.ready()
        .then(response => {
            console.log('READY RESPONSE:', response);
            var patient_id = response.patient.id;
            const serviceUrl = 'https://api.logicahealth.org/Testapalooza/open/';
            axios.get(serviceUrl + 'Patient?_id=' + patient_id)
                .then(response => {
                    console.log('Patient Response', response.data.entry[0].resource);
                    this.pat_info = response.data.entry[0].resource;
                });
            axios.get('https://api.logicahealth.org/Testapalooza/open/Observation?subject=Patient/' + patient_id + '&code=38227-5' )
                .then(response => {
                    console.log("response: ", response)
                    console.log('Braden Score Observation Response', response.data.entry[0].resource);
                    this.obs_info = response.data.entry[0].resource;
                });

        });
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
