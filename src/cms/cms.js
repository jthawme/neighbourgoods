import CMS from "netlify-cms-app";

import LocationPreview from "./preview-templates/LocationPreview";
// import LinksComponent from "./widgets/links";
import CategoriesComponent from "./widgets/categories";
import PlacesInfoHelper from "./widgets/places";

CMS.registerPreviewTemplate("locations", LocationPreview);

// CMS.registerWidget("links", LinksComponent);
CMS.registerWidget("categories", CategoriesComponent);
CMS.registerWidget("places", PlacesInfoHelper);
