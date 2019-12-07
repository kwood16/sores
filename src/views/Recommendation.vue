<template>
    <div class="recommendation">
        <div id="info">
            <h1>Based on your assessment, you may have a Stage {{ $route.params.id }} pressure ulcer and should</h1>
            <h2 v-if="$route.params.id == 1">Call your doctor</h2>
            <h2>Call 911</h2>
        </div>
        <div id="return-button">
            <br>
            <router-link to="/">
                <b-button pill variant="danger">Back to Home</b-button>
            </router-link>
        </div>
    </div>

</template>

<script>

</script>

<style>

</style>