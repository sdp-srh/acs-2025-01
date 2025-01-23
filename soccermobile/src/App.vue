<template>

  <ion-app>

    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content> 
            <ion-item @click="navigate('/home')" :class="{selected: route.path.includes('/home'), clickable: true}" >Home</ion-item>
            <ion-item @click="navigate('/matches')" :class="{selected: route.path.includes('/matches'), clickable: true}">Matches</ion-item>                       
            <ion-item @click="navigate('/teams')" :class="{selected: route.path.includes('/teams'), clickable: true}">Teams</ion-item>    
            <ion-item @click="navigate('/tipps')" :class="{selected: route.path.includes('/tipps'), clickable: true}">Tipps</ion-item>
            <!--<ion-item @click="navigate('/about')" :class="{selected: route.path.includes('/about'), clickable: true}"><ion-icon name="information-circle"></ion-icon>&nbsp;About</ion-item>    -->
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content" :animated="false"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
    
</template>

<script setup>

import { IonApp, IonSplitPane, IonMenu, IonContent, IonRouterOutlet, IonItem } from '@ionic/vue';

import { onMounted, computed } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router';
const route = useRoute();
// import firebaseAuth from '@/firebase/firebase-auth'
onMounted(() => {
  console.log('soccer app is started')
})

const navigate = (path) => {
  console.log('navigating to', path)
  router.push(path)
  closeMenu()
}

const closeMenu = () => {
  const menu = document.querySelector('ion-menu')
  if (menu) {
    menu.close()
  }
}
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
  cursor: pointer;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
    font-weight: bold;
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
