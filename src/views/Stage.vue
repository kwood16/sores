<template>
    <div class="stage">
        <h1>Stage {{ $route.params.id }}</h1>
        <div id="stage-img">
            <router-link to="/recommendation/yes">
                <img src="@/assets/yes.png">
            </router-link>
            <router-link to="/recommendation/no">
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

</script>

<style>
#stage-img img {
    width: 180px;
    height: 180px;
    margin: 50px;
}
</style>