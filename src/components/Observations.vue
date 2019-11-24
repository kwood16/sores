<template>
  <div class="observations">

        <div>
          <p>{{ observations }}</p>
        </div>
  </div>
</template>

<script>

export default {
  props: {
    observations: {
      type: Array
    }
  },
};
// import Observations from '../services/observationService';

// /*
// The services return $.deferred object that gets saved in
// deferredPromise below.
// */
// export default {
//   name: 'HelloWorld',
//   props: {
//     msg: String,
//   },
//   data() {
//     return {
//       results: [],
//       deferredPromise: null
//     };
//   },
//   created() {
//   },
//   computed: {
//     error() {
//       if (this.deferredPromise && this.deferredPromise.state() === 'rejected') {
//         return true;
//       }
//       return false;
//     },
//     pending() {
//       if (this.deferredPromise && this.deferredPromise.state() === 'pending') { return true; }
//       return false;
//     },
//     /*
//     TODO: This needs tweaking. Always returns [].
//     The getPromise proceses the c.data.entry which is an array
//     */
//     Observations() {
//       let toReturn = [];
//       if (this.deferredPromise != null) {
//         this.deferredPromise.done((c) => {
//           toReturn = c.data.entry;
//           this.getPromise(toReturn);
//         });
//       }
//       return toReturn;
//     },
//   }
// };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.hero {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hero .lead {
  font-weight: 200;
  font-size: 1.5rem;
}
</style>
