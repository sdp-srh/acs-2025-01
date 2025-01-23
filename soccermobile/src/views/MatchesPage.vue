<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Matches Page</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-grid>
            <ion-row>
                <ion-col size="12">
                <table class="ionic-table">
                    <thead>
                    <tr>
                        <th>Team 1</th>
                        <th>Result</th>
                        <th>Teams 2</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="match in matches" :key="match.matchID">
                        <td><img :src="match.team1.teamIconUrl" class="team-icon" />&nbsp;{{ match.team1.teamName }}</td>
                        <td>{{ getMatchResult(match) }}</td>
                        <td><img :src="match.team2.teamIconUrl" class="team-icon" />&nbsp;{{ match.team2.teamName }}</td>
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
const matches = ref([])
onMounted(async () => {
  console.log('loading teams')
  if (matches.value.length === 0) {
    loadMatches()
  }
})

const loadMatches = async () => {
    const response = await fetch('/api/match')
    const data = await response.json()
    matches.value = data

}

const getMatchResult = (match) => {
    let resultText = ''
    const finalResult = match.matchResults.find(m => m.resultTypeID == 2)
    if (finalResult) {
        resultText = finalResult.pointsTeam1 + ' : ' + finalResult.pointsTeam2
    }
    return resultText
}
/*

{
    "lastUpdateDateTime": "2023-08-25T09:47:16.603",
    "numberOfViewers": null,
    "matchDateTime": "2023-08-18T20:30:00",
    "leagueShortcut": "bl1",
    "timeZoneID": "W. Europe Standard Time",
    "team1": {
      "teamName": "Werder Bremen",
      "teamGroupName": null,
      "teamId": 134,
      "teamIconUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/SV-Werder-Bremen-Logo.svg/681px-SV-Werder-Bremen-Logo.svg.png",
      "shortName": "Bremen"
    },
    "team2": {
      "teamName": "FC Bayern München",
      "teamGroupName": null,
      "teamId": 40,
      "teamIconUrl": "https://i.imgur.com/jJEsJrj.png",
      "shortName": "Bayern"
    },
    "matchDateTimeUTC": "2023-08-18T18:30:00Z",
    "leagueName": "1. Fußball-Bundesliga 2023/2024",
    "matchIsFinished": true,
    "leagueSeason": 2023,
    "leagueId": 4608,
    "matchResults": [
      {
        "resultTypeID": 1,
        "resultID": 103483,
        "resultOrderID": 1,
        "pointsTeam1": 0,
        "pointsTeam2": 1,
        "resultDescription": null,
        "resultName": "Halbzeitergebnis"
      },
      {
        "resultTypeID": 2,
        "resultID": 103482,
        "resultOrderID": 2,
        "pointsTeam1": 0,
        "pointsTeam2": 4,
        "resultDescription": "Ergebnis nach Ende der offiziellen Spielzeit",
        "resultName": "Endergebnis"
      }
    ],
    "location": null,
    "matchID": 66630,
    "group": {'ID
      "groupName": "1. Spieltag",
      "groupOrderID": 1,
      "groupID": 41129
    },
    "goals": [
      {
        "goalID": 102637,
        "scoreTeam1": 0,
        "isOvertime": false,
        "scoreTeam2": 1,
        "matchMinute": 4,
        "isOwnGoal": false,
        "comment": null,
        "goalGetterID": 18433,
        "goalGetterName": "",
        "isPenalty": false
      },
      {
        "goalID": 102639,
        "scoreTeam1": 0,
        "isOvertime": false,
        "scoreTeam2": 2,
        "matchMinute": 74,
        "isOwnGoal": false,
        "comment": null,
        "goalGetterID": 18898,
        "goalGetterName": "",
        "isPenalty": false
      },
      {
        "goalID": 102640,
        "scoreTeam1": 0,
        "isOvertime": false,
        "scoreTeam2": 3,
        "matchMinute": 90,
        "isOwnGoal": false,
        "comment": null,
        "goalGetterID": 18433,
        "goalGetterName": "",
        "isPenalty": false
      },
      {
        "goalID": 102641,
        "scoreTeam1": 0,
        "isOvertime": true,
        "scoreTeam2": 4,
        "matchMinute": 94,
        "isOwnGoal": false,
        "comment": null,
        "goalGetterID": 19490,
        "goalGetterName": "",
        "isPenalty": false
      }
    ]
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

.team-icon {
  height: 1.2em;  /* Adjust this value as needed */
  width: auto;  /* Keeps the aspect ratio intact */
  vertical-align: middle; /* Aligns the image vertically with the text */
}
</style>