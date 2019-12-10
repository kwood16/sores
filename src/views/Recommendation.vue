<template>
    <div class="recommendation">
        <div id="info">
            <br>
            <h2> Recommendation </h2>
            <br>
            <hr id="rec">
            <div id="cds-rec">
                <h1>
                    Based on your assessment, you may have a 
                    <br>
                    <strong>Stage {{ $route.params.id }}</strong>
                    <br>
                    pressure ulcer
                    <a v-bind:href="info_links[4]">
                        <img class="info-button" src="@/assets/info.png" alt="info">
                    </a>
                    and should
                    <span v-if="$route.params.id == 1">
                        call your physician,
                        <br>
                        <strong>{{ pcp.fullnm }}</strong>, at <strong>{{ pcp.phone }}</strong>.
                    </span>
                    <span v-if="$route.params.id > 1">
                        <strong>call 911 immediately</strong>.
                        <br>
                        A message has been sent to your physician,
                        <br>
                        <strong>{{ pcp.fullnm }}</strong>.
                    </span>
                    <span v-if="$route.params.id == 1 && (obs_info.valueCodeableConcept.text == '13' || obs_info.valueCodeableConcept.text == '14')">
                        continue with the treatment prescribed and call your physician,
                        <br>
                        <strong>{{ pcp.fullnm }}</strong>, at <strong>{{ pcp.phone }}</strong>
                        if symptoms worsen.
                        <br>
                        Please review the pressure ulcer prevention information below under "Additional Resources" for recommendations.
                    </span>

                </h1>
            </div>
        </div>
        <br>
        <hr>
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
                    <a v-bind:href="info_links[5]">
                    <img class="info-button" src="@/assets/info.png" alt="info">
                    </a>
                </h3>
        </div>
        <div id="return-button">
            <br>
            <router-link to="/">
                <b-button pill variant="danger">Back to Home</b-button>
            </router-link>
        </div>
        <hr id="ed">
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
            pat_age: null,
            obs_info: null,
            pcp: {
                id: null,
                fullnm: null,
                phone: null
            },
            info_links: [
                "http://service.oib.utah.edu/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTREV&mainSearchCriteria.v.c=421076008&mainSearchCriteria.v.cs=2.16.840.1.113883.6.96&mainSearchCriteria.v.dn=Pressure ulcer stage 1 (disorder)&encounter.c.c=AMB&informationRecipient=PROV&performer=PROV",
                "http://service.oib.utah.edu/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTREV&mainSearchCriteria.v.c=420324007&mainSearchCriteria.v.cs=2.16.840.1.113883.6.96&mainSearchCriteria.v.dn=Pressure ulcer stage 2 (disorder)&encounter.c.c=AMB&informationRecipient=PROV&performer=PROV",
                "http://service.oib.utah.edu/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTREV&mainSearchCriteria.v.c=421927004&mainSearchCriteria.v.cs=2.16.840.1.113883.6.96&mainSearchCriteria.v.dn=Pressure ulcer stage 3 (disorder)&encounter.c.c=AMB&informationRecipient=PROV&performer=PROV",
                "http://service.oib.utah.edu/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTREV&mainSearchCriteria.v.c=420597008&mainSearchCriteria.v.cs=2.16.840.1.113883.6.96&mainSearchCriteria.v.dn=Pressure ulcer stage 4 (disorder)&encounter.c.c=AMB&informationRecipient=PROV&performer=PROV",
                "http://service.oib.utah.edu/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTREV&mainSearchCriteria.v.c=421076008&mainSearchCriteria.v.cs=2.16.840.1.113883.6.96&mainSearchCriteria.v.dn=Pressure Ulcer &performer=PROV",
                "http://service.oib.utah.edu/infobutton-service/infoRequest?representedOrganization.id.root=1.3.6.1.4.1.5884&taskContext.c.c=PROBLISTE&mainSearchCriteria.v.c=81636-3&mainSearchCriteria.v.cs=2.16.840.1.113883.6.1&mainSearchCriteria.v.dn=Pressure Ulcer Risk Braden Scale&performer=PROV"
            ]
            
        }
    },
    mounted() {
        
        FHIR.oauth2.ready()
        .then(response => {
            console.log('RECOMMENDATION RESPONSE:', response);
            var patient_id = response.patient.id;

            const serviceUrl = 'https://api.logicahealth.org/Testapalooza/open/';
            axios.get(serviceUrl + 'Patient?_id=' + patient_id)
                .then(response => {
                    console.log('Patient Response', response.data.entry[0].resource);
                    this.pat_info = response.data.entry[0].resource;
                    this.pcp.id = this.pat_info.generalPractitioner[0].reference.replace('Practitioner/', '');
                    console.log("PCP ID: ", this.pcp.id)
                    this.pat_age = this.calculateAge(response.data.entry[0].resource.birthDate)
                });
            axios.get('https://api.logicahealth.org/Testapalooza/open/Practitioner?_identifier=' + this.pcp_id)
                .then(response => {
                    console.log('PCP Response', response.data.entry[1].resource);
                    var pcp_response = response.data.entry[1].resource;
                    this.pcp.fullnm = pcp_response.name[0].given[0] + ' ' + pcp_response.name[0].family
                    this.pcp.phone = pcp_response.telecom[0].value
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
#rec hr {
    width: 50%;
}
#ed hr {
    size: 30%;
}

</style>