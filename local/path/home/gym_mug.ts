export async function main(ns: NS) {

    //const crimeVar: CrimeType = ns.enums.CrimeType[crime];

    while(ns.singularity.getCrimeChance("Mug") < 1)
    //while (true)
    {        
        ns.print("Chance to mug: " + ns.singularity.getCrimeChance("Mug") );
        ns.singularity.gymWorkout(ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.agility);
        await ns.sleep(300000);     
        ns.singularity.gymWorkout(ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.defense);
        await ns.sleep(300000);     
        ns.singularity.gymWorkout(ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.dexterity);
        await ns.sleep(300000);     
        ns.singularity.gymWorkout(ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.strength);
        await ns.sleep(300000);
    }

    
    //ns.exec("commit_crime.ts", "home", 1, "Mug");

    ns.singularity.commitCrime("Mug")

}