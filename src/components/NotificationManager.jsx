import { useEffect } from "react";
import { toast } from "react-toastify";
import socket from "../socket";
import bloqueador from "../assets/bloqueador-loreal.jpg";

export default function NotificationManager() {

  useEffect(() => {

    const userId = localStorage.getItem("user_id");

    if (!userId) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket conectado:", socket.id);
      socket.emit("join_user_room", userId);
    });

    socket.on("uv_alert", (data) => {

      if (document.visibilityState === "visible") {

        toast.warning(
          <div style={{ textAlign: "center" }}>

            <strong>⚠ Radiación UV {data.nivel_riesgo.toUpperCase()}</strong>

            <p>UV: {data.valor_uv}</p>

            <p>Usa bloqueador solar</p>

            <img
              src={bloqueador}
              alt="Bloqueador"
              style={{ width: "70px", margin: "8px auto" }}
            />

            <br/>

            <a
              href="https://www.lorealparis.com.co/uv-defender/fluido-invisible-anti-fotoenvejecimiento-fps-50"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#ff9800",
                color: "white",
                padding: "6px 10px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "13px"
              }}
            >
              Comprar
            </a>

          </div>,
          {
            position: "top-right",
            autoClose: 8000
          }
        );

      } else {

        if (Notification.permission === "granted") {

          const notification = new Notification("Radiación UV Alta", {
            body: `UV ${data.valor_uv} - Usa bloqueador solar`,
            icon: bloqueador
          });

          notification.onclick = () => {
            window.focus();
          };

        }

      }

    });

    return () => {
      socket.off("connect");
      socket.off("uv_alert");
    };

  }, []);

  return null;
}