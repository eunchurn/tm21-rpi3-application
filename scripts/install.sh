#!/bin/bash
echo "Installing DKU monitoring application to system services"
curl --insecure -o- \
https://raw.githubusercontent.com/eunchurn/tm21-rpi3-application/master/scripts/dku.service \
> /etc/systemd/system/dku.service
systemctl enable dku
echo "🦄 Done!"
echo "✅[start] systemctl start dku"
echo "❎[stop] systemctl stop dku"
echo "🔧[restart] systemctl restart dku"
echo "💡[status] systemctl status dku"
echo "🔍[log] journalctl -u dku"
echo "🗓[log following] journalctl -u dku -f"