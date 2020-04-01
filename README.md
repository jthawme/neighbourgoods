# Neighbourgoods

This site uses:

- Gatsby
- Netlify CMS (Netlify identity)
- Netlify Functions

# Installation

```
npm install
```

# Running the site

First time (or with new data)

```
npm run create:data && npm run start
```

Normally

```
npm run start
```

# Data

The data is managed through netlify cms, and spits out markdown files into `src/content/locations`

Images are stored in `static/img` and when you run `npm run create:data` it will generate a `small_img` and `data.json` file that can be queried from the lambda/functions folder

A lot of the data to change and localise for your area can be found in `src/cms/constants.js`, that has the restricted bounding box for the map and also the default coordinates, it also has a lot of data for the backend too

## THIS WAS ALL MADE VERY FAST

So any questions please email me hi@jthaw.me and i will just try help out, if you are trying to add it to your area
