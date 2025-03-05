import { portHack } from "./pop"

export async function main(ns: NS) {
  if(portHack(ns, "CSEC")){
    ns.exec("pop.ts", "home", 1, "CSEC");
  }
  if(portHack(ns, "avmnite-02h")){
    ns.exec("pop.ts", "home", 1, "avmnite-02h");
  }
  if(portHack(ns, "I.I.I.I")){
    ns.exec("pop.ts", "home", 1, "I.I.I.I");
  }
  if(portHack(ns, "run4theh111z")){
    ns.exec("pop.ts", "home", 1, "run4theh111z");
  }
}