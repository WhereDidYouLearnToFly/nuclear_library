@echo off
rem Runs the ISOTOPEDIA site locally and opens it in the browser.
rem Close this window (or press Ctrl+C) to stop the server.

cd /d "%~dp0"
set PORT=8080

echo.
echo  ISOTOPEDIA is running at http://localhost:%PORT%/en/index.html
echo  Close this window to stop it.
echo.

rem Open the browser a second after the server starts
start "" /b cmd /c "timeout /t 1 /nobreak >nul & start http://localhost:%PORT%/en/index.html"

python -m http.server %PORT% --directory site
if errorlevel 1 (
    echo.
    echo  The server could not start. Check that Python is installed and that
    echo  port %PORT% is not already in use, e.g. by another copy of this window.
    pause
)
