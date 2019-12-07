<template>
    <div class="stage">
        <br>
        <h1>Stage {{ $route.params.id }}</h1>
        <div id="stage-decision" class="card-body justify-content-center">
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
                <img src="@/assets/yes.png">
            </router-link>
            <router-link to="/intro">
                <img src="@/assets/no.png">
            </router-link>
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
export default {
    
  data: function () {
    return {
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
      ]
    }
  },
  methods: {
    getPic(index) {
        return require('../assets/' + this.stages[this.$route.params.id - 1][index]);
    }
  }
  //,
//   computed: {
//      activeStage: function() {
//        return this.users.filter(function(u) {
//          return u.active
//      })
//    }
//   }

}
</script>

<style>
#stage-decision img {
    width: 180px;
    height: 180px;
    margin: 50px;
}
</style>