async function main(): Promise<void> {
  console.log("sub1 yey!");
  throw new Error("aaa");
}

export = main().then(() => {
  console.log("✅ DONE");
});
// .catch(err => {
//   console.error(err);
// });
