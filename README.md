# Sarasota Community Resource Hub

A comprehensive, interactive website showcasing community resources available to residents in Sarasota, Florida.

Resources used:

* https://sarasotaeventscalendar.com/
* https://www.emailjs.com/
* https://www.openstreetmap.org/#map=4/38.01/-95.84
* https://fullcalendar.io/docs/Calendar-render
* https://www.w3schools.com/howto/howto_js_filter_elements.asp
* https://www.youtube.com/watch?v=BgVjild0C9A
* https://www.w3schools.com/html/
* https://www.w3schools.com/html/html_favicon.asp
* https://www.w3schools.com/html/html_images.asp
* https://www.w3schools.com/html/html_links.asp
* https://www.w3schools.com/html/html_css.asp
* https://www.w3schools.com/html/html_responsive.asp
* https://www.youtube.com/watch?v=UUjNEMXZA-k
* https://www.w3schools.com/html/html_emojis.asp
* https://www.youtube.com/watch?v=O4jV8Zz2w9I
----------------------------------
Explanation for each page:
## Index
Head: Sets up meta tags, favicon, CSS, and Leaflet map library.
Header: Site logo and navigation bar for all main pages.
Hero Section: Welcoming message, site description, and buttons to explore resources or submit a resource.
Featured Section: Cards linking to the resources directory and interactive map, encouraging users to explore.
Footer: contains site info, quick links, and contact, similar to other pages (same for every page)
## Resources
Head: Meta tags, favicon, CSS, and custom styles for the resource grid.
Header: Same as index.html for consistent navigation.
Main Content:
Title and description.
Search/filter bar for resources.
Grid layout displaying each resource as a card with name, category, description, tags, and contact info.
Footer: Site info, quick links, and contact.
## About
Head: Meta tags, favicon, CSS, and cache-control headers.
Header: Consistent navigation bar.
Main Content:
Mission statement and site purpose.
Stats (number of resources, categories, events).
Features grid (comprehensive, up-to-date, accessible).
Footer: Site info, quick links, and contact.
## Calendar
Head: Meta tags, favicon, CSS, and custom styles for the calendar.
Header: Consistent navigation bar.
Main Content:
Calendar header with navigation buttons.
Calendar grid showing days and events.
Event details and ability to add events (if implemented).
Footer: Site info, quick links, and contact.
## Map
Head: Meta tags, favicon, CSS, and Leaflet map library/styles.
Header: Consistent navigation bar.
Main Content:
Title and description.
Search and filter section for map resources.
Interactive map showing resource locations.
Category legend for map markers.
Footer: Site info, quick links, and contact.
## Submit
Head: Meta tags, favicon, CSS, and custom styles for the form.
Header: Consistent navigation bar.
Main Content:
Title and form for submitting a new resource.
Fields for resource and submitter info.
Status message area for feedback.
Footer: Site info, quick links, and contact.
Script: Handles form validation, sends resource info to admin and confirmation to user via EmailJS, and provides visual feedback (green/red background, home button).

----------------------------------
# Javascript Pages

So you're wondering, why the heck are there javascript pages?
Well: 

## App
This is the main application logic for the site.
Handles global state (current page, filtered resources/events, map, etc.).
On page load, it:
Detects which page is active (home, resources, map, calendar, submit, about).
Sets up the mobile menu, event listeners, and UI population.
Initializes page-specific features (e.g., displays resources, initializes the map, etc.).
Controls navigation highlighting, scroll animations, and dynamic UI updates.
Calls functions to display resources, events, or map markers depending on the page.
## Resource Data
Contains a large array (resourcesDatabase) of all community resources.
Each resource is an object with fields like id, name, category, description, address, phone, website, coordinates, hours, tags, and services.
This data is used by the app.js logic to populate the resources directory, map, and search/filter features.
## Events Data
Contains an array (eventsDatabase) of all community events.
Each event is an object with fields like id, name, category, date, time, location, contact, description, and details.
This data is used by the app.js logic to populate the events calendar and event listings.

------------------------------------
# Logo & Color Choice

So the favicon (aka the logo) was primarily inspired by the Sarasota County's website and how they use the color pink to resemble the spoon birds and we also chose the flower because those flowers are found very often within sarasota itself. 
