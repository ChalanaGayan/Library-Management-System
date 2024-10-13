#!/bin/bash

# Function to check if a command is available
check_command() {
    command -v "$1" >/dev/null 2>&1 || { echo >&2 "$1 is required but it's not installed. Aborting."; exit 1; }
}

# Check for prerequisites
check_command dotnet
check_command npm

# Start Backend
echo "Starting Backend..."
(cd Backend/LibraryManagementBackend && dotnet restore && dotnet run) &

# Start Frontend
echo "Starting Frontend..."
(cd Frontend/library-management-system-frontend && npm install && npm run dev)
