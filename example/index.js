import vue from "vue"
import app from "./app"

new vue({
  el:"#app",
  render:v => v(app)
})