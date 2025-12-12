import slugify from "slugify";

console.log(slugify("Hello World", { lower: true }));
console.log(slugify("Hello World", { lower: true, strict: true }));
