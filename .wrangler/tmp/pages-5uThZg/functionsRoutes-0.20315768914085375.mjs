import { onRequestPost as __signup_js_onRequestPost } from "E:\\LevelUp-System-App\\functions\\signup.js"

export const routes = [
    {
      routePath: "/signup",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__signup_js_onRequestPost],
    },
  ]