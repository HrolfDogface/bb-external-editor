import { pop } from "./pop"

export async function main(ns: NS) {

    //ns.exec("pop.ts", "home", 1, "iron-gym");
    //await ns.sleep(2000);
    //ns.singularity.connect("iron-gym");
    //ns.singularity.installBackdoor();

    
    //ns.toast("Not enough money to purchase Tor router", "warning", null);

    while (!pop(ns, "The-Cave")){
        await ns.sleep(2000);
    }

    //test(ns, "FOO!!!!");

}