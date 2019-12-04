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
import axios from 'axios';

<<<<<<< HEAD
=======
export default {
created() {
    axios.get('https://api.logicahealth.org/STU301withSynthea/open/Patient?_id=smart-1577780')
        .then(response => {
            console.log('response', response.data.entry[0].resource);
        });
}
// function getPatientName (pt) {
//   if (pt.name) {
//     var names = pt.name.map(function(name) {
//       return name.given.join(" ") + " " + name.family.join(" ");
//     });
//     return names.join(" / ")
//   } else {
//     return "anonymous";
//   }
// }

// function displayPatient (pt) {
//   document.getElementById('patient_name').innerHTML = getPatientName(pt);
// }

// function displayObservation (observation) {
//   var table = document.getElementById("obs_table");
//   var row = table.insertRow(1);
//   var cell1 = row.insertCell(0);
//   var cell2 = row.insertCell(1);
//   cell1.innerHTML = observation.code.coding[0].code;
//   cell2.innerHTML = observation.valueQuantity.value;
// }

// var demo = {
//     serviceUrl: "https://api.hspconsortium.org/hspcdemo/open",
//     patientId: "BILIBABY"
// };

// // Create a FHIR client (server URL, patient id in `demo`)
// var smart = FHIR.client(demo),
//     pt = smart.patient;

// // Create a patient banner by fetching + rendering demographics
// smart.patient.read().then(function(pt) {
//   displayPatient (pt);
// });

// // A more advanced query: search for active Prescriptions, including med details
// smart.patient.api.fetchAll({type: "Observation"})
// .then(function(results, refs) {
//   results.forEach(function(observation){
//     displayObservation(observation);
//   });
// });
}

>>>>>>> 0ba6f7d05328fc271231e8bfe9929e3aea22ba87
</script>

<style>

</style>
