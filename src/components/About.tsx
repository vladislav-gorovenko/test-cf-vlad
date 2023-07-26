import TickerStore from "../store/TickerStore/TickerStore";

export default function About() {
  TickerStore.stopUpdates();
  return (
    <div className="py-4 px-2 mx-auto max-w-4xl">
      <h1>Test task by Vlad</h1>
    </div>
  );
}
