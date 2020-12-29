#!/bin/bash
back="npm start --prefix ./backend-api"
front="npm run dev --prefix ./frontend-webpage"
$back&$front
