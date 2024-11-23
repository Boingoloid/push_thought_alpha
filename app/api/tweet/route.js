import { TwitterApi } from 'twitter-api-v2';
import { NextResponse } from 'next/server'
import { twitterClient} from '../../../utils/twitterClient'

export async function POST(request) {

  const { tweetMessage } = await request.json();

  if (!tweetMessage) {
    return NextResponse.json({ error: 'Tweet Message is required' }, { status: 400 });
  }

  try {
    await twitterClient.v2.tweet(tweetMessage);
    // 1. success message 
    // 2. save action to database
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Retweet Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}