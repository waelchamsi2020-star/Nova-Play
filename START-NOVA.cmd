@echo off
cd /d "%~dp0"
set "NOVA_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if exist "%NOVA_NODE%" (
  "%NOVA_NODE%" launch.mjs
) else (
  node launch.mjs
)
if errorlevel 1 pause
