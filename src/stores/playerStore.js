/* eslint-disable no-unused-vars */
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('store', () => {
  const player = ref(JSON.parse(localStorage.getItem("user")) ?? null)
  const upgradedLevel = ref(0)


  const levelUp = (playerLevel) =>{
    playerLevel++
    player.value.level = playerLevel
    localStorage.setItem('user',JSON.stringify(player.value))
    return playerLevel
  }

  /* const levelUp = (playerLevel) =>{
    playerLevel++
    return playerLevel
  }
 */


  const setUpgradedLevel = (newValue) =>{
    player.value.level = newValue
    console.log(player.value.level)
    localStorage.setItem('user',JSON.stringify(player.value))
    return
  }
  const displaydata = () => {
    const storredLevelinplayer = JSON.parse(localStorage.getItem("user"))
    console.log(storredLevelinplayer)
    console.log(storredLevelinplayer.level)
  }


  return {player, levelUp, upgradedLevel, setUpgradedLevel, displaydata}
})
