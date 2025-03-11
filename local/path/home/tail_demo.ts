export async function main(ns: NS) {ns.disableLog("ALL");
  ns.clearLog();
  ns.ui.openTail();

  ns.printRaw(<MyComponent />);
}

function MyComponent() {
  return (
    <div>Hello World!</div>
  );
}