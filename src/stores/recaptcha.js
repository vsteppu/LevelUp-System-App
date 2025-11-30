import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useGoogleToken = defineStore( "cloudflare-turnstile", () => {
    const siteKey = import.meta.env.VITE_GOOGLE_SITE_KEY;
    const isRecaptchaEnabled = import.meta.env.VITE_GOOGLE_RECAPTCHA_ENABLED === 'true'
    const reCaptchaToken = ref(null);
    const WIDGET_CONTAINER = 'reCaptchaContainer';
    const widgetId = ref(null);

    const insertWidget = async () => {
        const grecaptchaContainer = document.getElementById(WIDGET_CONTAINER);
        console.log('grecaptchaContainer: ', grecaptchaContainer);

        widgetId.value = await window.grecaptcha.render(grecaptchaContainer, {
            sitekey: siteKey,
            size: "invisible"
        });
        console.log('widgetId.value: ', widgetId.value);

        reCaptchaToken.value = await window.grecaptcha.execute(widgetId.value);
        console.log('reCaptchaToken.value: ', reCaptchaToken.value);
    };

    const getToken = async() => {
        if(widgetId.value == null) {
            await insertWidget();
        }

        await window.grecaptcha.reset();
        return await window.grecaptcha.execute(widgetId.value);
    }


    watch(reCaptchaToken, () => {
        console.log("🧩 TOKEN");
    });

    return {
        siteKey,
        reCaptchaToken,

        insertWidget,
        getToken,
    };
});
