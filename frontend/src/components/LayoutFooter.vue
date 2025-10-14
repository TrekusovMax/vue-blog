<script setup>
import { onBeforeMount, ref } from 'vue'
import LayoutContainer from './LayoutContainer.vue'

const year = new Date().toLocaleString('ru', { year: 'numeric' })
const city = ref('')
const temp = ref(0)
const precStrength = ref(0)

let lat = 55.7569
let lon = 37.6151

const fetchWeatherData = (lat, lon, headers) => {
  fetch(`https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}`, {
    headers,
  })
    .then((response) => response.json())
    .then((json) => {
      city.value = json.info.tzinfo.name.match(/[^/]+$/)[0]
      temp.value = json.fact.temp
      precStrength.value = json.fact.prec_strength
    })
}

onBeforeMount(() => {
  const accessKey = import.meta.env.VITE_YANDEX_WEATHER_KEY

  const headers = {
    'X-Yandex-Weather-Key': accessKey,
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      fetchWeatherData(position.coords.latitude, position.coords.longitude, headers)
      console.log(position)
    },
    fetchWeatherData(lat, lon, headers),
  )
})
</script>

<template>
  <LayoutContainer
    ><div class="flex items-center justify-between py-8">
      <div class="">
        <p>Блог веб-разработчика</p>
        <p><a href="mailto:web@developer.ru">web@developer.ru</a></p>
      </div>
      <div class="text-right">
        <p>
          {{ city }}, <time :datetime="year">{{ year }}</time>
        </p>
        <p>Погода: солнечно, {{ temp }}&deg;C</p>
      </div>
    </div>
  </LayoutContainer>
</template>
