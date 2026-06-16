# OctoFit Tracker API Testing Script (PowerShell)
# Tests API endpoints for localhost and Codespaces environments

param(
    [string]$Environment = "auto"
)

# Determine API base URL
if ($env:CODESPACE_NAME -and $env:CODESPACE_NAME -ne "") {
    $API_BASE_URL = "https://$($env:CODESPACE_NAME)-8000.app.github.dev"
    Write-Host "📍 Codespaces Environment Detected" -ForegroundColor Cyan
    Write-Host "API Base URL: $API_BASE_URL" -ForegroundColor Cyan
} else {
    $API_BASE_URL = "http://localhost:8000"
    Write-Host "📍 Localhost Environment" -ForegroundColor Cyan
    Write-Host "API Base URL: $API_BASE_URL" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "Testing OctoFit Tracker API Endpoints" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "1️⃣  Testing Health Check Endpoint" -ForegroundColor Cyan
Write-Host "   GET $API_BASE_URL/health"
try {
    $response = Invoke-WebRequest -Uri "$API_BASE_URL/health" -Method GET -ContentType "application/json" -ErrorAction Stop
    if ($response.Content -match "healthy") {
        Write-Host "✅ Health check PASSED" -ForegroundColor Green
        Write-Host "   Response: $($response.Content)"
    } else {
        Write-Host "❌ Health check FAILED" -ForegroundColor Red
        Write-Host "   Response: $($response.Content)"
    }
} catch {
    Write-Host "❌ Failed to connect to API" -ForegroundColor Red
    Write-Host "   Error: $_"
    exit 1
}

Write-Host ""

# Test 2: Root Endpoint
Write-Host "2️⃣  Testing Root Endpoint" -ForegroundColor Cyan
Write-Host "   GET $API_BASE_URL/"
try {
    $response = Invoke-WebRequest -Uri "$API_BASE_URL/" -Method GET -ContentType "application/json" -ErrorAction Stop
    if ($response.Content -match "OctoFit Tracker API") {
        Write-Host "✅ Root endpoint PASSED" -ForegroundColor Green
        $content = $response.Content.Substring(0, [Math]::Min(200, $response.Content.Length))
        Write-Host "   Response: $content..."
    } else {
        Write-Host "❌ Root endpoint FAILED" -ForegroundColor Red
        Write-Host "   Response: $($response.Content)"
    }
} catch {
    Write-Host "❌ Root endpoint FAILED" -ForegroundColor Red
    Write-Host "   Error: $_"
}

Write-Host ""

# Test 3: Get All Users
Write-Host "3️⃣  Testing /api/users Endpoint" -ForegroundColor Cyan
Write-Host "   GET $API_BASE_URL/api/users"
try {
    $response = Invoke-WebRequest -Uri "$API_BASE_URL/api/users" -Method GET -ContentType "application/json" -ErrorAction Stop
    if ($response.Content -match '(\[\]|username)') {
        Write-Host "✅ Users endpoint PASSED" -ForegroundColor Green
        $content = $response.Content.Substring(0, [Math]::Min(200, $response.Content.Length))
        Write-Host "   Response: $content..."
    } else {
        Write-Host "❌ Users endpoint returned unexpected format" -ForegroundColor Red
        Write-Host "   Response: $($response.Content)"
    }
} catch {
    Write-Host "❌ Failed to fetch users" -ForegroundColor Red
    Write-Host "   Error: $_"
}

Write-Host ""

# Test 4: Get All Activities
Write-Host "4️⃣  Testing /api/activities Endpoint" -ForegroundColor Cyan
Write-Host "   GET $API_BASE_URL/api/activities"
try {
    $response = Invoke-WebRequest -Uri "$API_BASE_URL/api/activities" -Method GET -ContentType "application/json" -ErrorAction Stop
    if ($response.Content -match '(\[\]|type|duration)') {
        Write-Host "✅ Activities endpoint PASSED" -ForegroundColor Green
        $content = $response.Content.Substring(0, [Math]::Min(200, $response.Content.Length))
        Write-Host "   Response: $content..."
    } else {
        Write-Host "❌ Activities endpoint returned unexpected format" -ForegroundColor Red
        Write-Host "   Response: $($response.Content)"
    }
} catch {
    Write-Host "❌ Failed to fetch activities" -ForegroundColor Red
    Write-Host "   Error: $_"
}

Write-Host ""

# Test 5: Create a Test User
Write-Host "5️⃣  Testing POST /api/users (Create User)" -ForegroundColor Cyan
Write-Host "   POST $API_BASE_URL/api/users"
$timestamp = Get-Date -UFormat %s
$userPayload = @{
    username = "test_user_$timestamp"
    email = "test_$timestamp@octofit.local"
    firstName = "Test"
    lastName = "User"
    age = 25
    height = 180
    weight = 75
    goal = "build muscle"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$API_BASE_URL/api/users" `
        -Method POST `
        -ContentType "application/json" `
        -Body $userPayload `
        -ErrorAction Stop
    if ($response.Content -match "username") {
        Write-Host "✅ Create user PASSED" -ForegroundColor Green
        $content = $response.Content.Substring(0, [Math]::Min(300, $response.Content.Length))
        Write-Host "   Response: $content..."
    } else {
        Write-Host "❌ Create user FAILED" -ForegroundColor Red
        Write-Host "   Response: $($response.Content)"
    }
} catch {
    Write-Host "❌ Failed to create user" -ForegroundColor Red
    Write-Host "   Error: $_"
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ API Testing Complete!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
