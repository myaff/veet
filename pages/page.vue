<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="subtitle">
        About Vue
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >GitHub</a>
      </div>
      <div class="text">
        <p v-for="(text, idx) in texts" :key="idx">{{ text }}</p>
      </div>
      <div class="back">
        <nuxt-link to="/" class="button--green">Home</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      texts: [
        "С другой стороны консультация с широким активом позволяет оценить значение позиций, занимаемых участниками в отношении поставленных задач. Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов) участие в формировании направлений прогрессивного развития. Товарищи! реализация намеченных плановых заданий позволяет выполнять важные задания по разработке системы обучения кадров, соответствует насущным потребностям.",
        "Равным образом постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании существенных финансовых и административных условий. Не следует, однако забывать, что сложившаяся структура организации влечет за собой процесс внедрения и модернизации позиций, занимаемых участниками в отношении поставленных задач.",
        "Задача организации, в особенности же укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании направлений прогрессивного развития. Таким образом укрепление и развитие структуры влечет за собой процесс внедрения и модернизации дальнейших направлений развития."
      ]
    };
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  margin: 0 auto;
}
.links a {
  margin: 15px;
}
.text {
  text-align: left;
}
.text p {
  margin: 15px 0;
}
.back {
  margin: 30px auto 15px;
}
</style>
