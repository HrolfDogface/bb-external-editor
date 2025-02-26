/** @param {NS} ns */
export async function main(ns) {
  let foo = ["baz", "bar", "bingo"];
  //ns.tail();
  ns.exec("argsTest.js", "home", 1, ...foo);

}
