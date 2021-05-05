@ECHO OFF

:: %HOMEDRIVE% = C:
:: %HOMEPATH% = \Users\Ruben
:: %system32% ??
:: No spaces in paths
:: Program Files > ProgramFiles
:: cls = clear screen
:: CMD reads the system environment variables when it starts. To re-read those variables you need to restart CMD
:: Use console 2 http://sourceforge.net/projects/console/


:: Assign all Path variables
SET FACEBOOK_CLIENT_ID="%HOMEDRIVE%\wamp\bin\php\php5.4.16"
SET FACEBOOK_CLIENT_SECRET=";%HOMEDRIVE%\Windows\System32"


:: Set Path variable
setx PATH "%PHP%%SYSTEM32%%NODEJS%%COMPOSER%%YII%%GIT%" /m

:: Set Java variable
setx JAVA_HOME "%HOMEDRIVE%\ProgramFiles\Java\jdk1.7.0_21" /m

PAUSE