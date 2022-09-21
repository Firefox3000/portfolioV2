---
title: Twitch TTS
description: An app that reads out Twitches highlighted messages
img: /img/twitchTTS.png
alt: Twitch Text to speech
slug: twitchTTS
createdAt: 2021-02-12T00:00:00+0000
status: public
---

# Twitch Text to Speach

This project started after Twitch added channel points (points you get by watching streamers). You can then spend these points for certain rewards like chat emotes or highlighting your message, although Twitch being Twitch the API to use the channel points is almost non-existent and I wanted a more automated system.

So I decided to create my extension to the already existing Twitch API and while looking through the metadata of messages I was able to find some information about the Channel point rewards.
Getting the site to read out messages was another challenge since there wasn't much information on the topic. I ended up having to create a proxy to get
since the service I use to convert the text to messages doesn't allow requests from the browser, lovely CORS errors

Since the app is very lightweight and doesn't get too much use I decided to try out and host it on [Glitch](https://glitch.com/). Glitch has been doing alright at hosting the app
The apps does have a short startup time because it is on a free plan but performance is good so nothing to complain about.

<icon-link href="https://github.com/vuurvos1/twitchTTS" target="_blank" icon="github">
Source code
</icon-link>

<icon-link href="https://twitchtts.glitch.me/" target="_blank" icon="launch">
See it live
</icon-link>
