#!/bin/bash
scriptfile=/root/app/scripts/dku.service
echo "Installing DKU monitoring application to system services target: $scriptfile"
cp /root/app/scripts/dku.service /etc/systemd/system/dku.service
systemctl enable dku
echo "🦄 Done!"
echo "✅[start] systemctl start dku"
echo "❎[stop] systemctl stop dku"
echo "🔧[restart] systemctl restart dku"
echo "💡[status] systemctl status dku"
echo "🔍[log] journalctl -u dku"
echo "🗓[log following] journalctl -u dku -f"