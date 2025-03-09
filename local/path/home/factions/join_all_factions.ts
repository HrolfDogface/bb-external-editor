export async function main(ns: NS) {

    const invitations: string [] = ns.singularity.checkFactionInvitations();

    for (let i = 0; i < invitations.length; i++){
        ns.singularity.joinFaction(invitations[i]);
    }

}