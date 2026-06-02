# Joke Generator API Documentation

## Base URL
```
http://localhost:3001/api/v1/jokes
```

## Endpoints

### 1. Get Random Joke

**Endpoint**: `GET /random`

**Description**: Fetches a single random joke based on the selected category.

**Query Parameters**:
- `category` (string, optional): Joke category - `general`, `programming`, `knock-knock`. Default: `general`

**Request**:
```bash
curl http://localhost:3001/api/v1/jokes/random?category=programming
```

**Success Response (200)**:
```json
{
  "success": true,
  "joke": {
    "id": 123,
    "type": "programming",
    "setup": "Why do Java developers wear glasses?",
    "punchline": "Because they don't C#",
    "category": "programming"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Error Response (500)**:
```json
{
  "success": false,
  "error": "Failed to fetch joke",
  "message": "Connection timeout"
}
```

---

### 2. Get Multiple Jokes

**Endpoint**: `GET /multiple`

**Description**: Fetches multiple random jokes. Default is 10 jokes.

**Query Parameters**:
- `count` (number, optional): Number of jokes to fetch (1-50). Default: 10

**Request**:
```bash
curl http://localhost:3001/api/v1/jokes/multiple?count=5
```

**Success Response (200)**:
```json
{
  "success": true,
  "count": 5,
  "jokes": [
    {
      "id": 123,
      "type": "general",
      "setup": "Why don't scientists trust atoms?",
      "punchline": "Because they make up everything!"
    },
    {
      "id": 124,
      "type": "general",
      "setup": "What do you call a fake noodle?",
      "punchline": "An impasta!"
    }
    // ... more jokes
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Limits**:
- Minimum: 1 joke
- Maximum: 50 jokes
- Values outside this range are automatically clamped

---

### 3. Get Joke Categories

**Endpoint**: `GET /categories`

**Description**: Returns all available joke categories.

**Request**:
```bash
curl http://localhost:3001/api/v1/jokes/categories
```

**Success Response (200)**:
```json
{
  "success": true,
  "categories": [
    {
      "id": "general",
      "name": "General",
      "description": "General jokes for everyone",
      "emoji": "😄"
    },
    {
      "id": "programming",
      "name": "Programming",
      "description": "Jokes for programmers and tech enthusiasts",
      "emoji": "💻"
    },
    {
      "id": "knock-knock",
      "name": "Knock Knock",
      "description": "Classic knock knock jokes",
      "emoji": "🚪"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### 4. Share a Joke

**Endpoint**: `POST /share`

**Description**: Tracks when a joke is shared. Used for analytics.

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "jokeId": 123,
  "category": "programming",
  "message": "Check out this joke!"
}
```

**Request**:
```bash
curl -X POST http://localhost:3001/api/v1/jokes/share \
  -H "Content-Type: application/json" \
  -d '{
    "jokeId": 123,
    "category": "programming",
    "message": "Check out this joke!"
  }'
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Joke shared successfully",
  "jokeId": 123
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "error": "Joke ID is required"
}
```

---

### 5. Health Check

**Endpoint**: `GET /health`

**Description**: Checks the health of the joke service and external API connectivity.

**Request**:
```bash
curl http://localhost:3001/api/v1/jokes/health
```

**Success Response (200)**:
```json
{
  "success": true,
  "status": "ok",
  "externalApiStatus": "reachable",
  "responseTime": "234ms",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Error Response (503)**:
```json
{
  "success": false,
  "status": "error",
  "externalApiStatus": "unreachable",
  "error": "External API is not available",
  "message": "Connection timeout"
}
```

---

## Error Codes

| Code | Description | Cause |
|------|-------------|-------|
| 200 | OK | Successful request |
| 400 | Bad Request | Missing or invalid parameters |
| 500 | Internal Server Error | Server error or external API failure |
| 503 | Service Unavailable | External API is unreachable |

---

## Response Format

All responses follow a consistent format:

```json
{
  "success": boolean,
  "data": {} or [],
  "error": "string (if success is false)",
  "timestamp": "ISO 8601 timestamp"
}
```

---

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP address
- **Headers**: 
  - `X-RateLimit-Limit`: 100
  - `X-RateLimit-Remaining`: Number of remaining requests
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

---

## Timeout

All external API calls have a **5-second timeout**. If the external API doesn't respond within this time, a timeout error is returned.

---

## External API

This service uses the **Official Joke API** (https://official-joke-api.appspot.com/)

**Features**:
- Free to use
- No authentication required
- Multiple joke categories
- Reliable and fast
- Open source

---

## Example Usage

### JavaScript/Fetch

```javascript
// Get a random programming joke
async function getJoke() {
  try {
    const response = await fetch(
      '/api/v1/jokes/random?category=programming'
    );
    const data = await response.json();
    
    if (data.success) {
      console.log(data.joke.setup);
      console.log(data.joke.punchline);
    }
  } catch (error) {
    console.error('Error fetching joke:', error);
  }
}
```

### TypeScript/Axios

```typescript
import axios from 'axios';

interface JokeResponse {
  success: boolean;
  joke: {
    id: number;
    setup: string;
    punchline: string;
    type: string;
    category: string;
  };
  timestamp: string;
}

const getRandomJoke = async (category: string = 'general'): Promise<void> => {
  try {
    const response = await axios.get<JokeResponse>(
      `/api/v1/jokes/random?category=${category}`
    );
    console.log(response.data.joke);
  } catch (error) {
    console.error('Failed to fetch joke:', error);
  }
};
```

### cURL

```bash
# Get a random joke
curl -X GET http://localhost:3001/api/v1/jokes/random

# Get a programming joke
curl -X GET http://localhost:3001/api/v1/jokes/random?category=programming

# Get 5 jokes
curl -X GET http://localhost:3001/api/v1/jokes/multiple?count=5

# Get all categories
curl -X GET http://localhost:3001/api/v1/jokes/categories

# Check health
curl -X GET http://localhost:3001/api/v1/jokes/health
```

---

## Testing

### Unit Test Example

```typescript
import request from 'supertest';
import app from '../app';

describe('Jokes API', () => {
  describe('GET /api/v1/jokes/random', () => {
    it('should return a random joke', async () => {
      const response = await request(app)
        .get('/api/v1/jokes/random')
        .query({ category: 'general' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.joke).toHaveProperty('setup');
      expect(response.body.joke).toHaveProperty('punchline');
    });
  });

  describe('GET /api/v1/jokes/categories', () => {
    it('should return all categories', async () => {
      const response = await request(app)
        .get('/api/v1/jokes/categories');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.categories)).toBe(true);
      expect(response.body.categories.length).toBeGreaterThan(0);
    });
  });
});
```

---

## Troubleshooting

### Issue: Getting `Connection timeout` error

**Solution**: 
- Check your internet connection
- Verify Official Joke API is online
- Try again after a few seconds

### Issue: Getting `External API is not available`

**Solution**:
- Official Joke API may be down
- Check https://official-joke-api.appspot.com/random_joke
- Wait for the service to be restored

### Issue: Category returns incorrect joke type

**Solution**:
- Ensure category parameter is one of: `general`, `programming`, `knock-knock`
- Check spelling (lowercase, hyphen for knock-knock)

---

## Version

**API Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready
