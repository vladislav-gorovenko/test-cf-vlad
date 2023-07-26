import { useState } from "react";
import { useObserver } from "mobx-react-lite";
import TickerStore from "../../store/TickerStore/TickerStore";
import { TickerData } from "../../store/TickerStore/TickerStore";
import { useParams } from "react-router-dom";
import Portal from "../Portal";
import { useEffect } from "react";

export default function Table() {
  const { tab } = useParams();
  const [updateAnimation, setUpdateAnimation] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [currentTicker, setCurrentTicker] = useState<TickerData | null>(null);

  const handleOpen = (ticker: TickerData) => {
    setShowModal(true);
    setCurrentTicker(ticker);
    TickerStore.stopUpdates();
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentTicker(null);
    TickerStore.startUpdates();
  };

  useEffect(() => {
    TickerStore.startUpdates();
    return () => {
      TickerStore.stopUpdates();
    };
  }, []);

  useEffect(() => {
    setUpdateAnimation(true);
    const timer = setTimeout(() => setUpdateAnimation(false), 100);
    return () => clearTimeout(timer);
  }, [TickerStore.tickerData]);

  // Sorting data by tabs
  const data = TickerStore.tickerData;
  const tickers =
    tab === "tab-a"
      ? data.slice(0, Math.ceil(data.length) / 2)
      : data.slice(Math.ceil(data.length) / 2);

  return useObserver(() => {
    if (TickerStore.isLoading) {
      return <h1>Is loading...</h1>;
    }

    if (TickerStore.error) {
      console.error("Ошибка"); // выводим детали ошибки в консоль
      return <h1>Ошибка</h1>; // показываем сообщение об ошибке
    }
    return (
      <div className="overflow-x-auto border bg-pink-50">
        <table className="min-w-full divide-y divide-gray-200 m-2">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                Название тикера
              </th>
              <th className="px-3 py-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Последнее значение
              </th>
              <th className="px-3 py-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Наивысшая ставка
              </th>
              <th className="px-3 py-2 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Изменение в процентах
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickers.map((data: TickerData) => (
              <tr key={data.tickerName}>
                <td
                  onClick={() => {
                    handleOpen(data);
                  }}
                  className="px-3 py-2 whitespace-no-wrap hover:font-bold transition-all cursor-pointer"
                >
                  {data.tickerName}
                </td>
                <td
                  className={`px-3 py-2 whitespace-no-wrap transition-all ${
                    updateAnimation ? "scale-[0.98] " : ""
                  }`}
                >
                  {data.last}
                </td>
                <td
                  className={`px-3 py-2 whitespace-no-wrap transition-all ${
                    updateAnimation ? "scale-[0.98]" : ""
                  }`}
                >
                  {data.highestBid}
                </td>
                <td
                  className={`px-3 py-2 whitespace-no-wrap transition-all ${
                    updateAnimation ? "scale-[0.98]" : ""
                  }`}
                >
                  {data.percentChange}
                </td>
              </tr>
            ))}
          </tbody>
          {showModal && (
            <Portal>
              <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#ffffffb3]  ">
                <div className="absolute top-[50%] p-4 left-[50%] translate-x-[-50%]  rounded translate-y-[-50%] shadow-md w-[300px] aspect-square bg-white flex flex-col justify-center items-left gap-2">
                  <div>
                    <h1 className="font-bold">Название тикера:</h1>
                    <p>{currentTicker?.tickerName}</p>
                  </div>
                  <div>
                    <h1 className="font-bold">Последнее значение:</h1>
                    <p>{currentTicker?.last}</p>
                  </div>
                  <div>
                    <h1 className="font-bold">Наивысшая ставка:</h1>
                    <p>{currentTicker?.highestBid}</p>
                  </div>
                  <div>
                    <h1 className="font-bold">Изменение в процентах:</h1>
                    <p>{currentTicker?.percentChange}</p>
                  </div>
                  <button
                    className="bg-slate-100 mt-4 py-2 px-4 hover:bg-slate-200 rounded"
                    onClick={handleClose}
                  >
                    Закрыть окно
                  </button>
                </div>
              </div>
            </Portal>
          )}
        </table>
      </div>
    );
  });
}
