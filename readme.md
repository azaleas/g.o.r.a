# G.O.R.A

Vanilla JavaScript adventures with template strings.

## Demo

A demo was deployed on surge.sh and can be accessed at [here](https://gora.surge.sh). For swiper slider, use touch screen devices via browser debugger tools.

## Objective

Try to replicate Google Movies App(let). Original can be found at google.com (search for a movie in mobile view). Also, this neat gif might help if you don't want to bother yourself with the original:

https://media.giphy.com/media/3ohc18FZeUvdUNjNgA/giphy.gif

Key features that were needed to have:

- Dropdown menu for share and send feedback actions (not required to implement the share and send feedback actions)
- Tabs for overview and cast content
- An image slider for the movie images
- Sticky tabs bar: it should always be at the top of the page as you scroll
- Animations: active tab switching animation, cast list to cast details page loading animation

## Tools used

- [OMDb](www.omdbapi.com) - for basic movie data
- [Robohash](https://robohash.org) - for actor avatars
- [PlaceCage](https://www.placecage.com) & [FillMurray](https://www.fillmurray.com) - for stock images
- [Icomoon](https://icomoon.io) - for icons
- [Google fonts](https://fonts.google.com) - for `Laila` font
- SCSS - to have a sane CSS
- ES6 - for template strings and imports
- Prettier - to automate JS formatting
- Babel - for ES6
- Webpack - to pipe and pack all the code
- Nodejs v10.12.0 && Yarn v1.10.1

## Project setup

Webpack 4 is used with a custom config to build and pack the assets. All development is done in `src` folder, while production code is put inside `dist` folder.

To work in dev mode, run `yarn dev`. This will enable file watching and hot reloading.

To create a production build, run `yarn build`.

## Project structure

To build the dynamic content for the app, `template strings` were used in conjuction with import/export feature of ES6 to divide the JS code into modular components. App's main file is `index.js`. It also acts as a router to show/hide different components. All remaining components are located in `components` folder. Almost all components have:

- A return statement with template strings for the html
- actions object to hold actions
- properties object to hold general props

For data storage a basic store object with pub/sub mechanism was created to update the state and run the listeners whenever the state is changed. Listeners are used to update the html content dynamically.

For `sticky header` and `dropdown menu` a `globalEvents.js` object was created due to the nature of this features. Both of these features require an eventListener to be added to the window object, so globalEvents object was used to remove the listeners whenever the different routeElement is rendered.

Also, utils folder contains `constants.js` to keep all constant variables (like api keys and static data) and `helperFunctions.js` for general purpose functions. `remoteServices.js` file is responsible for remote data fetching + mocking. For remote fetching `axios` library was used.

All style and font assets are located in `style` folder. `Fonts` folder contains icomoon icon fonts, while `components` folder contains individual scss files for each JS component. All styles are imported inside `index.scss` file.

## Project objectives solutions

### Adding event listeners with template strings

Given that template strings were returned and served as part of either innerHTML/outerHTML, event listeners were had to add be added after this stage. Hence, a `setTimeout` timer with `0` timer was used across all components. This ensures that event listeners are part of a `microtasks` queue and were implemented only after the main thread finishes the innerHTML/outerHTML jobs.

### Project container and overall designs

Given that the original app is only available in mobile screens, the app was contained within a container element. Container element is equal to window width on screens below 768px, for anything bigger, app is centered both vertically and horizontally and limited to max width (450px) and height, to keep the same look and feel. A gradient background was added around the container.

### Show/hide for movie content in Movie Overview tab

This was handled with CSS only with input with the type `checkbox`. The code is located inside `MovieOverviewContent.js`. Two inputs were used: one for movie plot expand functionality, one for show/hide of movie information

### Dropdown menu for share and send feedback actions (not required to implement the share and send feedback actions)

Although this problem is similar to the one above, for its solution a more generic JS approach was used, mainly to make sure that dropdown is closed when other parts of screen are clicked. The dropdown is part of `Tabs` component.

### Tabs for overview and cast content

Initially tabs component was used for Movie Overview and Cast details sections. However it was changed into a generic component to handle Individual Cast Overview and Movies sections.

Tabs use a fade animation to show/hide the content when a tab nav is clicked. Also a ripple effect for tab nav buttons was added.

Original app has a custom color for each movie and actor, which is not randomly generated. Data for this app was coming from a 3rd party API, hence the app didn't have a stored custom color. Thats why only one background color was used for all tabs.

## An image slider for the movie images

There're 2 image sliders in the app. One is a generic ImageSlider component, that handles movie and individual cast images. It uses CSS for scrolling.

The other image slider is part of Modal component. This slider is active only for touch devices in original app, hence, this same behavior was kept in the current app as well. For touch detection `touchstart`, `touchmove` and `touchend` listeners were used. Touch scrolling is activated within the container element only.

Modal images are prepared and loaded in `MovieImages` component. Each modal item is suplemented with a generic/static text. Modal has to be closed and re opened if a window resize will happen dynamically.

### Sticky tabs bar: it should always be at the top of the page as you scroll

Tab menu buttons should be sticky on scroll. Given that the app has 2 versions, sticky functionality uses capture method to distinguish between window scrolling (on small screens) vs container scrolling (on bigger screens).

### Animations: active tab switching animation, cast list to cast details page loading animation

For Modal component multiple animations were used. All animations can be found in `animations.scss` file. Also to transition between images on image slider a CSS transition was used.

For transitions between tabs a CSS transition was used to have fade-in/out effects.

## Improvements that can be added due to time limitations

- Tests - no unit/integration tests were added
- Refactor SCSS - duplicated styles can be properly extracted into variables and helper classes
- A basic Virtual DOM - currently almost all content is replaced with innerHTML and outerHTML. With a basic VDOM a more granular update can be achieved to reduce the replaced content. Given the app's size and overall complexitity, this is not a pure necessity (and maybe it will add even mroe boilerplate code), but rather a nice to have feature ~to show off~.
- A better handling for global events - Currently there 2 global events attached to window object. They are removed withing index.js file if the attacher component is no longer present in the DOM. This can be improved.
- Window resize changes - Some code, like modal swiper, has to be adjusted for better window.resize.
- Overall JS refactoring - Some parts of JS code can be refactored to remove duplicated code.
- Color palettes - to improve the overall UI a better color pallete list can be used.

---------------

**Adventures to be continued...**
