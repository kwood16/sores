<template>
    <div class="stage">
        <br>
        <h2>Stage {{ $route.params.id }}</h2>
        <h4>Does the skin look like these pictures?</h4>
        <div id="stage-img" class="card-body justify-content-center">
            <b-card-img-group deck v-for="(pic, index) in stages[$route.params.id-1]" :key="index">
                <b-card-img
                    :src="getPic(index)"
                    :alt="pic"
                    class="mb-2"
                    overlay
                >
                {{getPic(index)}}
                </b-card-img>
            </b-card-img-group>
        </div>
        <div id="stage-decision">
            <router-link :to="{ name: 'recommendation', params: { id: $route.params.id } }" >
                <!-- <img src="@/assets/yes.png"> -->
                <span class="decision" id="yes">YES</span>
            </router-link>
            <router-link to="/intro">
                <!-- <img src="@/assets/no.png"> -->
                <span class="decision" id="no">NO</span>
            </router-link>
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
            <br>
            <router-link to="/intro">
                <b-button pill variant="danger">Back to Previous Page</b-button>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import FHIR from 'fhirclient';
import moment from 'moment';

export default {
    
  data: function () {
    return {
      pat_info: null,
      obs_info: null,
      pat_age: null,
      stages:[
          [
            'stage1-1.png',
            'stage1-2.png',
            'stage1-3.png',
            'stage1-4.png'
          ],
          [
            'stage2-1.jpg',
            'stage2-2.jpg',
            'stage2-3.jpg',
            'stage2-4.jpg'
          ],
          [
            'stage3-1.jpg',
            'stage3-2.jpg',
            'stage3-3.jpg',
          ],
          [
            'stage4-1.jpg',
            'stage4-2.jpg',
            'stage4-3.jpg'
          ]
      ],
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
        },
        getPic(index) {
          return require('../assets/' + this.stages[this.$route.params.id - 1][index]);
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
#stage-img img {
    width: 225px;
    height: 225px;
    margin-left: 25px;
    margin-right: 25px;
}
.info-button {
    height: 30px;
}
.decision {
  padding-right: 1em;
  padding-left: 1em;
  font-size: 5em;
  font-weight: 1000;
  margin-left: 1em;
  margin-right: 1em;
}

#yes {
  color: green;
}
#yes:hover {
  text-shadow: 3px 0 0 currentColor;
  background: #e1e1e1;
  border-top: 1px solid #d0d0d0;
}
#no {
  color: maroon;
}
#no:hover {
  text-shadow: 3px 0 0 currentColor;
  background: #e1e1e1;
  border-top: 1px solid #d0d0d0;
}
</style>