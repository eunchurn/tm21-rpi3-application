# Raspberry Pi Application for TM21 Vibration Controller Monitoring

## Work Flow and Road Map

- [x] NI DAQ comm. and parser
- [x] NI DAQ comm with Multicast
- [x] DAQ data MQTT sender
- [x] PLC comm. and parser
- [x] PLC data MQTT sender
- [x] Anemometer comm. and parser
- [x] Anemometer data MQTT sender
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

## Environment variables

`.env` file creation

```env
PLC_HOST=192.168.0.200
PLC_PORT=507
PLC_SEND_PACKET1=FB808000FF7A000011000000000000000001060002B81300FA00
PLC_SEND_PACKET2=FB808000FF7A000011000000000000000001060002B21400FA00
PLC_SEND_PACKET3=FB808000FF7A000011000000000000000001060002800C00AA00

DAQ_UDP_MULTI_HOST=234.5.6.7
DAQ_UDP_PORT=58432

ANEMOMETER_HOST=192.168.0.222
ANEMOMETER_PORT=7001

MQTT_HOST=mqtt://220.149.227.106
MQTT_DAQ_TOPIC=/v1/daq
MQTT_PLC_TOPIC=/v1/plc
MQTT_ANEMO_TOPIC=/v1/anemo
MQTT_QOS=2
```

## 자동화 스크립트

- [x] 자동화 설치 스크립트: [`install.sh`](scripts/install.sh)
- [x] 시스템 서비스: [`dku.sh`](scripts/dku.sh)
- [ ] OTA 시스템 서비스: [`ota.sh`](scripts/ota.sh)
