export async function main(ns: NS) {
  ns.exec("save_ports.ts", "home", 1);
  await ns.sleep(10);
  ns.singularity.softReset("prestigev3.ts");

}