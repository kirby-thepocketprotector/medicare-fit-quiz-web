# Webflow Cloud Builder - Alternative Configurations

If the current `webflow.json` doesn't work, try these alternatives:

## Current Configuration (Vite)
```json
{
  "cosmic": {
    "framework": "vite",
    "buildCommand": "npm install --legacy-peer-deps && npm run web:build",
    "outputDirectory": "dist",
    "nodeVersion": "20"
  }
}
```

---

## Alternative 1: Next.js Framework
```json
{
  "cosmic": {
    "framework": "next",
    "buildCommand": "npm install --legacy-peer-deps && npm run web:build",
    "outputDirectory": "dist",
    "nodeVersion": "20"
  }
}
```

---

## Alternative 2: Create React App
```json
{
  "cosmic": {
    "framework": "create-react-app",
    "buildCommand": "npm install --legacy-peer-deps && npm run web:build",
    "outputDirectory": "dist",
    "nodeVersion": "20"
  }
}
```

---

## Alternative 3: Gatsby
```json
{
  "cosmic": {
    "framework": "gatsby",
    "buildCommand": "npm install --legacy-peer-deps && npm run web:build",
    "outputDirectory": "dist",
    "nodeVersion": "20"
  }
}
```

---

## Alternative 4: Custom/Other
```json
{
  "cosmic": {
    "framework": "other",
    "buildCommand": "npm install --legacy-peer-deps && npm run web:build",
    "outputDirectory": "dist",
    "nodeVersion": "20"
  }
}
```

---

## Alternative 5: Minimal (No Framework Specified)
```json
{
  "cosmic": {
    "buildCommand": "npm install --legacy-peer-deps && npm run web:build",
    "outputDirectory": "dist",
    "nodeVersion": "20"
  }
}
```

---

## How to Switch Configurations

1. Copy one of the configurations above
2. Replace the contents of `webflow.json` with it
3. Commit and push:
   ```bash
   git add webflow.json
   git commit -m "Try [framework name] configuration"
   git push origin main
   ```
4. Trigger a new build in Webflow Cloud Builder

---

## Recommended: Use Netlify Instead

If Webflow Cloud Builder continues to have issues, the **easiest solution** is to use Netlify (which we already set up successfully):

### Your Live Netlify Site:
**https://sweet-boba-fd6102.netlify.app**

### Connect Netlify to GitHub (Continuous Deployment):
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Select: `kirby-thepocketprotector/medicare-fit-quiz-web`
5. Settings should auto-detect from `netlify.toml`:
   - **Build command:** `npm run web:build`
   - **Publish directory:** `dist`
6. Click "Deploy"

Every push to GitHub will automatically trigger a new deployment!

### Then Embed in Webflow:
Use iframes on your Webflow pages:

**Article iframe:**
```html
<iframe src="https://sweet-boba-fd6102.netlify.app/" width="100%" height="2000" frameborder="0"></iframe>
```

**Quiz iframe:**
```html
<iframe src="https://sweet-boba-fd6102.netlify.app/splash" width="100%" height="900" frameborder="0"></iframe>
```

---

## Why Netlify Might Be Better

- ✅ Already working
- ✅ Automatic continuous deployment from GitHub
- ✅ Better build logs and debugging
- ✅ Free SSL certificates
- ✅ CDN included
- ✅ No "cosmic" framework issues

---

## Debugging Webflow Cloud Builder

If you want to see what frameworks Webflow supports:
1. Check Webflow Cloud Builder documentation
2. Look at the full error logs (not just the summary)
3. Contact Webflow support for valid `cosmic.framework` values

The error suggests Webflow has a limited list of supported frameworks and may not support Expo/React Native Web builds directly.
