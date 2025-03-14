export async function main(ns: NS) {
  ns.disableLog("ALL");
  ns.clearLog();
  ns.ui.openTail();

  ns.printRaw(<MyComponent />);
}

function MyComponent() {
  return (
    <div>Hello World!</div>
  );
}
/*
// timer.tsx
function Timer() {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>Seconds: {seconds}</div>;
}

export async function main(ns: NS) {
  ns.tail();
  ns.printRaw(<Timer />);
  await ns.asleep(10000);
}*/