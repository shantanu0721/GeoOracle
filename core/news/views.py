from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import requests
from groq import Groq

@api_view(['POST'])
def analyze_topic(request):
    topic = request.data.get('topic', '')

    if not topic:
        return Response({'error': 'Please provide a topic'}, status=400)

    # Step 1 - Fetch news from NewsAPI
    news_url = 'https://newsapi.org/v2/everything'
    news_params = {
        'q': topic,
        'sortBy': 'publishedAt',
        'language': 'en',
        'pageSize': 5,
        'apiKey': settings.NEWS_API_KEY
    }

    news_response = requests.get(news_url, params=news_params)
    articles = news_response.json().get('articles', [])

    if not articles:
        return Response({'error': 'No news found for this topic'}, status=404)

    # Step 2 - Prepare articles for Groq
    news_text = ""
    for i, article in enumerate(articles):
        news_text += f"\nArticle {i+1}: {article['title']}\n"
        news_text += f"Source: {article['source']['name']}\n"
        news_text += f"Description: {article['description']}\n"

    # Step 3 - Send to Groq API
    client = Groq(api_key=settings.GROQ_API_KEY)

    chat_completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""You are GeoOracle, an expert geopolitical analyst.

A user asked about: {topic}

Here are the latest news articles:
{news_text}

Please provide:
1. A clear summary of the current situation
2. Key countries and players involved
3. Sentiment analysis (how tense is the situation?) with a score out of 100
4. What to watch out for next

Keep it clear, concise and insightful."""
            }
        ]
    )

    # Step 4 - Return response
    return Response({
        'topic': topic,
        'ai_analysis': chat_completion.choices[0].message.content,
        'articles': [
            {
                'title': a['title'],
                'source': a['source']['name'],
                'url': a['url'],
                'publishedAt': a['publishedAt']
            } for a in articles
        ]
    })