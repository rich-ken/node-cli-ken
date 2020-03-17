import * as mini from "minimist";

const args = mini(process.argv.slice(2), {
  string: ["product"],
  // boolean: ["pager"],
  alias: { h: "help", v: "version" }
  // default: { lang: "en" }
  // '--': true,
  // stopEarly: true, /* populate _ with first non-option */
  // unknown: function () { ... } /* invoked on unknown param */
});
async function main(): Promise<void> {
  // const product;
  const product = args.product;
  // console.log("args", args);

  if (product === undefined) return console.error("product is undefined");
  console.log(`あなたが注文したのは${product}です`);
}

export = main();
