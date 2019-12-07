<template>
    <div class="home">
        <br>
        <br>
        <h2>Welcome to SORES for DAYZZZ</h2>
        <h3>Where all your dreams come...they come true.</h3>

        <img src="@/assets/caution.png">
        <div id="main">
            <br>
            <router-link to="/intro">
                <b-button pill variant="primary" to="/intro">Continue to SORES for DAYZZZ</b-button>
            </router-link>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
// import * as FHIR from 'fhirclient'

export default {
data () {
    return {
      pat_info: null
    }
  },
// created() {
//     FHIR.oauth2.ready().then(response => { console.log(response) })
//     axios.get('https://api.logicahealth.org/Testapalooza/open/Patient?_id=CUSTO-1005198-02')
//         .then(response => //(this.pat_info = response)
//             {
//                 console.log('response', response.data.entry[0].resource);
//             }
//         );
//     }

// }
created() {
    // FHIR.oauth2.ready()
    //     .then(response => {
    //         console.log(response);
    //         axios.get('https://api.logicahealth.org/Testapalooza/open/Patient?_id=CUSTO-1005198-02')
    //             .then(response => {
    //                 console.log('response', response.data.entry[0].resource);
    //             });
    //     });
    }
}

</script>

<style>

</style>
