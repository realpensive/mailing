import { copySync, existsSync } from "fs-extra";
import { relative, resolve } from "path";
import prompts from "prompts";
import tree from "tree-node-cli";
import { getExistingEmailsDir } from "./paths";
import { log } from "./log";

function getPotentialEmailsDirPath() {
  if (existsSync("./src")) {
    return resolve("./src/emails");
  } else {
    return resolve("./emails");
  }
}

export async function generateEmailsDirectory({
  isTypescript,
}: {
  isTypescript: boolean;
}): Promise<boolean> {
  const existingEmailsPath = getExistingEmailsDir();
  if (existingEmailsPath) {
    // if it does abort
    log(`Emails directory found at ${existingEmailsPath}`);
    return false;
  }

  const emailsPath = getPotentialEmailsDirPath();
  const response = await prompts({
    type: "text",
    name: "path",
    message: "Where should we put your emails?",
    initial: "./" + relative(process.cwd(), emailsPath) + "/",
  });
  if (response.path) {
    // copy the emails dir template in!
    const path = `generator_templates/${isTypescript ? "ts" : "js"}/emails`;
    await copySync(resolve(__dirname, path), response.path, {
      overwrite: false,
    });
    log(
      `Generated your emails dir at ${response.path}:\n${tree(response.path)}`
    );

    return true;
  } else {
    log("OK, bye!");
    return false;
  }
}
