# Raspberry Pi Application for TM21 Vibration Controller Monitoring

[![Greenkeeper badge](https://badges.greenkeeper.io/eunchurn/tm21-rpi3-application.svg)](https://greenkeeper.io/)

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

Run `npm i` or `yarn`

### Install `systemd`

Run `./scripts/install.sh`

## Getting started

Run `npm start` or `yarn start`

### System service

- ✅**start**: `systemctl start dku`
- ❎**stop**: `systemctl stop dku`
- 🔧**restart**: `systemctl restart dku`
- 💡**status**: `systemctl status dku`
- 🔍**log view**: `journalctl -u dku`
- 🗓**log following**: `journalctl -u dku -f`

## 자동화 스크립트

- [x] 자동화 설치 스크립트: [`install.sh`](scripts/install.sh)
- [x] 시스템 서비스: [`dku.sh`](scripts/dku.sh)
- [ ] OTA 시스템 서비스: [`ota.sh`](scripts/ota.sh)
