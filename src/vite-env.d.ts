/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string,
    readonly VITE_API_URL: string
    readonly APP_ENV: string
    readonly BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
