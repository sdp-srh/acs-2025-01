<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tipps Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <!-- The reorder gesture is disabled by default, enable it to drag and drop items -->
        <ion-reorder-group :disabled="false" @ionItemReorder="handleReorder($event)">
          <ion-reorder v-for="(team, index) in teams" :key="team.teamId" :value="team.teamId">
            <ion-item>
              <ion-label>{{ `${index + 1}.` }}&nbsp;&nbsp;&nbsp;<img :src="team.teamIconUrl"
                  class="team-icon" />&nbsp;{{ team.teamName }} </ion-label>

              <!--<ion-reorder slot="end"></ion-reorder>-->
            </ion-item>
          </ion-reorder>
        </ion-reorder-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { onMounted, ref } from 'vue'

const teams = ref([])

onMounted(async () => {
  if (teams.value.length === 0) {
    loadTipps()
  }
})

const loadTipps = async () => {
  const response = await fetch('/api/tipp')
  const data = await response.json()
  teams.value = data
}

const handleReorder = (event) => {
  const fromIndex = event.detail.from
  const toIndex = event.detail.to
  // The `from` and `to` properties contain the index of the item
  // when the drag started and ended, respectively
  console.log('Dragged from index', event.detail.from, 'to', event.detail.to)

  // Finish the reorder and position the item in the DOM based on
  // where the gesture ended. This method can also be called directly
  // by the reorder group
  event.detail.complete()
  const [item] = teams.value.splice(fromIndex, 1)
  teams.value.splice(toIndex, 0, item)
  printTeams()
}

const getPositionText = (index) => {
  let result = ''
  const rank = index + 1
  if (rank < 10) {
    result = ` ${rank}`
  } else {
    result = `${rank}`
  }
  return result
}

const printTeams = () => {
  console.log('------------------')
  teams.value.forEach((team, i) => {
    if (i < 4) console.log(team.teamName)
  })
  console.log(teams.value)
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

</script>

<style scoped>
.team-icon {
  height: 1.2em;
  /* Adjust this value as needed */
  width: auto;
  /* Keeps the aspect ratio intact */
  vertical-align: middle;
  /* Aligns the image vertically with the text */
}
</style>
