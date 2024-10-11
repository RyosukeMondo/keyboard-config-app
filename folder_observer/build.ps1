# build.ps1

# Exit immediately if a command exits with a non-zero status
$ErrorActionPreference = "Stop"

# Define variables relative to the script location
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$tmpDir = Join-Path $scriptDir "tmp"
$releaseDir = Join-Path $scriptDir "release"

$exeName = "folder_observer.exe"
$sourceExePath = Join-Path $tmpDir $exeName
$mainGoFile = Join-Path $scriptDir "main.go"
$configFile = Join-Path $scriptDir "config.yaml"
$psScript = Join-Path $scriptDir "manage_process.ps1"

# Ensure tmp directory exists
if (-Not (Test-Path -Path $tmpDir)) {
    Write-Host "Creating temporary directory: $tmpDir"
    New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null
}

# Build the Go executable
Write-Host "Building Go executable..."
go build -o "$sourceExePath" "$mainGoFile"

Write-Host "Build successful: $sourceExePath"

# Ensure release directory exists
if (-Not (Test-Path -Path $releaseDir)) {
    Write-Host "Creating release directory: $releaseDir"
    New-Item -ItemType Directory -Path $releaseDir -Force | Out-Null
}

# Copy files to release directory
Write-Host "Copying files to release directory..."
Copy-Item -Path "$sourceExePath" -Destination "$releaseDir" -Force
Copy-Item -Path "$psScript" -Destination "$releaseDir" -Force
Copy-Item -Path "$configFile" -Destination "$releaseDir" -Force

Write-Host "Files copied to $releaseDir"

Write-Host "Build and deployment completed successfully."
