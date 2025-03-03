export async function main(ns: NS) {

    ns.exec("pop.js", "home", 1, "iron-gym");
    await ns.sleep(2000);
    ns.singularity.connect("iron-gym");
    ns.singularity.installBackdoor();
}