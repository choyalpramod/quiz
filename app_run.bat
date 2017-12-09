echo off
set releaseMode=%1

call del "www\app.setup.js"
if %releaseMode%==debug (
  echo Serving Debug..
  http-server www_debug_local -p 8100
)
if %releaseMode%==release (
  echo Serving Debug..
  call copy "app\app.setup.release.js" "app\app.setup.js"
  http-server app -p 80
)
