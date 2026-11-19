# 🍺 Yuki & Bombs Crew Brew C.O. (`beerbrew-web`)

<p align="center">
  <img src="images/logo.png"  width="500">
</p>

**Yuki & Bombs Crew Brew C.O.** is a full-stack brewing studio and recipe formulation web application 
---

## ✨ Features

* **Recipe Formulation & Live Brewing Math:**
  * Real-time calculation of **Original Gravity (OG)**, **Final Gravity (FG)**, **ABV**, **IBU** (selectable **Tinseth** or **Rager** formulas with pellet utilization adjustment, First Wort, and Whirlpool handling), **SRM Beer Color** (Morey equation with live hex swatch), and **Calories per 355 ml**.
  * Support for **Fermentables** (Grain, Sugar, Liquid/Dry Extract), **Hops**, **Yeasts**, **Miscs & Water Salts**, and multi-step **Mash Schedules** (Infusion, Temperature, Decoction).
* **BJCP 2021 & Custom Beer Style Library:**
  * Pre-seeded with **44 BJCP 2021 styles** (Lagers, IPAs, Stouts, Wheat beers, Belgian ales, Sours) plus full CRUD support to create, search, and edit custom beer styles.
  * Live green/red vital range indicators comparing your recipe metrics against the selected style's guidelines.
* **Equipment & Water Chemistry Profiles:**
  * Manage custom **Equipment Profiles** (batch size, boil time, evaporation rate, kettle/lauter deadspace, trub/chiller loss, grain absorption, and brewhouse efficiency) that auto-populate recipe parameters.
  * Manage **Water Ion Profiles** ($\text{Ca}^{2+}$, $\text{Mg}^{2+}$, $\text{Na}^{+}$, $\text{Cl}^{-}$, $\text{SO}_4^{2-}$, $\text{HCO}_3^{-}$, pH) with automatic $\text{SO}_4:\text{Cl}$ ratio and flavor balance classification.
* **Ingredient Inventory & Brew Day Tracking:**
  * Track on-hand stock for malts, hops, yeasts, and adjuncts, quick-add items into recipes, and log sessions via **"🍺 Brew It (Deduct Stock)"** to automatically subtract used ingredients and record **Brew Notes**.
* **Brewing Calculators & BeerXML 1.0:**
  * Built-in calculators for **Mash Strike Water Temperature**, **Refractometer Alcohol Correction** (Sean Terrill cubic formula), **Priming Sugar Carbonation**, and **Hydrometer Temperature Correction**.
  * Full **BeerXML 1.0** import and export, plus a print-ready **Brew Day Sheet**.
* **Translations:**
  * English
  * Spanish
  * Portuguese
  
![App Screenshot](images/screenshot.png)

---

Built with **Java (Spring Boot 3.4)**, **SQLite**, and **React 19 (TypeScript)**, packaged as a self-contained multi-stage container running on **`registry.fedoraproject.org/fedora:latest`**. 

## 📁 Project Structure

```text
beerbrew-web/
├── Containerfile                     # 3-stage Fedora latest build (Node -> Maven/OpenJDK 25 -> JRE 25)
├── backend/                          # Spring Boot 3.4 + Spring Data JPA + SQLite
│   ├── pom.xml
│   └── src/main/
│       ├── resources/application.properties
│       └── java/com/beerbrew/web/
│           ├── BeerbrewWebApplication.java
│           ├── controller/RecipeController.java
│           ├── model/                # Recipe, Fermentable, Hop, Yeast, Misc, MashStep, Equipment, Water, Style, BrewNote, Inventory
│           ├── repository/           # Spring Data JPA repositories
│           └── service/              # BrewMathService, BeerXmlService, DataSeederService
└── frontend/                         # React 19 + Vite + TypeScript SPA
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── src/
        ├── main.tsx
        ├── types.ts
        └── App.tsx
```

---

## 🛠️ Prerequisites

* **OS:** Fedora Linux (or any Linux distribution with Podman installed)
* **Container Engine:** `podman` (`sudo dnf install -y podman unzip`)
* **Network Access (during build):** Required to pull `registry.fedoraproject.org/fedora:latest` and download NPM and Maven dependencies.

---

## 🏗️ How to Build the Container Image

The `Containerfile` uses `registry.fedoraproject.org/fedora:latest` across all three stages:
1. **Stage 1 (`ui-builder`):** Installs `nodejs-npm` and compiles the React + TypeScript frontend (`npm run build`).
2. **Stage 2 (`api-builder`):** Installs `java-25-openjdk-devel` and `maven`, embeds the compiled React bundle into `src/main/resources/static`, and packages the executable Spring Boot fat JAR (`beerbrew-web-1.0.0.jar`).
3. **Stage 3 (Runtime):** Installs `java-25-openjdk-headless` and configures a non-root `brewer` user (`UID 1000`) serving the application on port `8080`.

### Build Steps

