# Raspberry Pi Application for TM21 Vibration Controller Monitoring

![Unit Test](https://github.com/eunchurn/tm21-rpi3-application/workflows/Unit%20Test/badge.svg?branch=master) [![codecov](https://codecov.io/gh/eunchurn/tm21-rpi3-application/branch/master/graph/badge.svg?token=xatvEuw8vg)](https://codecov.io/gh/eunchurn/tm21-rpi3-application)

## Work Flow and Road Map

- [x] NI DAQ comm. and parser
- [x] NI DAQ comm with Multicast
- [x] DAQ data MQTT sender
- [x] PLC comm. and parser
- [x] PLC data MQTT sender
- [x] Anemometer comm. and parser
- [x] Anemometer data MQTT sender
- [x] CBOR object packet compression
- [x] Flowtype typecheck configuration
- [x] Deployment and registration on system service

## Installation

### Install `systemd`

```bash
curl --insecure -o- -L \
https://raw.githubusercontent.com/eunchurn/tm21-rpi3-application/master/scripts/install.sh | bash
```

### System service

- ✅**start**: `systemctl start dku`
- ❎**stop**: `systemctl stop dku`
- 🔧**restart**: `systemctl restart dku`
- 💡**status**: `systemctl status dku`
- 🔍**log view**: `journalctl -u dku`
- 🗓**log following**: `journalctl -u dku -f`
