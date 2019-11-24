<template>
    <div class="intro">
        <h1>Introduction</h1>
        <h3>Please select the picture that most resembles the skin you are assessing.</h3>
        <div id="intro-cards">
            <b-card-group deck>
                <b-card
                    :img-src="require('@/assets/stage1.png')"
                    img-alt="Stage 1 Pressure Ulcer: Skin is unbroken but inflamed."
                    img-top
                    style="max-width: 23rem;"
                    class="mb-2"
                >
                <b-button class="btn-floating" pill variant="primary" to="/stage/1">Stage 1</b-button>
                </b-card>
                <b-card
                    :img-src="require('@/assets/stage2.png')"
                    img-alt="Stage 2 Pressure Ulcer: Skin is broken to epidermis or dermis."
                    img-top
                    style="max-width: 23rem;"
                    class="mb-2"
                >
                <b-button class="btn-floating" pill variant="primary" to="/stage/2">Stage 2</b-button>
                </b-card>
                <b-card
                    :img-src="require('@/assets/stage3.png')"
                    img-alt="Stage 3 Pressure Ulcer: Ulcer extends to subcutaneous fat layer."
                    img-top
                    style="max-width: 23rem;"
                    class="mb-2"
                >
                <b-button class="btn-floating" pill variant="primary" to="/stage/3">Stage 3</b-button>
                </b-card>
                <b-card
                    :img-src="require('@/assets/stage4.png')"
                    img-alt="Stage 4 Pressure Ulcer: Ulcer extends to muscle or bone. Undermining is likely."
                    img-top
                    style="max-width: 23rem;"
                    class="mb-2"
                >
                <b-button class="btn-floating" pill variant="primary" to="/stage/4">Stage 4</b-button>
                </b-card>
            </b-card-group>
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

#intro-cards { 
    margin-left: 30px;
    margin-top: 50px;
}

</style>