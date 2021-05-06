@ECHO OFF

:: %HOMEDRIVE% = C:
:: %HOMEPATH% = \Users\mcoronado
:: %system32% ??
:: No spaces in paths
:: Program Files > ProgramFiles
:: cls = clear screen
:: CMD reads the system environment variables when it starts. To re-read those variables you need to restart CMD
:: Use console 2 http://sourceforge.net/projects/console/

setlocal 
  set /p FACEBOOK_CLIENT_ID="Ingrese Facebook ID"
endlocal 
echo ENVVAR

::set /p export FACEBOOK_CLIENT_ID="Ingrese Facebook ID"
set /p export FACEBOOK_CLIENT_SECRET="Ingrese Facebook Secret"

echo FACEBOOK_CLIENT_ID

PAUSE