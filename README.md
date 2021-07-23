

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://pollution-global.netlify.app/" target="_blank">
    <img src="./src/img/logo.png" alt="Screenshot">
  </a>

  <h3 align="center">Global Pollution</h3>

  <p align="center">
   My project for start2impact.it: a simple web app that retrieves data from the AQI APIs and displays it.
    <br />
    <br />
    <a href="https://pollution-global.netlify.app/" target="_blank">Live Demo</a>
    ·
    <a href="https://github.com/davide-lombardo/pollution-global/issues">Report Bug</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Website Screenshot][product-screenshot]](https://pollution-global.netlify.app/)

Build an app that allows you to get information about a city's pollution levels.

Requirements:

- The app will need to both accept input from the user, and use JavaScript's API to get its GPS coordinates;

- You will have to use an external API to realize this project, in particular the AICQN API.

<!-- GETTING STARTED -->

## Getting Started

1. Clone the repo

```sh
git clone https://github.com/davide-lombardo/pollution-global
```

2. Get your API key from AICQN website

```url
https://aqicn.org/data-platform/token/#/
```

3. Create a .env file and insert your own API key like so

```env
API_KEY=YOUR_API_KEY
```

4. Launch 'index.html' and your good to go

<!-- USAGE -->

## Usage

Enter the name of the city of which you want to know the level of pollution or simply geolocalize yourself and find the nearest station.

<!-- CONTACT -->

## Contact

Davide Lombardo - davide.lombardo.92@gmail.com

start2impact personal page: https://talent.start2impact.it/profile/davide-lombardo

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [dotenv](https://github.com/motdotla/dotenv)
- [webpack](https://webpack.js.org/)
- [axios](https://github.com/axios/axios)

<!-- MARKDOWN LINKS & IMAGES -->

[issues-shield]: https://img.shields.io/github/issues/davide-lombardo/polution-global/repo.svg?style=for-the-badge
[issues-url]: https://github.com/davide-lombardo/pollution-global/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/davide-lombardo-profile/
[product-screenshot]: ./src/img/screenshot.png
