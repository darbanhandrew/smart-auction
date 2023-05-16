/* generate a route files from a template and a list of routes 
the function should get a list of names, then for each name there should be four files for index(list), create, edit and show
in the app/routes folder with the latter structure :
app/routes/_layout.{name}._index.tsx
app/routes/_layout.{name}.create.tsx 
app/routes/_layout.{name}.edit.$id.tsx 
app/routes/_layout.{name}.show.$id.tsx
the content of each file will be :
import { AntdInferencer } from "@refinedev/inferencer/antd";
export default function {PascalCaseName + (List or Create or Edit or Show)}() {
  return <AntdInferencer />;
}
-----
also in the folder /app/components there should be a folder with the name of the route and 4 files named like below
app/components/{name}/{PasteCaseName + (List or Create or Edit or Show) + Comp}.tsx
the content of each file is empty
*/

// import fs and other modules
const fs = require("fs");
const path = require("path");

//define the list of names
const names = [
  "bid",
  "art_material",
  "art_technique",
  "art_category",
  "auction_house",
  "auction_art",
  "artist",
  "art",
  "bid_step_category",
  "bid_step",
  "auction",
];

// generate the files
names.forEach((name) => {
  //generate the files in the app/routes folder and convert names in the function name to PascalCase
  fs.writeFile(
    path.join(__dirname, `./app/routes/_layout.${name}._index.tsx`),
    `import { AntdInferencer } from "@refinedev/inferencer/antd";
        export default function ${name
          .split("_")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join("")}List() {
            return <AntdInferencer />;
        }`,
    (err) => {
      if (err) throw err;
    }
  );
  fs.writeFile(
    path.join(__dirname, `./app/routes/_layout.${name}.create.tsx`),
    `import { AntdInferencer } from "@refinedev/inferencer/antd";
        export default function ${name
          .split("_")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join("")}Create() {
            return <AntdInferencer />;
        }`,
    (err) => {
      if (err) throw err;
    }
  );
  fs.writeFile(
    path.join(__dirname, `./app/routes/_layout.${name}.edit.$id.tsx`),
    `import { AntdInferencer } from "@refinedev/inferencer/antd";
        export default function ${name
          .split("_")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join("")}Edit() {
            return <AntdInferencer />;
        }`,
    (err) => {
      if (err) throw err;
    }
  );
  fs.writeFile(
    path.join(__dirname, `./app/routes/_layout.${name}.show.$id.tsx`),
    `import { AntdInferencer } from "@refinedev/inferencer/antd";
        export default function ${name
          .split("_")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join("")}Show() {
            return <AntdInferencer />;
        }`,
    (err) => {
      if (err) throw err;
    }
  );
  //generate the files in the app/components folder and convert names in the function name to PascalCase
  //create directory if not exist,use PascalCaseName for file name
  if (!fs.existsSync(path.join(__dirname, `./app/components/${name}`))) {
    fs.mkdirSync(path.join(__dirname, `./app/components/${name}`));
  }
  fs.writeFile(
    path.join(
      __dirname,
      `./app/components/${name}/${PascalCaseName(name)}ListComp.tsx`
    ),
    `export default function ${name
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("")}ListComp() {
            return <></>;
        }`,
    (err) => {
      if (err) throw err;
    }
  );
  fs.writeFile(
    path.join(
      __dirname,
      `./app/components/${name}/${PascalCaseName(name)}CreateComp.tsx`
    ),
    `export default function ${name
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("")}CreateComp() {
            return <></>;
        }`,
    (err) => {
      if (err) throw err;
    }
  );
  fs.writeFile(
    path.join(
      __dirname,
      `./app/components/${name}/${PascalCaseName(name)}EditComp.tsx`
    ),
    `export default function ${name
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("")}EditComp() {
            return <></>;
        }`,
    (err) => {
      if (err) throw err;
    }
  );
  fs.writeFile(
    path.join(
      __dirname,
      `./app/components/${name}/${PascalCaseName(name)}ShowComp.tsx`
    ),
    `export default function ${name
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("")}ShowComp() {
            return <></>;
        }`,
    (err) => {
      if (err) throw err;
    }
  );
});

function PascalCaseName(name) {
  return name
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
}
