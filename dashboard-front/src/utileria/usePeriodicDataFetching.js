import { useEffect, useState } from "react";

export default function usePeriodicDataFetching(url, interval) {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
        const resp = await fetch(url);
        const newData = await resp.json();
        setData(newData);
    } catch (error) {
        console.log("Error en la petición de datos", error);
    }
  };

  useEffect(() => {
    fetchData();

    const fetchDataInterval = setInterval(() => {
       fetchData(); 
    }, interval);

    return () => {
        clearInterval(fetchDataInterval)
    };
  }, [url, interval]);

  return data;
}
