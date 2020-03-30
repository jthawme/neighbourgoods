const parseMarkdown = require("front-matter-markdown");
const fs = require("fs");
const path = require("path");
const jsonfile = require("jsonfile");
const Vibrant = require("node-vibrant");
const sharp = require("sharp");
const readline = require("readline");

const locationsContent = path.join(
  __dirname,
  "..",
  "src",
  "content",
  "locations"
);

const staticFile = file => path.join(__dirname, "..", "static", file);

const outputFile = staticFile("data.json");

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

const expandedData = [];

const ensureDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

ensureDir(staticFile("small_img"));

const runner = index => {
  if (index >= data.length) {
    done(expandedData);
    return;
  }

  const imgFile = staticFile(data[index].image);
  const fileName = data[index].image
    .split("/")
    .slice(2)
    .join("/");

  const smallImgFile = staticFile(`small_img/${fileName}`);

  readline.clearLine();
  readline.cursorTo(0);
  process.stdout.write(`Doing: ${index + 1}/${data.length} – ${fileName} `);

  sharp(imgFile)
    .resize(350)
    .toFile(smallImgFile)
    .then(() => {
      Vibrant.from(imgFile).getPalette((err, palette) => {
        const imageObject = {
          src: data[index].image,
          color: err ? "white" : palette.Vibrant.getHex(),
          small: `/small_img/${fileName}`
        };

        expandedData.push({
          ...data[index],
          imageObject
        });

        runner(index + 1);
      });
    });
};

runner(0);

function done(d) {
  try {
    jsonfile.writeFileSync(outputFile, d);
    console.log("Written query data!");
  } catch (e) {
    console.error("Error making query data");
    throw new Error(e);
  }
}
