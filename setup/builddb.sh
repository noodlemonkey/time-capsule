#!/bin/bash
dropdb timecapsule
createdb timecapsule
echo set up complete
psql -d timecapsule -f ./setup/tc_create_tables.sql
