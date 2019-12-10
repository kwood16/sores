<template>
    <div class="home">
        <br>
        <h2>Welcome to Sores</h2>
        <img src="@/assets/caution.png">
        <div id="main">
            <br>
            <h2>
                {{ pat_info.name[0].given[0] + ' ' + pat_info.name[0].family }}
                <br>
                Age: {{ pat_age }}
            </h2>
            <h3>
                Most Recent Pressure Ulcer: {{ obs_info.effectiveDateTime | displayDate }}
                <br>
                Pressure Ulcer Risk: {{ obs_info.valueCodeableConcept.coding[0].display }}
                <a v-bind:href="info_links[0]">
                <img class="info-button" src="@/assets/info.png" alt="info">
                </a>
            </h3>
            <router-link to="/intro">
            <br>
                <b-button pill variant="primary" to="/intro">Continue to Sores</b-button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import FHIR from 'fhirclient';
import moment from 'moment';

export default {
    data () {
        return {
            pat_info: null,
            obs_info: null,
            pat_age: null,
            info_links: [
                "http://service.oib.utah.edu/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTE&mainSearchCriteria.v.c=81636-3&mainSearchCriteria.v.cs=2.16.840.1.113883.6.1&mainSearchCriteria.v.dn=Pressure Ulcer Risk Braden Scale&performer=PROV"
            ]
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
                    this.pat_age = this.calculateAge(response.data.entry[0].resource.birthDate)
                });
            axios.get('https://api.logicahealth.org/Testapalooza/open/Observation?subject=Patient/' + patient_id + '&code=38227-5' )
                .then(response => {
                    console.log("response: ", response)
                    console.log('Braden Score Observation Response', response.data.entry[0].resource);
                    this.obs_info = response.data.entry[0].resource;
                });

        });
    },
    methods: {
        calculateAge: function getAge(dateString) {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
            {
                age--;
            }
            return age;
        }
    },
    filters: {
        displayDate: function(rawDate) {
            if (rawDate) {
                return moment(String(rawDate)).format('MM/DD/YYYY hh:mm a')
            }
        }
    }
}

</script>

<style>
.info-button {
    height: 30px;
}

</style>
