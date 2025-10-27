# Deploy to Vercel - Quick Guide

## Ready to Deploy! 🚀

Your frontend is ready for Vercel deployment.

## Deployment Steps

### Step 1: Push to GitHub

You need to push to GitHub first. Since you've already created the `telefonehub-frontend` repository:

```bash
cd /Users/mac/telefonehub-frontend
git push -u origin main
```

If prompted for credentials:
- Use a Personal Access Token instead of password
- Create token at: https://github.com/settings/tokens
- Scope needed: `repo`

### Step 2: Deploy on Vercel

#### Option A: Via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Find `telefonehub-frontend` in your repositories
   - Click "Import"

3. **Configure Build**
   - **Framework Preset**: Create React App (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `build`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `REACT_APP_API_URL` | `https://api.telefonehub.com` |
   | `REACT_APP_WS_URL` | `wss://api.telefonehub.com` |

5. **Deploy**
   - Click "Deploy"
   - Wait ~2 minutes
   - Your app is live!

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
cd /Users/mac/telefonehub-frontend
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No (create new)
# - Project name? telefonehub-frontend
# - Directory? ./
# - Override settings? No
```

After deployment, add environment variables:

```bash
vercel env add REACT_APP_API_URL
# Enter: https://api.telefonehub.com

vercel env add REACT_APP_WS_URL
# Enter: wss://api.telefonehub.com
```

Then redeploy:

```bash
vercel --prod
```

## Expected Results

✅ **Deployment URL**: `https://telefonehub-frontend.vercel.app`  
✅ **Build Time**: ~2 minutes  
✅ **Auto SSL**: Yes, automatic  
✅ **CDN**: Automatic global CDN  
✅ **Performance**: Optimized bundle size  

## Custom Domain

### Add telefonehub.com

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add domain: `telefonehub.com`
3. Add www subdomain: `www.telefonehub.com`
4. Vercel will provide DNS records
5. Update your DNS provider with these records
6. Wait 5-10 minutes for DNS propagation
7. SSL certificate auto-issues

## Environment Variables

### Production

Already configured in `vercel.json`:
```json
{
  "env": {
    "REACT_APP_API_URL": "https://api.telefonehub.com",
    "REACT_APP_WS_URL": "wss://api.telefonehub.com"
  }
}
```

### Override for Different Environments

In Vercel dashboard → Settings → Environment Variables:

- **Production**: `https://api.telefonehub.com`
- **Preview**: `https://api-staging.telefonehub.com`
- **Development**: `http://localhost:3000`

## Troubleshooting

### Build Fails

**Issue**: Build errors on Vercel  
**Solution**: Check build logs, common issues:
- Missing dependencies (add to `package.json`)
- TypeScript errors (fix locally first)
- Memory issues (upgrade Vercel plan)

### Environment Variables Not Working

**Issue**: API calls not working  
**Solution**: 
1. Ensure variables start with `REACT_APP_`
2. Redeploy after adding variables
3. Check in browser console: `process.env.REACT_APP_API_URL`

### Routing Issues

**Issue**: 404 on page refresh  
**Solution**: Already configured in `vercel.json`:
```json
{
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

## Next Steps

After deployment:

1. ✅ **Test the app**: Visit your Vercel URL
2. ✅ **Configure domain**: Add telefonehub.com
3. ✅ **Update backend**: Point backend to production
4. ✅ **Enable analytics**: Vercel Analytics
5. ✅ **Set up monitoring**: Sentry or similar

## Performance Tips

Vercel automatically:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Compression (gzip)
- ✅ Edge caching
- ✅ Image optimization

## Support

Need help?
- Vercel Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord
- Email: support@telefonehub.com

---

**Ready to go live! 🚀**

