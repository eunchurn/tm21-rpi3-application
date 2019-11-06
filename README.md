# Raspberry Pi Application for TM21 Vibration Controller Monitoring

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

## Getting started

Run `npm start` or `yarn start`

### Forever start

Run `npm run forever:start` or `yarn forever:start`

### System service

- `# /etc/init.d/dku start`: 재부팅 후에도 이 서비스는 자동으로 실행 됨
- `# /etc/init.d/dku log`: 로그 내용보기
- `# /etc/init.d/dku restart`: 서비스 재시작
- `# /etc/init.d/dku stop`: 서비스 중지

## 자동화 스크립트

- [x] 자동화 설치 스크립트: [`install.sh`](scripts/install.sh)
- [x] 시스템 서비스: [`dku.sh`](scripts/dku.sh)
- [ ] OTA 시스템 서비스: [`ota.sh`](scripts/ota.sh)
