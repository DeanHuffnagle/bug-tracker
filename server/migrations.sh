#!/bin/bash

echo What would you like to name this migration?
read MIGRATION_NAME

npx typeorm migration:create -n $MIGRATION_NAME