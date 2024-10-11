# Requires -RunAsAdministrator

$processesToKill = @("yamy64", "yamyd32")
foreach ($process in $processesToKill) {
    Get-Process $process -ErrorAction SilentlyContinue | Stop-Process -Force
}

Start-Process "C:\Users\ryosu\yamy\yamy.exe" -Verb RunAs