1. **Extract the project archive and enter the project directory:**
   ```bash
   unzip -o beerbrew-web-yb-crew-fedora-latest.zip
   cd beerbrew-web
   ```

2. **Build the image with Podman:**
   ```bash
   podman build -t beerbrew-web:1.0.0 -f Containerfile .
   ```

3. **Verify the image was created:**
   ```bash
   podman images beerbrew-web
   ```

---

## 🚀 How to Run and Use the Container

### 1. Prepare Persistent SQLite Storage

SQLite stores all recipes, styles, equipment profiles, water profiles, inventory, and brew logs in `/app/data/beerbrew.db` inside the container. Create a host directory with proper ownership so rootless Podman can read and write the database and WAL journal files:

```bash
mkdir -p ~/.local/share/beerbrew-web-data
sudo chown -R $(id -u):$(id -g) ~/.local/share/beerbrew-web-data
chmod 775 ~/.local/share/beerbrew-web-data
```

### 2. Start the Container

```bash
podman run -d \
  --name beerbrew-web \
  --restart unless-stopped \
  --userns=keep-id \
  --user $(id -u):$(id -g) \
  -p 8080:8080 \
  -v ~/.local/share/beerbrew-web-data:/app/data:Z \
  beerbrew-web:1.0.0
```

#### Container Flag Reference
| Flag | Purpose |
| :--- | :--- |
| `-d` | Runs the container in the background (detached mode). |
| `--name beerbrew-web` | Names the container for easy management (`podman logs`, `podman stop`). |
| `--restart unless-stopped` | Automatically restarts the container if it exits unexpectedly. |
| `--userns=keep-id` & `--user $(id -u):$(id -g)` | Maps your Fedora host user directly into the container so SQLite has full write permissions on the mounted volume. |
| `-p 8080:8080` | Maps host port `8080` to the Spring Boot embedded Tomcat server. |
| `-v ~/.local/share/beerbrew-web-data:/app/data:Z` | Persists `beerbrew.db` on your host filesystem with private SELinux relabeling (`:Z`). |

### 3. Access the Application

1. **Verify startup in logs:**
   ```bash
   podman logs -f beerbrew-web
   ```
   Wait until you see `Started BeerbrewWebApplication` (press `Ctrl+C` to exit logs).
2. **Open in your browser:**
   Navigate to **[http://localhost:8080](http://localhost:8080)**.

---

## 🔄 Container Lifecycle & Backup Commands

* **Stop the container:**
  ```bash
  podman stop beerbrew-web
  ```
* **Start an existing container:**
  ```bash
  podman start beerbrew-web
  ```
* **Update after code changes:**
  ```bash
  podman build -t beerbrew-web:1.0.0 -f Containerfile .
  podman rm -f beerbrew-web
  # Re-run the `podman run -d ...` command above (your SQLite data in ~/.local/share/beerbrew-web-data is preserved)
  ```
* **Backup your SQLite database:**
  ```bash
  cp ~/.local/share/beerbrew-web-data/beerbrew.db ~/beerbrew-backup-$(date +%F).db
  ```

---

## ⚙️ Optional: Auto-Start on Boot with Fedora Systemd Quadlet

To manage `beerbrew-web` as a native rootless systemd user service on Fedora:

1. **Create `~/.config/containers/systemd/beerbrew-web.container`:**
   ```bash
   mkdir -p ~/.config/containers/systemd

   cat << 'EOF' > ~/.config/containers/systemd/beerbrew-web.container
   [Unit]
   Description=Y&B Crew Beer C.O. Brewing Web Application
   After=network-online.target

   [Container]
   Image=localhost/beerbrew-web:1.0.0
   ContainerName=beerbrew-web
   PublishPort=8080:8080
   UserNS=keep-id
   Volume=%h/.local/share/beerbrew-web-data:/app/data:Z

   [Service]
   Restart=always

   [Install]
   WantedBy=default.target
   EOF
   ```

2. **Enable and start the service:**
   ```bash
   podman rm -f beerbrew-web 2>/dev/null || true
   systemctl --user daemon-reload
   systemctl --user start beerbrew-web.service
   ```

---

## 💻 Local Development (Without Container)

If you want to run the backend and frontend directly on your Fedora host for rapid development:

1. **Start the Spring Boot backend (port `8080`):**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
2. **Start the Vite React dev server (port `5173`, proxies `/api` to `8080`):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 🩺 Troubleshooting

* **`java.sql.SQLException: opening db: './data/beerbrew.db': Permission denied`**
  Ensure your host volume directory exists, is owned by your UID/GID, and is mounted with `:Z` alongside `--userns=keep-id --user $(id -u):$(id -g)`:
  ```bash
  sudo chown -R $(id -u):$(id -g) ~/.local/share/beerbrew-web-data
  chmod 775 ~/.local/share/beerbrew-web-data
  ```
* **Port `8080` already in use:**
  Change the host port mapping in `podman run` (for example, `-p 8085:8080`) and access the UI at `http://localhost:8085`.
