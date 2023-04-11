Here are some features to include in your Discord clone to demonstrate understanding of Next.js and real-time applications:

<!-- User authentication: Implement user authentication and authorization to ensure that users can securely log in and access the appropriate features and data. -->

<!-- Real-time messaging: Implement real-time messaging functionality using technologies like Socket.IO or WebSockets. This will allow users to send and receive messages in real-time, similar to Discord. -->

<!-- Channels and servers: Allow users to create and join channels and servers to organize their conversations and interact with others with similar interests. -->

<!-- Push notifications: Implement push notifications to alert users of new messages, mentions, or other events, even when they're not actively using the app. -->

<!-- Server-side rendering: Use Next.js to perform server-side rendering of your application, improving its performance and SEO.  -->
<!-- not doing server side rendering next.js app is being served by pocketbase -->

<!-- Mobile responsiveness: Ensure that your application is fully responsive and works well on a variety of devices and screen sizes, including desktops, tablets, and mobile devices. -->

User profiles: Allow users to create and customize their profiles, including their usernames, avatars, and status messages.

<!-- Emojis and reactions: Implement support for emojis and reactions to messages, allowing users to express themselves in fun and creative ways. -->

Search functionality: Implement search functionality to allow users to easily find messages, channels, and servers.

By implementing these features, you'll be able to demonstrate your understanding of Next.js and real-time applications, and create a Discord clone that users will enjoy using.

TODO --
Flush out the Server Members Bar and User Status,
-when a User is created, create a user Status record with it
-when user is created, create a default friend to one of the Admins?
-populate with fake data

CONSTRAINTS

- 5-10 channels to a Server?

CHECKS --
Server/Channels titles contain specific characters, disallow special characters
No Scripts or HTML in Create Message
Create Default Welcome Message on Channel Create,
Create Default Image if No Uploaded Image Provided
Instead of Return message in withMember, to router push to home instead "/" not working

switching between channels fast creates a delay bug
when theres no AppState.messages don't show the loading bar, instead show a message