# pocketbase-first-impressions
A simple app built to showcase pocketbase!

## USEFUL RESOURCES

- [pocketbase docs](https://docs.pocketbase.io)
- [fly.io docs](https://fly.io/docs)
- [hosting pocketbase on fly.io](https://github.com/pocketbase/pocketbase/discussions/537)

## how to run locally

1. clone this repo
2. start a local server in the root directory: ```task start```
3. cd into the ```client``` directory
4. install dependencies: ```npm install```
5. set your .env file: ```cp .env.example .env```
6. start the client: ```npm start```

## how to deploy to fly.io

1. install flyctl: https://fly.io/docs/hands-on/install-flyctl
2. init the fly app: ```flyctl launch```
3. create free storage volume: ```flyctl volumes create pb_data --size=1```
4. update fly.toml with the volume info:
    ```
        [mounts]
            destination = "/pb/pb_data"
            source = "pb_data"
    ```
5. deploy: ```flyctl deploy```




# <Browse Learn Offer Grow> B.L.O.G

## Tech Stack

- [![SvelteKit](https://img.shields.io/badge/SvelteKit-%23E34F26.svg?style=for-the-badge&logo=svelte&logoColor=white&style=plastic)](https://svelte.dev/)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%23007ACC.svg?style=for-the-badge&logo=tailwind-css&logoColor=61DAFB&style=plastic)](https://tailwindcss.com/)
- [![AuthJS](https://img.shields.io/badge/AuthJS-%239C27B0.svg?style=for-the-badge&logo=auth0&logoColor=61DAFB&style=plastic)](https://authjs.dev/)
- [![Prisma](https://img.shields.io/badge/Prisma-%233A4E84.svg?style=for-the-badge&logo=prisma&logoColor=white&style=plastic)](https://www.prisma.io/)

## Languages

![Svelte](https://img.shields.io/badge/Svelte-68.6%25-%230740D9?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-18.0%25-%23007ACC?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-7.9%25-%23F7DF1E?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML-2.0%25-%23E34F26?style=for-the-badge)
![CSS](https://img.shields.io/badge/CSS-1.8%25-%231572B6?style=for-the-badge)
![SCSS](https://img.shields.io/badge/SCSS-1.7%25-%23CC6699?style=for-the-badge)

## Description

#### Why I Built This Project:

- The primary motivation was to learn Svelte, a framework I was highly interested in.
- The project provides a simple and efficient way to create and manage a blog using SvelteKit.



## Contents


- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

To get started, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/TungLe0319/Tung-Svelte-Blog.git

   ```
2. CD into the project:

   ```bash
    cd sveltekit-blog-project 
   ```
3. Install Dependencies:

   ```bash 
    npm install
   ```



## Usage

### Authentication

 Click the "Login" button and Login with either Github or Google, and follow the prompts to securely sign in. 
 
 [![AuthJS](https://img.shields.io/badge/AuthJS-%239C27B0.svg?style=for-the-badge&logo=auth0&logoColor=61DAFB&style=plastic)](https://authjs.dev/)

### Browsing Blogs

Once you're logged in, you can start exploring our blog content:

1. **Homepage:** The homepage provides an introduction and  overview of the latest and featured blog posts. Scroll through the feed to discover interesting articles.

2. **Search and Categories:** Use the categories to filter and find specific topics or articles that interest you.

3. **Blog Details:** Click on a blog post to read it in detail. You can view the full article, images, and related information.

### Interacting with Blogs

You can interact with our blog content in various ways:

- **Comment:** Share your thoughts and engage with the author and other readers by leaving comments on blog posts.

- **Like:** Show your appreciation for a blog post by clicking the "Like" button. This helps others discover popular articles.



<!-- ### User Profile

Your user profile allows you to manage your account settings, see your activity history, and view your liked blogs and comments. -->

### Troubleshooting

If you encounter any issues or have questions, feel free to [contact our support](mailto:tung.le0319@gmail.com) for assistance.

Enjoy your time exploring and interacting with our blog platform!


## Credits


[![GitHub Profile Image](https://img.shields.io/badge/-daniel--le97-blue.svg?style=flat&logo=github&logoColor=white&colorA=black)](https://github.com/daniel-le97)





<!-- If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section. -->

- Flowbite Svelte - [Flowbite Svelte Website](https://example.com/flowbite-svelte)
- SvelteKit - [SvelteKit Website](https://example.com/sveltekit)
- Flaticon Icons - [Flaticon Website](https://example.com/flaticon)

<!-- If you followed tutorials, include links to those here as well. -->


## Features

- **SvelteKit Dynamic Components:** Leverage the power of SvelteKit to create dynamic and interactive components for your web application.

- **Server-Side Rendering (SSR):** Improve performance and SEO with server-side rendering, ensuring your content is easily discoverable by search engines.

- **Flexible Layout:** Utilize flexible layout options to design web pages that adapt to different screen sizes and devices.

- **Tailwind CSS Integration:** Benefit from seamless integration with Tailwind CSS to streamline your styling and make your design process efficient.

- **Dynamic Routing with Blog/[Slug]:** Implement dynamic routing, including a blog structure with slug-based URLs, for a user-friendly and organized content presentation.

- **Prisma ORM:** Utilize Prisma as your ORM (Object-Relational Mapping) tool to interact with your database effortlessly and efficiently.

## How to Contribute

This project is primarily developed and maintained by the owner, and contributions from external contributors are not expected. However, if you would like to contribute or suggest changes, you can follow these general guidelines:

1. **Fork the Repository**: If you're interested in making changes, you can fork this repository to your own GitHub account.

2. **Create a Branch**: Create a new branch in your forked repository to work on the changes.

3. **Make Changes**: Make the desired changes to the project. Feel free to customize it for your own use.

4. **Commit Changes**: Commit your changes with descriptive commit messages.

5. **Push Changes**: Push your changes to your forked repository.

6. **Create a Pull Request**: If you believe your changes would be valuable to the project or want to share your improvements, you can create a pull request from your forked repository to the original repository. However, keep in mind that the owner may not actively review or merge these requests.

7. **Open Issues**: If you encounter issues or have suggestions, you can open an issue on the project's GitHub repository.

Please note that contributions from external contributors are not actively sought, and the project owner may or may not review or merge pull requests.

This section is primarily included for informational purposes and as a reference for the project's development workflow.


## License
Copyright (c) 2023-present Tung Le

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/license/mit/)

