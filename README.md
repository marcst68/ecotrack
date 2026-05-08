# EcoTrack 🌿
**Sistema de gestió de residus industrials**  
Projecte Final – Mòdul de Desenvolupament Web / Mòbil

---

## Descripció

EcoTrack és una aplicació Angular 18 per a operaris de plantes industrials que han de registrar la recollida de residus en entorns amb connectivitat inestable. L'app funciona completament **offline** gràcies al Service Worker (PWA) i es pot instal·lar com a **APK Android** via Capacitor.

---

## Tecnologies

| Capa         | Tecnologia                         |
|--------------|------------------------------------|
| Framework    | Angular 18 (Standalone Components) |
| Estils       | SCSS + Variables CSS               |
| Reactivitat  | Signals (`signal`, `computed`)     |
| Formularis   | Template-driven forms              |
| PWA          | `@angular/pwa` + Service Worker    |
| Mòbil        | Capacitor 6 + Android Studio       |

---

## Estructura del projecte

```
ecotrack/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── residu.model.ts         ← Interfície Residu + tipus
│   │   ├── services/
│   │   │   └── residus.service.ts      ← CRUD + Signals reactius
│   │   ├── components/
│   │   │   ├── residu-list/            ← Llistat + filtres + stats
│   │   │   └── residu-form/            ← Formulari d'alta
│   │   ├── app.component.*             ← Shell: header + sidebar + rutes
│   │   └── app.config.ts               ← Bootstrap + ServiceWorker
│   ├── index.html                      ← Meta PWA
│   └── manifest.webmanifest            ← Manifest PWA
├── ngsw-config.json                    ← Config caché Service Worker
├── capacitor.config.ts                 ← Config Capacitor / Android
├── angular.json
└── package.json
```

---

## Instal·lació i posada en marxa

### 1. Clonar i instal·lar dependències

```bash
git clone <repo-url>
cd ecotrack
npm install
```

### 2. Mode desenvolupament

```bash
ng serve
```
Obre `http://localhost:4200`

> ⚠️ El Service Worker **no s'activa** en mode `ng serve`. Per provar la PWA cal el pas 3.

---

## Fase 4 – PWA (Capacitat Offline)

### Instal·lació del suport PWA (ja inclòs)

```bash
ng add @angular/pwa
```

Fitxers clau generats:
- `src/manifest.webmanifest` → Identitat visual (nom, colors, icones)
- `ngsw-config.json` → Estratègia de caché

### Provar la PWA en entorn de producció

```bash
# 1. Genera el build de producció
ng build

# 2. Serveix amb un servidor real
npx http-server -p 8080 dist/ecotrack/browser
```

3. Obre Chrome → `http://localhost:8080`
4. DevTools (F12) → **Application** → **Service Workers** → ha d'apareixer `ngsw-worker.js` actiu.
5. Pestanya **Manifest** → comprova nom, icones i colors.
6. Prova el mode offline: DevTools → Network → **Offline** → refresca.

---

## Fase 5 – APK Android (Capacitor)

### Pas 1: Instal·lar Capacitor (ja inclòs al package.json)

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### Pas 2: Inicialitzar Capacitor

```bash
npx cap init EcoTrack com.ecosolutions.ecotrack --web-dir dist/ecotrack/browser
```

> El `capacitor.config.ts` ja conté aquesta configuració.

### Pas 3: Afegir la plataforma Android

```bash
npx cap add android
```

Crea la carpeta `android/` amb el projecte natiu.

### Pas 4: Sincronitzar (cada vegada que modifiquis el codi)

```bash
ng build
npx cap copy
```

O amb l'script predefinit:
```bash
npm run cap:sync
```

### Pas 5: Generar l'APK

```bash
npx cap open android
```

A Android Studio:
1. Espera que **Gradle** sincronitzi.
2. Menú: **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
3. El fitxer `app-debug.apk` el trobaràs a `android/app/build/outputs/apk/debug/`.

### Provar l'APK

**Mòbil físic:**
1. Activa *Opcions de desenvolupador* + *Depuració USB*.
2. Connecta per USB.
3. Prem ▶ *Run* a Android Studio.

**Emulador Android Studio:**
1. Device Manager → Crea un Pixel 6/7 → Arrenca'l.
2. Arrossega el `.apk` a la pantalla de l'emulador.

**BlueStacks / LDPlayer:**
- Arrossega el `.apk` directament a la finestra.

**Depurar l'APK des de Chrome:**
```
chrome://inspect/#devices
```

---

## Criteris de lliurament

| Element                  | Com lliurar                            |
|--------------------------|----------------------------------------|
| ✅ Versió Web (PWA)       | Publica a Firebase / Vercel / GitHub Pages i envia l'URL |
| ✅ Versió Nativa (APK)    | Adjunta el fitxer `app-debug.apk`     |

### Publicar a GitHub Pages (exemple ràpid)

```bash
ng build --base-href "https://<usuari>.github.io/ecotrack/"
npx angular-cli-ghpages --dir=dist/ecotrack/browser
```

### Publicar a Vercel

```bash
npm i -g vercel
vercel dist/ecotrack/browser
```

---

## Conceptes implementats

| Concepte                    | On                                        |
|-----------------------------|-------------------------------------------|
| Arquitectura de Components  | `AppComponent` → `ResiduListComponent` + `ResiduFormComponent` |
| Gestió de dades amb Serveis | `ResidusService` amb injecció de dependències |
| Signals reactius            | `signal()`, `computed()` a servei i components |
| Control Flow nou d'Angular  | `@for`, `@if`, `@empty` als templates    |
| Estratègia Offline (PWA)    | `ngsw-config.json` + `@angular/pwa`      |
| Desenvolupament Híbrid      | `capacitor.config.ts` + `@capacitor/android` |

---

*Projecte realitzat com a pràctica final del mòdul de Desenvolupament Web. EcoSolutions SL – Planta Industrial 3.*
