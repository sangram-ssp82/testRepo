#!/bin/bash

# OctoFit Tracker API Testing Script
# Tests API endpoints for localhost and Codespaces environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Determine API base URL
if [ ! -z "$CODESPACE_NAME" ]; then
  API_BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
  echo -e "${BLUE}📍 Codespaces Environment Detected${NC}"
  echo -e "${BLUE}API Base URL: ${API_BASE_URL}${NC}"
else
  API_BASE_URL="http://localhost:8000"
  echo -e "${BLUE}📍 Localhost Environment${NC}"
  echo -e "${BLUE}API Base URL: ${API_BASE_URL}${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Testing OctoFit Tracker API Endpoints${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Test 1: Health Check
echo -e "${BLUE}1️⃣  Testing Health Check Endpoint${NC}"
echo "   GET ${API_BASE_URL}/health"
if response=$(curl -s -X GET "${API_BASE_URL}/health" -H "Content-Type: application/json"); then
  if echo "$response" | grep -q "healthy"; then
    echo -e "${GREEN}✅ Health check PASSED${NC}"
    echo "   Response: $response"
  else
    echo -e "${RED}❌ Health check FAILED${NC}"
    echo "   Response: $response"
  fi
else
  echo -e "${RED}❌ Failed to connect to API${NC}"
  exit 1
fi

echo ""

# Test 2: Root Endpoint
echo -e "${BLUE}2️⃣  Testing Root Endpoint${NC}"
echo "   GET ${API_BASE_URL}/"
response=$(curl -s -X GET "${API_BASE_URL}/" -H "Content-Type: application/json")
if echo "$response" | grep -q "OctoFit Tracker API"; then
  echo -e "${GREEN}✅ Root endpoint PASSED${NC}"
  echo "   Response: $response" | head -c 200
  echo "..."
else
  echo -e "${RED}❌ Root endpoint FAILED${NC}"
  echo "   Response: $response"
fi

echo ""

# Test 3: Get All Users
echo -e "${BLUE}3️⃣  Testing /api/users Endpoint${NC}"
echo "   GET ${API_BASE_URL}/api/users"
if response=$(curl -s -X GET "${API_BASE_URL}/api/users" -H "Content-Type: application/json"); then
  if echo "$response" | grep -qE '(\[\]|username)'; then
    echo -e "${GREEN}✅ Users endpoint PASSED${NC}"
    echo "   Response: $response" | head -c 200
    echo "..."
  else
    echo -e "${RED}❌ Users endpoint returned unexpected format${NC}"
    echo "   Response: $response"
  fi
else
  echo -e "${RED}❌ Failed to fetch users${NC}"
fi

echo ""

# Test 4: Get All Activities
echo -e "${BLUE}4️⃣  Testing /api/activities Endpoint${NC}"
echo "   GET ${API_BASE_URL}/api/activities"
if response=$(curl -s -X GET "${API_BASE_URL}/api/activities" -H "Content-Type: application/json"); then
  if echo "$response" | grep -qE '(\[\]|type|duration)'; then
    echo -e "${GREEN}✅ Activities endpoint PASSED${NC}"
    echo "   Response: $response" | head -c 200
    echo "..."
  else
    echo -e "${RED}❌ Activities endpoint returned unexpected format${NC}"
    echo "   Response: $response"
  fi
else
  echo -e "${RED}❌ Failed to fetch activities${NC}"
fi

echo ""

# Test 5: Create a Test User
echo -e "${BLUE}5️⃣  Testing POST /api/users (Create User)${NC}"
echo "   POST ${API_BASE_URL}/api/users"
user_payload='{
  "username": "test_user_'$(date +%s)'",
  "email": "test_'$(date +%s)'@octofit.local",
  "firstName": "Test",
  "lastName": "User",
  "age": 25,
  "height": 180,
  "weight": 75,
  "goal": "build muscle"
}'
if response=$(curl -s -X POST "${API_BASE_URL}/api/users" \
  -H "Content-Type: application/json" \
  -d "$user_payload"); then
  if echo "$response" | grep -q "username"; then
    echo -e "${GREEN}✅ Create user PASSED${NC}"
    echo "   Response: $response" | head -c 300
    echo "..."
  else
    echo -e "${RED}❌ Create user FAILED${NC}"
    echo "   Response: $response"
  fi
else
  echo -e "${RED}❌ Failed to create user${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ API Testing Complete!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
