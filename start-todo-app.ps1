$ErrorActionPreference = "Stop"

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$appDir = Join-Path $rootDir "todo-app-v2"
$url = "http://127.0.0.1:5173/"

Set-Location $appDir

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Write-Host "npm was not found."
  Write-Host "Please install Node.js, then run start-todo-app.cmd again."
  Read-Host "Press Enter to close"
  exit 1
}

if (-not (Test-Path (Join-Path $appDir "node_modules"))) {
  Write-Host "Installing dependencies..."
  npm install
  if ($LASTEXITCODE -ne 0) {
    Write-Host "npm install failed."
    Read-Host "Press Enter to close"
    exit 1
  }
}

$listener = Get-NetTCPConnection -LocalAddress 127.0.0.1 -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue |
  Select-Object -First 1

if ($listener) {
  $process = Get-CimInstance Win32_Process -Filter "ProcessId = $($listener.OwningProcess)"
  $commandLine = [string]$process.CommandLine

  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
    if ($response.StatusCode -eq 200 -and $commandLine.Contains($appDir)) {
      Write-Host "todo-app-v2 is already running."
      Start-Process $url
      exit 0
    }
  } catch {
    # The port is occupied, but it is not serving the app correctly.
  }

  if ($commandLine -match "vite") {
    Write-Host "Stopping stale Vite server on port 5173..."
    Stop-Process -Id $listener.OwningProcess -Force
    Start-Sleep -Seconds 1
  } else {
    Write-Host "Port 5173 is used by another app."
    Write-Host "Close that app or change the port before starting todo-app-v2."
    Read-Host "Press Enter to close"
    exit 1
  }
}

Write-Host "Starting todo-app-v2..."
Start-Process -FilePath "cmd.exe" -ArgumentList "/k", "cd /d `"$appDir`" && npm run dev -- --host 127.0.0.1 --port 5173 --strictPort"

Start-Sleep -Seconds 3
Start-Process $url
