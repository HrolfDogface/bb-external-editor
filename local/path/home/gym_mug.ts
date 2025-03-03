export async function main(ns: NS) {

    //const crimeVar: CrimeType = ns.enums.CrimeType[crime];

    while(ns.singularity.getCrimeChance("Mug") < 1)
    {        
        ns.print("Chance to mug: " + ns.singularity.getCrimeChance("Mug") );
        ns.singularity.gymWorkout(ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.agility);
        await ns.sleep(60000);     
        ns.singularity.gymWorkout(ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.defense);
        await ns.sleep(60000);     
        ns.singularity.gymWorkout(ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.dexterity);
        await ns.sleep(60000);     
        ns.singularity.gymWorkout(ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.strength);
        await ns.sleep(60000);
    }

    ns.singularity.commitCrime("Mug")

}