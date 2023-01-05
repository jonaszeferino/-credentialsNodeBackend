import { useState } from "react";
import styles from "../styles/Home.module.css";
import { ErrorPage } from "./error-page";
import { format } from "date-fns";
import { useSWR } from "swr";

export default function reservations() {
  let [reservationStock, setReservationStock] = useState([]);
  let [isError, setError] = useState(false);

  const apiCall = (event) => {
    const url = useSWR(
      `https://leposticheoms.layer.core-hlg.dcg.com.br/v1/Inventory/API.svc/web/SearchInventorySKU`,
      fetcher
    );

    fetch(url, {
      headers: new Headers({
        BasicAuthorization: process.env.NEXT_PUBLIC_LE_AUTH,
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        Page: {
          PageIndex: 0,
          PageSize: 100,
        },
        Where: "ProductID == 28814 && WarehouseId == 2",
      }),
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Dados Incorretos");
        }
      })
      .then((result) => setReservationStock(result))
      .catch((error) => setError(true));
  };

  return (
    <div>
      <h3 className={styles.title}>Minhas Reservas</h3>
      <h2 className={styles.grid}>
        {" "}
        <br />
        <button className={styles.card} onClick={apiCall}>
          Verificar
        </button>
      </h2>

      {/* If ternário abaixo, dentro do HTML única forma de fazer */}

      {isError === true ? (
        <ErrorPage message={`Verifique as Credenciais`}></ErrorPage>
      ) : (
        <div className={styles.grid}>
          {reservationStock.map((reserve) => (
            <div className={styles.card} key={reserve.ProductID}>
              <span>Stock: {reserve.StockBalance}</span> <br />
              {/* <span>
                Data:{" "}
                {format(new Date(reserve.LastUpdated), "dd/MM/yyyy HH:mm:ss")}
              </span> */}
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
