<template>
    <div class="stage">
        <br>
        <h1>Stage {{ $route.params.id }}</h1>
        <div id="stage-decision" class="card-body justify-content-center">
            <b-card-img-group deck>
                <b-card-img
                    :src="require('@/assets/stage1-1.png')"
                    alt="Stage 1 Pressure Ulcer: Skin is unbroken but inflamed."
                    class="mb-2"
                    overlay
                >
                </b-card-img>
                <b-card-img
                    :src="require('@/assets/stage1-2.png')"
                    alt="Stage 1 Pressure Ulcer: Skin is unbroken but inflamed."
                    height="350px"
                    style="max-width: 23rem;"
                    class="mb-2"
                >
                </b-card-img>
                <b-card-img
                    :src="require('@/assets/stage1-3.png')"
                    alt="Stage 1 Pressure Ulcer: Skin is unbroken but inflamed."
                    height="350px"
                    style="max-width: 23rem;"
                    class="mb-2"
                >
                </b-card-img>
                <b-card-img
                    :src="require('@/assets/stage1-4.png')"
                    alt="Stage 1 Pressure Ulcer: Skin is unbroken but inflamed."
                    height="350px"
                    style="max-width: 23rem;"
                    class="mb-2"
                >
                </b-card-img>
            </b-card-img-group>
        </div>
        <div id="stage-decision">
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
#stage-decision img {
    width: 180px;
    height: 180px;
    margin: 50px;
}
</style>