import { makeAutoObservable } from "mobx";

export interface TickerValue {
  last: string;
  highestBid: string;
  percentChange: string;
}

export interface TickerData extends TickerValue {
  tickerName: string;
}

class TickerStore {
  tickerData: TickerData[] = [];
  shouldUpdate = false; // New state that controls whether data should be updated
  intervalID: number | null = null;
  isLoading: boolean = true;
  error: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.fetchData();

    // Update the data every 5 seconds
    this.intervalID = window.setInterval(() => {
      if (this.shouldUpdate) {
        this.fetchData();
      }
    }, 5000);
  }

  fetchData = async () => {
    try {
      const response = await fetch("/api");
      const data: Record<string, TickerValue> = await response.json();
      this.tickerData = Object.entries(data).map(([key, value]) => ({
        tickerName: key,
        last: value.last,
        highestBid: value.highestBid,
        percentChange: value.percentChange,
      }));
      this.isLoading = true;
      this.error = false;
    } catch (err) {
      this.error = true;
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  };

  // Two new methods to enable and disable updates
  stopUpdates = () => {
    this.shouldUpdate = false;
  };

  startUpdates = () => {
    this.shouldUpdate = true;
  };

  // Clear the interval when the store instance is removed
  dispose = () => {
    if (this.intervalID !== null) {
      window.clearInterval(this.intervalID);
    }
  };
}

export default new TickerStore();
