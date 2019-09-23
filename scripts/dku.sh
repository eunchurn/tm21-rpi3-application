#!/bin/sh
### BEGIN INIT INFO
# Provides:          Eunchurn Park
# Required-Start:    $local_fs $network $named $time $syslog
# Required-Stop:     $local_fs $network $named $time $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: DKU Vibration controller Data Gateway Application
# Description:       Data send to MQTT Broker of DKU Monitoring Application
### END INIT INFO

NAME=gateway-application
NODE_ENV=production

node=node
npm=npm

build() {
    echo "Build $NAME babel client: "
    (cd /root/app/ && yarn build)
}

start() {
    echo "Starting $NAME node instance: "
    # Launch the application
    (cd /root/app/ && yarn forever:start)
}

restart() {
    echo -n "Restarting $NAME node instance : "
    (cd /root/app/ && yarn restart)
}

stop() {
    echo -n "Shutting down $NAME node instance : "
    (cd /root/app/ && yarn forever:stop)
}

log() {
    echo -n "Logging App: $NAME"
    (cd /root/app && yarn log)
}

case "$1" in
    start)
        start
    ;;
    stop)
        stop
    ;;
    status)
        (cd /root/app && npm run forever:list)
    ;;
    restart)
        restart
    ;;
    build)
        build
    ;;
    log)
        log
    ;;
    *)
        echo "Usage:  {start|stop|status|restart|build:log:logbin}"
        exit 1
    ;;
esac
exit 0