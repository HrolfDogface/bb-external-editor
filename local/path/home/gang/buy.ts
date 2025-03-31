export async function main(ns: NS) {

    const banger: string = String(ns.args[0]);

    const equipment: string[] = ns.gang.getEquipmentNames();

    const eqTypes: string[] = ["Weapon", "Armor", "Vehicle"];

    
    if (ns.getServerMoneyAvailable("home") > 100000000000) eqTypes.push("Augmentation");

    for (const item of equipment){
        const equipmentType: string = ns.gang.getEquipmentType(item);
        if(eqTypes.includes(equipmentType)){
            ns.gang.purchaseEquipment(banger, item);
        }

    }

}