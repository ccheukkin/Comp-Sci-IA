#!/bin/bash
back="npm start --prefix ./backend-api"
front="npm start --prefix ./frontend-webpage"
$back&$front
