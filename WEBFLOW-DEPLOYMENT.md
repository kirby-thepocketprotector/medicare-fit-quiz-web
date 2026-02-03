# Webflow Deployment Guide

## Overview

This Medicare Fit Quiz app has been successfully converted to a static web app ready for deployment on Webflow. The build includes:

- **Article Page**: `dist/index.html` (31 KB)
- **Quiz Intro**: `dist/splash.html` (29 KB)
- **Quiz Pages**: All question pages in `dist/quiz/` folder
- **Total Size**: 4.9 MB

## Deployment Method: iframe Embedding

Since you want to deploy at specific Webflow URLs, the recommended approach is to host the static files separately and embed them using iframes.

---

## Step 1: Host the Static Files

You have several options for hosting:

### Option A: Netlify (Recommended - Free & Easy)

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy to Netlify**:
   ```bash
   cd dist
   netlify deploy --prod
   ```

3. **Follow the prompts**:
   - Create a new site or link to existing
   - Set the deploy directory to `.` (current directory)
   - You'll get a URL like: `https://your-site-name.netlify.app`

### Option B: Vercel (Free & Fast)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd dist
   vercel --prod
   ```

3. **You'll get a URL like**: `https://your-project.vercel.app`

### Option C: GitHub Pages

1. **Push the `dist` folder to a GitHub repository**
2. **Enable GitHub Pages** in repo settings
3. **Set the source to the `dist` folder**
4. **You'll get**: `https://yourusername.github.io/repo-name`

---

## Step 2: Embed in Webflow

### For the Article Page
URL: `https://thepocketprotector.com/article-why-i-would-never-get-mediare-advantage-ntm-quiz-2026-v1`

1. **Go to your Webflow page editor**
2. **Add an Embed element** (or Custom Code element)
3. **Insert this iframe code**:

```html
<iframe
  src="https://YOUR-HOSTED-URL.com/"
  width="100%"
  height="2000px"
  frameborder="0"
  scrolling="no"
  style="border: none; overflow: hidden;"
  onload="this.style.height=(this.contentWindow.document.body.scrollHeight+50)+'px';"
></iframe>
```

**Note**: Replace `YOUR-HOSTED-URL.com` with your actual hosting URL (e.g., `your-site.netlify.app`)

### For the Quiz Page
URL: `https://www.thepocketprotector.com/ntm-quiz-2026-v1`

1. **Go to your Webflow page editor**
2. **Add an Embed element**
3. **Insert this iframe code**:

```html
<iframe
  src="https://YOUR-HOSTED-URL.com/splash"
  width="100%"
  height="900px"
  frameborder="0"
  scrolling="no"
  style="border: none; overflow: hidden;"
  onload="this.style.height=(this.contentWindow.document.body.scrollHeight+50)+'px';"
></iframe>
```

**Note**: The quiz starts at `/splash`, not the root URL

---

## Step 3: Advanced iframe Configuration

### Auto-Height Adjustment

To make the iframe automatically adjust to content height, add this script to your Webflow page:

```html
<script>
window.addEventListener('message', function(e) {
  if (e.data.hasOwnProperty('frameHeight')) {
    document.getElementById('medicare-iframe').style.height = e.data.frameHeight + 'px';
  }
});
</script>

<iframe
  id="medicare-iframe"
  src="https://YOUR-HOSTED-URL.com/"
  width="100%"
  height="2000px"
  frameborder="0"
></iframe>
```

### Styling the iframe Container

Add this CSS to your Webflow custom code to ensure proper display:

```css
.iframe-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
}

.iframe-container iframe {
  width: 100%;
  border: none;
  display: block;
}
```

---

## Alternative: Direct File Upload to Webflow

If you prefer to upload files directly to Webflow (not recommended for maintenance):

1. **Export your Webflow site**
2. **Replace the page HTML** with the content from `dist/index.html` or `dist/splash.html`
3. **Upload all assets** from `dist/_expo/` and `dist/assets/` to Webflow's hosting
4. **Update asset paths** in the HTML to point to Webflow's CDN

⚠️ **Warning**: This method makes updates difficult and is not recommended.

---

## Step 4: Testing

After deployment, test the following:

### Article Page
- [ ] Article loads correctly
- [ ] Images display properly
- [ ] "Take the 2-Minute Medicare Fit Quiz" button works
- [ ] Responsive design works on mobile

### Quiz Page
- [ ] Splash screen loads
- [ ] "Start the quiz" button works
- [ ] All quiz questions navigate correctly
- [ ] Date pickers work
- [ ] Option buttons respond correctly
- [ ] Results page displays

---

## Building & Deployment Commands

### Development
```bash
# Install dependencies
npm install --legacy-peer-deps

# Run locally
npx expo start --web
```

### Production Build
```bash
# Build for production
npx expo export --platform web

# Serve locally to test
npx serve dist
```

---

## Maintenance & Updates

When you need to update the content:

1. **Edit the source files** in the `app/` directory
2. **Rebuild the production version**:
   ```bash
   npx expo export --platform web
   ```
3. **Redeploy to your hosting**:
   - Netlify: `cd dist && netlify deploy --prod`
   - Vercel: `cd dist && vercel --prod`
   - GitHub Pages: Push the updated `dist` folder

The iframes will automatically show the updated content!

---

## URLs Summary

| Content | Source File | Hosted URL | Webflow Page |
|---------|-------------|------------|--------------|
| Article | `dist/index.html` | `https://YOUR-HOST/` | `https://thepocketprotector.com/article-why-i-would-never-get-mediare-advantage-ntm-quiz-2026-v1` |
| Quiz | `dist/splash.html` | `https://YOUR-HOST/splash` | `https://www.thepocketprotector.com/ntm-quiz-2026-v1` |

---

## Troubleshooting

### iframe not displaying
- Check if your hosting allows iframe embedding (CORS settings)
- Verify the `X-Frame-Options` header allows embedding
- Test the direct URL first before embedding

### Content not loading
- Check browser console for errors
- Verify all asset paths are correct
- Ensure JavaScript is enabled

### Height issues
- Use the auto-height script provided above
- Set a reasonable default height (2000px for article, 900px for quiz)
- Test on mobile devices

### Navigation not working
- Ensure all links use relative paths
- Check that the quiz flow navigates correctly
- Test back button functionality

---

## Next Steps

1. ✅ Choose a hosting provider (Netlify, Vercel, or GitHub Pages)
2. ✅ Deploy the `dist` folder
3. ✅ Get your hosted URLs
4. ✅ Add iframe embeds to Webflow pages
5. ✅ Test thoroughly on desktop and mobile
6. ✅ Publish your Webflow site

---

## Support

If you encounter any issues:
- Check the browser console for errors
- Verify all URLs are correct
- Test the hosted version directly (without iframe)
- Ensure CORS is properly configured on your hosting

---

**Your web app is ready to deploy! 🚀**
