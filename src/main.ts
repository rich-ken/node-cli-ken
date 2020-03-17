import * as fs from "fs";
import * as path from "path";

/** name of the command directory */
const commandDir = path.resolve(__dirname, "./command");
async function main(): Promise<void> {
  const subCommandNames: string[] = [];
  fs.readdirSync(commandDir, { withFileTypes: true }).forEach(entry => {
    // console.log(entry.name);

    subCommandNames.push(path.basename(entry.name, ".js"));
    // console.log(path.basename(entry.name, ".js"));
  });

  const [nodeExecutablePath, , subCommandName, ...argv] = process.argv;
  // console.log({ nodeExecutablePath, subCommandName, argv });

  const subCommandFilename = path.resolve(commandDir, subCommandName);
  // console.log("subCommandFilename", subCommandFilename);
  try {
    process.argv = [nodeExecutablePath, subCommandName, ...argv];
    await require(subCommandFilename);
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      console.log(`  Usage:
    ken [command]

  Commands:
    help
    ${subCommandNames.join("\n    ")}
`);
    } else {
      console.error(error);
      process.exit(1);
    }
  }
  // console.log(process.argv);
}

main()
  .then(() => {
    // console.log("✅ DONE");
  })
  .catch(err => {
    console.error(err);
  });
