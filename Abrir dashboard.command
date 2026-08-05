#!/bin/bash
# Doble clic en este archivo para abrir el dashboard.
# Levanta un servidor local en tu computadora (nada sale a internet)
# y abre el dashboard en el navegador.
# Mientras esta ventana esté abierta, el dashboard funciona.

cd "$(dirname "$0")" || exit 1

PUERTO=5190

# Si el puerto ya está ocupado, probamos con los siguientes.
while lsof -i :$PUERTO >/dev/null 2>&1; do
  PUERTO=$((PUERTO + 1))
  if [ $PUERTO -gt 5210 ]; then
    echo "No se encontró un puerto libre. Cerrá otras ventanas del dashboard y probá de nuevo."
    read -r -p "Enter para cerrar..."
    exit 1
  fi
done

echo ""
echo "  Dashboard Redalco"
echo "  ─────────────────────────────────────────────"
echo "  Abriendo en:  http://localhost:$PUERTO"
echo ""
echo "  NO CIERRES ESTA VENTANA mientras uses el dashboard."
echo "  Para terminar: cerrá esta ventana o apretá Ctrl+C."
echo ""

sleep 1 && open "http://localhost:$PUERTO" &

python3 -m http.server $PUERTO --bind 127.0.0.1
