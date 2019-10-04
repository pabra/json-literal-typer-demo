#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
SYNC_SRC=${DIR}/../build/
SYNC_DST=/var/www/json-typer/
SYNC_HOST=json-literal-typer.peppnet.de

rsync \
    -avP \
    --delete \
    "${SYNC_SRC}" \
    "${SYNC_HOST}:${SYNC_DST}"
