import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

// External API configuration
const JOKE_APIS = {
  jokeAPI: 'https://official-joke-api.appspot.com/random_joke',
  jokeAPIten: 'https://official-joke-api.appspot.com/jokes/ten',
  programmingJokes: 'https://official-joke-api.appspot.com/jokes/programming/random',
  knockKnock: 'https://official-joke-api.appspot.com/jokes/knock-knock/random',
  general: 'https://official-joke-api.appspot.com/jokes/general/random',
};

interface JokeResponse {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

// GET /api/v1/jokes/random
// Get a single random joke
router.get('/random', async (req: Request, res: Response) => {
  try {
    const { category = 'general' } = req.query;

    // Map category to API endpoint
    let apiUrl = JOKE_APIS.jokeAPI;
    if (category === 'programming') {
      apiUrl = JOKE_APIS.programmingJokes;
    } else if (category === 'knock-knock') {
      apiUrl = JOKE_APIS.knockKnock;
    } else if (category === 'general') {
      apiUrl = JOKE_APIS.general;
    }

    const response = await axios.get<JokeResponse>(apiUrl, {
      timeout: 5000,
    });

    const joke = response.data;

    res.json({
      success: true,
      joke: {
        id: joke.id,
        type: joke.type,
        setup: joke.setup,
        punchline: joke.punchline,
        category: category || 'general',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error fetching joke:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch joke',
      message: error.message,
    });
  }
});

// GET /api/v1/jokes/multiple
// Get multiple random jokes
router.get('/multiple', async (req: Request, res: Response) => {
  try {
    const { count = 10 } = req.query;
    const jokeCount = Math.min(Math.max(parseInt(count as string) || 10, 1), 50);

    const response = await axios.get<JokeResponse[]>(JOKE_APIS.jokeAPIten, {
      timeout: 5000,
    });

    // Get the requested number of jokes
    const jokes = response.data.slice(0, jokeCount);

    res.json({
      success: true,
      count: jokes.length,
      jokes: jokes.map((joke) => ({
        id: joke.id,
        type: joke.type,
        setup: joke.setup,
        punchline: joke.punchline,
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error fetching jokes:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch jokes',
      message: error.message,
    });
  }
});

// GET /api/v1/jokes/categories
// Get available joke categories
router.get('/categories', (req: Request, res: Response) => {
  const categories = [
    {
      id: 'general',
      name: 'General',
      description: 'General jokes for everyone',
      emoji: '😄',
    },
    {
      id: 'programming',
      name: 'Programming',
      description: 'Jokes for programmers and tech enthusiasts',
      emoji: '💻',
    },
    {
      id: 'knock-knock',
      name: 'Knock Knock',
      description: 'Classic knock knock jokes',
      emoji: '🚪',
    },
  ];

  res.json({
    success: true,
    categories,
    timestamp: new Date().toISOString(),
  });
});

// POST /api/v1/jokes/share
// Share a joke (optional - for tracking)
router.post('/share', (req: Request, res: Response) => {
  try {
    const { jokeId, category, message } = req.body;

    if (!jokeId) {
      return res.status(400).json({
        success: false,
        error: 'Joke ID is required',
      });
    }

    // TODO: Implement tracking/analytics for shared jokes
    console.log(`Joke ${jokeId} shared in category ${category}`);

    res.json({
      success: true,
      message: 'Joke shared successfully',
      jokeId,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: 'Failed to share joke',
      message: error.message,
    });
  }
});

// GET /api/v1/jokes/health
// Health check for joke API
router.get('/health', async (req: Request, res: Response) => {
  try {
    const startTime = Date.now();
    const response = await axios.get(JOKE_APIS.jokeAPI, {
      timeout: 5000,
    });
    const responseTime = Date.now() - startTime;

    res.json({
      success: true,
      status: 'ok',
      externalApiStatus: 'reachable',
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(503).json({
      success: false,
      status: 'error',
      externalApiStatus: 'unreachable',
      error: 'External API is not available',
      message: error.message,
    });
  }
});

export default router;
