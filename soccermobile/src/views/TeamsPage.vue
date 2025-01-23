<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Teams Page</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-grid>
                <ion-row >
                    <ion-col size="4" v-for="team in teams" :key="team.teamId" :value="team.teamId">
                        <ion-card>
                            <ion-card>
                                <img :src="team.teamIconUrl" class="team-icon"/>
                                <ion-card-header>
                                <ion-card-title>{{team.teamName}}</ion-card-title>
                                </ion-card-header>

                                <ion-card-content>
                                    {{ team.shortName }}
                                </ion-card-content>
                            </ion-card>
                        </ion-card>
                    </ion-col>
                </ion-row>

            </ion-grid>

        </ion-content>
    </ion-page>
</template>

<script setup>
// required components from ionic
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
} from '@ionic/vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { IonGrid, IonCol, IonRow } from '@ionic/vue';
// use onMounted
import { onMounted, ref } from 'vue'

const teams = ref([])
onMounted(async () => {
  console.log('loading teams')
  if (teams.value.length === 0) {
    loadTeams()
  }
})

const loadTeams = async () => {
  const response = await fetch('/api/team')
  const data = await response.json()
  teams.value = data
}

</script>


<style scoped>
ion-card {
    height: 100%;  /* Optional: Adjust based on your design needs */
    display: flex;
    flex-direction: column;
}

/* Ensures images/icons in the card have a consistent size */
.team-icon {
    width: 100%; /* Full width of the card */
    height: 100%; /* Fixed height, adjust as necessary */
    max-width: 200px;
    max-height: 200px;
    object-fit: cover; /* Ensures the image covers the area without distortion */
}

/* Optional: Adds some space between the cards */
ion-col {
    padding: 8px;
}
</style>