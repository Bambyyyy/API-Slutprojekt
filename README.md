# General Info

This is a final project in school that I've been working on for 3 weeks, the project has been a part of a TypeScript/Sass & Ajax course. 
The app is built against an API that I fetch movies and series from, if you'd like to create your own movie database app you can then check out the API here at: https://www.themoviedb.org/ 

# How to start it up

- Either you start up the app with the liveserver add-on or just simply open up the HTML file which is located in the src/ts folder.

# How to use
- When you start the app, you are presented with the 20 most popular movies right now at the moment.
  You can then browse through those movies and add them to your "Watchlist" if you'd like, by pressing the "Add to watchlist" button.
  The "Watchlist" can be found at the top of the webpage which shows you the movies or series you've added to it.
  
- You also have the option of searching for specific movies or series if you'd like by selecting either movies or series in the "Choose category" section.
  After selecting your category you then press in the search input field and type the movie/serie you'd like to find and press the search-icon
  button or enter-key. The movie/serie you've searched for should show up.
  
- If nothing is found then make sure to check if you've spelled the movie/serie-name correctly. 

# Technologies 

- TypeScript, Sass & HTML

# Compiling

If you'd like to add things or change something in the code, you then have to use the following commands in your command prompt.

- For Sass you enter this: sass src/scss/main.scss dist/css/main.css
- For TypeScript: tsc

**Note that this only works if you've installed the required npm-installs.**
