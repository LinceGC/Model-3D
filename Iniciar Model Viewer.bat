@echo off
title Model Viewer - Iniciando...
cd /d "C:\Model 3D\model-viewer-main"

echo ================================
echo      MODEL VIEWER LAUNCHER
echo ================================
echo.

:: Verificar si node_modules existe
if not exist "node_modules" (
    echo [INFO] Primera ejecucion detectada. Instalando dependencias...
    echo Esto puede tardar unos minutos.
    echo.
    npm install
    if errorlevel 1 (
        echo.
        echo [ERROR] Fallo al instalar dependencias.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencias instaladas correctamente.
    echo.
)

echo [INFO] Iniciando servidor de desarrollo...
echo [INFO] Abriendo navegador en https://localhost:20310/
echo.
echo Para detener el servidor, cierra esta ventana o presiona Ctrl+C
echo.

:: Abrir el navegador despues de 3 segundos
start "" timeout /t 3 /nobreak >nul && start https://localhost:20310/

npm start
