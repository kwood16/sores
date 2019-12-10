<template>
    <div class="intro">
        <br>
        <h2>Introduction</h2>
        <h4>Select the picture that most resembles the skin you are assessing.</h4>
        <div id="intro-cards" class="card-body justify-content-center">
            <b-card-group deck>
                <b-card
                    :img-src="require('@/assets/stage1.png')"
                    img-alt="Stage 1 Pressure Ulcer: Skin is unbroken but inflamed."
                    img-top
                    style="max-width: 23rem;"
                    img-height="350px"
                    class="mb-2"
                >
                <b-button class="btn-floating" pill variant="primary" to="/stage/1">Stage 1</b-button>
                <a v-bind:href="info_links[0]" class="card-link">
                  <img class="info-button" src="@/assets/info.png" alt="info">
                </a>
                </b-card>
                <b-card
                    :img-src="require('@/assets/stage2.png')"
                    img-alt="Stage 2 Pressure Ulcer: Skin is broken to epidermis or dermis."
                    img-top
                    img-height="350px"
                    style="max-width: 23rem;"
                    class="mb-2"
                >
                <b-button class="btn-floating" pill variant="primary" to="/stage/2">Stage 2</b-button>
                <a v-bind:href="info_links[1]" class="card-link">
                  <img class="info-button" src="@/assets/info.png" alt="info">
                </a>
                </b-card>
                <b-card
                    :img-src="require('@/assets/stage3.png')"
                    img-alt="Stage 3 Pressure Ulcer: Ulcer extends to subcutaneous fat layer."
                    img-top
                    img-height="350px"
                    style="max-width: 23rem;"
                    class="mb-2"
                >
                <b-button class="btn-floating" pill variant="primary" to="/stage/3">Stage 3</b-button>
                <a v-bind:href="info_links[2]" class="card-link">
                  <img class="info-button" src="@/assets/info.png" alt="info">
                </a>
                </b-card>
                <b-card
                    :img-src="require('@/assets/stage4.png')"
                    img-alt="Stage 4 Pressure Ulcer: Ulcer extends to muscle or bone. Undermining is likely."
                    img-top
                    img-height="350px"
                    style="max-width: 23rem;"
                    class="mb-2"
                >
                <b-button class="btn-floating" pill variant="primary" to="/stage/4">Stage 4</b-button>
                <a v-bind:href="info_links[3]" class="card-link">
                  <img class="info-button" src="@/assets/info.png" alt="info">
                </a>
                </b-card>
            </b-card-group>
        </div>
        <div class="patient">
            <h2>
                    {{ pat_info.name[0].given[0] + ' ' + pat_info.name[0].family }}
                    <br>
                    Age: {{ pat_age }}
                </h2>
                <h3>
                    Most Recent Pressure Ulcer: {{ obs_info.effectiveDateTime | displayDate }}
                    
                    <br>
                    Pressure Ulcer Risk: {{ obs_info.valueCodeableConcept.coding[0].display }}
                    <a v-bind:href="info_links[4]">
                    <img class="info-button" src="@/assets/info.png" alt="info">
                    </a>
                </h3>
        </div>
        <div id="return-button">
            <router-link to="/">
                <b-button pill variant="danger">Back to Home</b-button>
            </router-link>
        </div>
        <br>

        <hr>
        <div id="education">
            <h4 id="resources">Additional Resources</h4>
            <dl>
                <dt><a href="https://medlineplus.gov/ency/patientinstructions/000147.htm">Pressure Ulcer Prevention</a></dt>
                <dt><a href="https://www.beaucare.com/blog/pressure-ulcer-prevention-day-2017/">Prevention Infographic</a></dt>
                <dt><a href=" https://www.mayoclinic.org/diseases-conditions/bed-sores/diagnosis-treatment/drc-20355899">General Bed Sore Info</a></dt>
                <dt><a href="https://www.mdcalc.com/braden-score-pressure-ulcers">Pressure Ulcer Assessment Tool</a></dt>
            </dl>

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
                "http://service.oib.utah.edu/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTREV&mainSearchCriteria.v.c=421076008&mainSearchCriteria.v.cs=2.16.840.1.113883.6.96&mainSearchCriteria.v.dn=Pressure ulcer stage 1 (disorder)&encounter.c.c=AMB&informationRecipient=PROV&performer=PROV",
                "http://service.oib.utah.edu/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTREV&mainSearchCriteria.v.c=420324007&mainSearchCriteria.v.cs=2.16.840.1.113883.6.96&mainSearchCriteria.v.dn=Pressure ulcer stage 2 (disorder)&encounter.c.c=AMB&informationRecipient=PROV&performer=PROV",
                "http://service.oib.utah.edu/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTREV&mainSearchCriteria.v.c=421927004&mainSearchCriteria.v.cs=2.16.840.1.113883.6.96&mainSearchCriteria.v.dn=Pressure ulcer stage 3 (disorder)&encounter.c.c=AMB&informationRecipient=PROV&performer=PROV",
                "http://service.oib.utah.edu/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTREV&mainSearchCriteria.v.c=420597008&mainSearchCriteria.v.cs=2.16.840.1.113883.6.96&mainSearchCriteria.v.dn=Pressure ulcer stage 4 (disorder)&encounter.c.c=AMB&informationRecipient=PROV&performer=PROV",
                "http://service.oib.utah.edu/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTE&mainSearchCriteria.v.c=81636-3&mainSearchCriteria.v.cs=2.16.840.1.113883.6.1&mainSearchCriteria.v.dn=Pressure Ulcer Risk Braden Scale&performer=PROV"
            ]
        }
    },
    mounted() {
        
        FHIR.oauth2.ready()
        .then(response => {
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

#intro-cards { 
    margin-left: 50px;
    margin-top: 10px;
}
.info-button {
    height: 30px;
}
hr {
    size: 30%;
}
</style>