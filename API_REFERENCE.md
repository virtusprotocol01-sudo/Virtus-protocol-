# API Reference

Complete API documentation for Virtus Protocol.

---

## Base URL

```
Production: https://api.virtusprotocol.com/v1
Development: http://localhost:3000/api
```

---

## Authentication

**Note**: Public web interface does not require authentication. API access (coming soon) will use API keys.

```typescript
headers: {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
}
```

---

## Endpoints

### Dilemmas

#### Create Dilemma

```http
POST /api/dilemmas
```

**Request Body**:
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "isStandard": false
}
```

**Response (201)**:
```json
{
  "dilemma": {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "category": "string",
    "is_standard": false,
    "created_at": "2025-01-09T10:30:00Z"
  }
}
```

#### List Dilemmas

```http
GET /api/dilemmas?standard=true
```

**Response (200)**:
```json
{
  "dilemmas": [
    {
      "id": "uuid",
      "title": "string",
      "category": "string"
    }
  ]
}
```

---

### Model Queries

#### Query Multiple Models

```http
POST /api/query-models
```

**Request Body**:
```json
{
  "dilemmaId": "uuid",
  "dilemmaText": "string",
  "modelIds": ["openai/gpt-5.1-chat", "anthropic/claude-opus-4.5"]
}
```

**Response (200)**:
```json
{
  "responses": [
    {
      "model": "openai/gpt-5.1-chat",
      "response": "string",
      "error": null
    }
  ]
}
```

---

### Ratings

#### Submit Rating

```http
POST /api/ratings
```

**Request Body**:
```json
{
  "responseId": "uuid",
  "clarity": 5,
  "ethicalReasoning": 4,
  "nuance": 5,
  "overall": 5
}
```

**Response (201)**:
```json
{
  "success": true,
  "rating": {
    "id": "uuid",
    "created_at": "2025-01-09T10:30:00Z"
  }
}
```

---

### Leaderboard

#### Get Leaderboard

```http
GET /api/leaderboard
```

**Response (200)**:
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "model_name": "anthropic/claude-opus-4.5",
      "model_provider": "Anthropic",
      "average_score": 4.73,
      "total_responses": 247
    }
  ]
}
```

---

## Error Responses

```json
{
  "error": "Error message",
  "status": 400
}
```

**Status Codes**:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

---

[Return to Documentation](./README.md)
