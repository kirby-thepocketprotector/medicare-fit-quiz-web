# Complete Guide: GitHub Push & Webflow Deployment

## Part 1: Push to GitHub

### Step 1: Add All Files to Git

```bash
git add .
```

This stages all your files for the first commit.

### Step 2: Make Your First Commit

```bash
git commit -m "Initial commit: Medicare Fit Quiz web app

- Converted React Native app to web
- Added production build in dist/ folder
- Includes article and quiz pages ready for Webflow deployment"
```

### Step 3: Create a GitHub Repository

**Option A: Using GitHub Web Interface**

1. Go to https://github.com/new
2. Create a new repository:
   - Repository name: `medicare-fit-quiz-web` (or your preferred name)
   - Description: "Medicare Fit Quiz - Web version for Webflow deployment"
   - Make it **Public** or **Private** (your choice)
   - **DO NOT** check "Initialize with README" (we already have files)
3. Click "Create repository"

**Option B: Using GitHub CLI** (if you have it installed)

```bash
gh repo create medicare-fit-quiz-web --public --source=. --remote=origin
```

### Step 4: Link Your Local Repo to GitHub

After creating the repo on GitHub, copy the repository URL and run:

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/medicare-fit-quiz-web.git

# Verify it's added
git remote -v
```

### Step 5: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

Your code is now on GitHub! 🎉

---

## Part 2: Deploy to Webflow

### Important Note About Webflow
Webflow doesn't have a direct "app gen" deployment tool for React apps. Instead, you have **two main options**:

---

## Option A: Host Separately & Embed (Recommended)

This is the best approach for your use case since you want specific URLs on thepocketprotector.com.

### Step 1: Deploy to Netlify (Free & Easy)

**In your terminal, run:**

```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from the dist folder
cd dist
netlify deploy --prod
```

**Follow the prompts:**
- Choose "Create & configure a new site"
- Select your team
- Site name: `medicare-fit-quiz` (or your choice)
- Publish directory: `.` (current directory, since you're already in dist/)

**You'll get a URL like:** `https://medicare-fit-quiz.netlify.app`

### Step 2: Embed in Webflow Pages

**For Article Page:**
1. Open Webflow Designer
2. Go to the page: `/article-why-i-would-never-get-mediare-advantage-ntm-quiz-2026-v1`
3. Add an **Embed** element
4. Paste this code:

```html
<div style="width: 100%; margin: 0 auto;">
  <iframe
    src="https://YOUR-SITE.netlify.app/"
    width="100%"
    height="2000"
    frameborder="0"
    style="border: none; overflow: hidden;"
    id="article-iframe"
  ></iframe>
</div>

<script>
  // Auto-adjust iframe height
  window.addEventListener('message', function(e) {
    var iframe = document.getElementById('article-iframe');
    if (e.data.height) {
      iframe.style.height = e.data.height + 'px';
    }
  });
</script>
```

**For Quiz Page:**
1. Go to the page: `/ntm-quiz-2026-v1`
2. Add an **Embed** element
3. Paste this code:

```html
<div style="width: 100%; margin: 0 auto;">
  <iframe
    src="https://YOUR-SITE.netlify.app/splash"
    width="100%"
    height="900"
    frameborder="0"
    style="border: none; overflow: hidden;"
    id="quiz-iframe"
  ></iframe>
</div>

<script>
  // Auto-adjust iframe height
  window.addEventListener('message', function(e) {
    var iframe = document.getElementById('quiz-iframe');
    if (e.data.height) {
      iframe.style.height = e.data.height + 'px';
    }
  });
</script>
```

4. **Replace** `YOUR-SITE.netlify.app` with your actual Netlify URL
5. **Publish** your Webflow site

---

## Option B: Use Webflow Custom Code (Advanced)

If you want to integrate the code directly into Webflow:

### Step 1: Export Your Webflow Site
1. In Webflow, go to Project Settings
2. Export your site code

### Step 2: Merge the React App
1. Copy contents from `dist/index.html` for the article page
2. Copy contents from `dist/splash.html` for the quiz page
3. Copy all assets from `dist/_expo/` and `dist/assets/`
4. Update your Webflow pages with this content

### Step 3: Re-upload to Webflow
This is complex and not recommended for maintenance purposes.

---

## Option C: Deploy to Vercel (Alternative to Netlify)

If you prefer Vercel over Netlify:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from dist folder
cd dist
vercel --prod
```

Follow the prompts, and you'll get a URL like: `https://medicare-fit-quiz.vercel.app`

Then use the same iframe embedding approach as with Netlify.

---

## Quick Commands Summary

### One-Time Setup
```bash
# 1. Commit to Git
git add .
git commit -m "Initial commit: Medicare Fit Quiz web app"

# 2. Create GitHub repo (on github.com/new)

# 3. Link and push
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main

# 4. Deploy to Netlify
cd dist
netlify login
netlify deploy --prod
```

### Future Updates
```bash
# Make changes, rebuild, and redeploy
npx expo export --platform web
cd dist
netlify deploy --prod
```

---

## Testing Your Deployment

### Test the Hosted Version
1. Visit your Netlify/Vercel URL directly
2. Check that:
   - Article page loads at `/`
   - Quiz starts at `/splash`
   - All navigation works
   - Mobile responsive works

### Test in Webflow
1. Preview your Webflow pages
2. Verify iframes load correctly
3. Test on mobile preview
4. Publish and test live

---

## Custom Domain (Optional)

If you want a custom domain for your hosted app:

### On Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain: `quiz.thepocketprotector.com` (or similar)
3. Update DNS records as instructed
4. Update iframe src in Webflow to use custom domain

### On Webflow:
Your Webflow pages will still be at `thepocketprotector.com` with the full paths, but the iframe content comes from your hosted app.

---

## Troubleshooting

### "Git remote already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### "Permission denied" on GitHub push
- Make sure you're logged into GitHub
- Use Personal Access Token instead of password
- Or set up SSH keys

### Iframe not loading in Webflow
- Check browser console for errors
- Verify CORS settings (Netlify/Vercel handle this automatically)
- Test the direct URL first

### Content height issues
- Use the auto-height script provided
- Set reasonable default heights
- Test on various devices

---

## Need Help?

1. **GitHub Issues**: Check your repository's Issues tab
2. **Netlify Support**: https://docs.netlify.com/
3. **Webflow Forum**: https://forum.webflow.com/
4. **Browser Console**: Check for JavaScript errors

---

**You're ready to deploy! 🚀**

Start with Part 1 to push to GitHub, then choose your deployment method in Part 2.
