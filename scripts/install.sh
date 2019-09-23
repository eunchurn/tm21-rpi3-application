#!/bin/bash
scriptfile=/root/app/scripts/dku.sh
echo "Installing DKU monitoring application to system services target: $scriptfile"
chmod +x $scriptfile
cp $scriptfile /etc/init.d/dku
update-rc.d dku defaults
echo "Done"
echo "[Start service] : /etc/init.d/dku start"
echo "[Stop service] : /etc/init.d/dku stop"
echo "[Restart service] : /etc/init.d/dku restart"
echo "[Status] : /etc/init.d/dku status"
echo "[Build service] : /etc/init.d/dku build"
echo "[Logging App] : /etc/init.d/dku log"
