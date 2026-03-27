import { useEffect } from "react";
import { toast } from "react-toastify";
import socket from "../socket";
import bloqueador from "../assets/bloqueador-loreal.jpeg";
import "../styles/notificationManager.css";

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
      console.log("[SOCKET] uv_alert recibido:", data);

      if (document.visibilityState === "visible") {

        toast.warning(
          <div className="uv-toast-content">

            <strong>⚠ Radiación UV {data.nivel_riesgo.toUpperCase()}</strong>

            <p>UV: {data.valor_uv}</p>

            <p>Usa bloqueador solar</p>

            <img
              src={bloqueador}
              alt="Bloqueador"
              className="uv-toast-image"
            />

            <br/>

            <a
              href="https://www.lorealparis.com.co/uv-defender/fluido-invisible-anti-fotoenvejecimiento-fps-50"
              target="_blank"
              rel="noopener noreferrer"
              className="uv-toast-buy-link"
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

    // Listener para recordatorio de cita médica
    socket.on("appointment_reminder", (data) => {
      if (document.visibilityState === "visible") {
        toast.info(
          <div className="appointment-toast-content">
            <strong>📅 Recordatorio de cita médica</strong>
            <p>{data.mensaje}</p>
            <p><b>Fecha:</b> {data.fecha}</p>
            <p><b>Médico:</b> {data.medico}</p>
            <p><b>Lugar:</b> {data.lugar}</p>
            {data.tipo && <p><b>Tipo:</b> {data.tipo}</p>}
          </div>,
          {
            position: "top-right",
            autoClose: 10000
          }
        );
      } else {
        if (Notification.permission === "granted") {
          const notification = new Notification("Recordatorio de cita médica", {
            body: data.mensaje,
            icon: undefined // Puedes poner un ícono personalizado si lo deseas
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
      socket.off("appointment_reminder");
    };

  }, []);

  return null;
}