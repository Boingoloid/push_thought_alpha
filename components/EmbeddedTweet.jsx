'use client';
// components/EmbeddedTweet.js
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { XEmbed } from 'react-social-media-embed';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import { useState } from 'react'

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

const SocialSwal = withReactContent(Swal)

const socialSweetClick = () => {
    SocialSwal.fire({
        title: "Your post was successful.",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            // Swal.showLoading();
        },
        willClose: () => {
            // clearInterval(timerInterval);
        }
    })
}

const EmbeddedTweet = ({ tweetId }) => {
    const handleRetweet = async (tweetId) => {
        console.log("TWEET_ID")
        console.log(tweetId)

        fetch(`${apiDomain}/retweet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tweetId: tweetId }),
        })
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                console.log('result', result)
                socialSweetClick()
            })
            .catch((err) => {
                console.log(err)
            })

        // try {
        //     const response = fetch(`${apiDomain}/retweet`, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ tweetId: tweetId }),
        //     });
        //     // console.log('response: ' + response)
        //     const data = response.json();
        //     if (data.success) alert('Retweeted successfully!');
        // } catch (error) {
        //     console.error('Failed to retweet:', error);
        // }
        // const retweetUrl = `https://twitter.com/intent/retweet?tweet_id=${tweetId}`;
        // window.open(retweetUrl, '_blank');
    };

    return (
        <div>

            {/* Button to retweet */}
            <div
                style={{
                    display: 'flex',    // Flexbox to center the button
                    justifyContent: 'center',  // Centers the button horizontally
                    // marginTop: '10px',  // Adds space between tweet and button
                    marginBottom: '10px',
                }}
            >
                <button onClick={() => handleRetweet(tweetId)}
                    style={{
                        // marginTop: '10px',
                        marginBottom: '10px',
                        padding: '10px 15px',
                        backgroundColor: '#1DA1F2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    Repost Message
                </button>
            </div>

            <TwitterTweetEmbed tweetId={tweetId} />

        </div>
    );
};

export default EmbeddedTweet;