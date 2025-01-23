<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <div class="not-found">
          <h1>Sorry, this page does not exist</h1>
          <router-link to="/">Back to homepage</router-link>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import {
    IonContent,
    IonPage
  } from '@ionic/vue';
  </script>
  
  <style scoped>
  /* Add your component styles here */
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  
  .not-found h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .not-found router-link {
    color: blue;
  }
  </style>
      
  