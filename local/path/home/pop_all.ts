import { portHack } from "./pop"

export async function main(ns: NS) {
  if(portHack(ns, "CSEC")){
    ns.exec("pop.ts", "home", 1, "CSEC");
    ns.exec("buttStuff.ts", "home", 1, "CSEC");
  }
  await ns.sleep(1000);
  if(portHack(ns, "avmnite-02h")){
    ns.exec("pop.ts", "home", 1, "avmnite-02h");
    ns.exec("buttStuff.ts", "home", 1, "avmnite-02h");
  }
  await ns.sleep(1000);
  if(portHack(ns, "I.I.I.I")){
    ns.exec("pop.ts", "home", 1, "I.I.I.I");
    ns.exec("buttStuff.ts", "home", 1, "I.I.I.I");
  }
  await ns.sleep(1000);
  if(portHack(ns, "run4theh111z")){
    ns.exec("pop.ts", "home", 1, "run4theh111z");
    ns.exec("buttStuff.ts", "home", 1, "run4theh111z");
  }
}