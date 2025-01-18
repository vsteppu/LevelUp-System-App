<template>
  <main class="flex justify-center items-center">
    <section class="h-20 w-[400px] bg-green-900">
      Steps <p>{{steps}}</p>
      Calories
    </section>
  </main>
<button @click="test()" class="uppercase bg-red-900 p-3 ">test</button>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const steps = ref(0)

const alpha = ref(0); // Rotation around Z-axis
const beta = ref(0);  // Tilt front-to-back
const gamma = ref(0); // Tilt left-to-right

const handleDeviceOrientation = (event) => {
  alpha.value = event.alpha?.toFixed(2) || 0;
  beta.value = event.beta?.toFixed(2) || 0;
  gamma.value = event.gamma?.toFixed(2) || 0;
};

const test = () => {
  const gyroscope = window.DeviceOrientationEvent
  if (gyroscope) {
    if (typeof gyroscope.requestPermission === "function") {
      // iOS-specific permission
      gyroscope.requestPermission()
        .then((response) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
          }
        })
        .catch((error) => {
          console.error("Permission not granted:", error);
        });
    } else {
      // Android and other browsers
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }
  } else {
    console.log("DeviceOrientation is not supported on this device.");
  }
}
const gyroscopeToDetectMovements = () => {
  const gyroscope = window.DeviceOrientationEvent
  if (gyroscope) {
    if (typeof gyroscope.requestPermission === "function") {
      // iOS-specific permission
      gyroscope.requestPermission()
        .then((response) => {
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleDeviceOrientation);
          }
        })
        .catch((error) => {
          console.error("Permission not granted:", error);
        });
    } else {
      // Android and other browsers
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }
  } else {
    console.log("DeviceOrientation is not supported on this device.");
  }
}

onMounted(()=>{
  gyroscopeToDetectMovements()
})

</script>
