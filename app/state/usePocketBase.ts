import PocketBase from 'pocketbase'
const pb = new PocketBase('https://kepatotorica.pockethost.io/')

export const usePocketBase = () => {
  return pb
}