<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>1. Bundesliga Page</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-grid>
            <ion-row>
                <ion-col size="12">
                <table class="ionic-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>Points</th>
                        <th>Goals</th>
                        <th>Matches</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="rank in ranks" :key="rank.teamInfoId">
                        <td>{{ rank.rank }}</td>
                        <td>
                            <img :src="rank.teamIconUrl" class="team-icon" />&nbsp;{{ rank.teamName }}
                        </td>
                        <td>{{ rank.points }}</td>
                        <td>{{ rank.goalDiff }}</td>
                        <td>{{ rank.matches }}</td>
                    </tr>
                    </tbody>
                </table>
                </ion-col>
            </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script setup>
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/vue';

import { onMounted, ref } from 'vue'
const ranks = ref([])
onMounted(async () => {
  console.log('loading ranking')
  if (ranks.value.length === 0) {
    loadRanking()
  }
})

const loadRanking = async () => {
    const response = await fetch('/api/ranking')
    const data = await response.json()
    ranks.value = data

}


/**
   {
    "teamName": "Bayer Leverkusen",
    "teamInfoId": 6,
    "lost": 0,
    "teamIconUrl": "https://upload.wikimedia.org/wikipedia/de/thumb/f/f7/Bayer_Leverkusen_Logo.svg/1200px-Bayer_Leverkusen_Logo.svg.png",
    "won": 25,
    "opponentGoals": 19,
    "draw": 4,
    "shortName": "Leverkusen",
    "matches": 29,
    "goalDiff": 55,
    "points": 79,
    "goals": 74,
    "rank": 1
  }, 
 */

</script>


<style scoped>
/* Add your component styles here */
.ionic-table {
  width: 100%;
  border-collapse: collapse;
}

.ionic-table th, .ionic-table td {
  text-align: left;
  padding: 8px;
  border: 1px solid #e0e0e0;
}

.ionic-table th {
  background-color: #f0f0f0;
}

.gwtextsize img {
  height: 1.2em;  /* Adjust this value as needed */
  width: auto;  /* Keeps the aspect ratio intact */
  vertical-align: middle; /* Aligns the image vertically with the text */
}

.team-icon {
  height: 1.2em;  /* Adjust this value as needed */
  width: auto;  /* Keeps the aspect ratio intact */
  vertical-align: middle; /* Aligns the image vertically with the text */
}
</style>