<template>
    <div class="home">
        <br>
        <br>
        <h2>Welcome to SORES for DAYZZZ</h2>
        <h3>Where all your dreams come...they come true.</h3>

        <img src="@/assets/caution.png">
        <div id="main">
            <br>
            {{ pat_info }}
            <router-link to="/intro">
                <b-button pill variant="primary" to="/intro">Continue to SORES for DAYZZZ</b-button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import * as FHIR from 'fhirclient'

FHIR.oauth2.ready(function(smart){
        var patient = smart.patient;
        console.log(patient)
//   .then(client => client.request("Patient"))
//   .then(console.log(client))
//   .catch(console.error);
// FHIR.oauth2.ready(function(fhirClient){

});

FHIR.oauth2.ready().then(response => { console.log(response) })

export default {
data () {
    return {
      pat_info: null
    }
  },
created() {
    axios.get('https://api.logicahealth.org/Testapalooza/open/Patient?_id=CUSTO-1005198-02')
        .then(response => (this.pat_info = response)

        );
    }

}

</script>

<style>

</style>
