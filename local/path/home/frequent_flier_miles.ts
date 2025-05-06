export async function main(ns: NS) {

    while(true){
        
        ns.singularity.travelToCity(ns.enums.CityName.Aevum);
        await ns.sleep(10);
        ns.singularity.travelToCity(ns.enums.CityName.Chongqing);
        await ns.sleep(10);
        ns.singularity.travelToCity(ns.enums.CityName.Ishima);
        await ns.sleep(10);
        ns.singularity.travelToCity(ns.enums.CityName.NewTokyo);
        await ns.sleep(10);
        ns.singularity.travelToCity(ns.enums.CityName.Volhaven);
        await ns.sleep(10);
        ns.singularity.travelToCity(ns.enums.CityName.Sector12);
        await ns.sleep(10);
    }

}