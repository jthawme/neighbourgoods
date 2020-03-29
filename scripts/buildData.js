const parseMarkdown = require("front-matter-markdown");
const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");

const locationsContent = path.join(
  __dirname,
  "..",
  "src",
  "content",
  "locations"
);
const outputFile = path.join(__dirname, "..", "static", "data.json");

const files = fs.readdirSync(locationsContent);

const data = files
  .map(f => {
    const p = path.join(locationsContent, f);
    if (fs.existsSync(p)) {
      const parsed = parseMarkdown(fs.readFileSync(p, "utf8"), {
        content: false
      });

      const { location, skipSize, ...rest } = parsed;

      return {
        ...rest,
        id: location.place_id,
        coords: location.geometry.location,
        opening_hours: location.opening_hours
          ? location.opening_hours.periods
          : false
      };
    }

    return false;
  })
  .filter(d => d);

try {
  jsonfile.writeFileSync(outputFile, data);
  console.log("Written query data!");
} catch (e) {
  console.error("Error making query data");
  throw new Error(e);
}
