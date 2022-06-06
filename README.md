# Ride Compare

## A website to use to compare prices between ride sharing apps

Have you ever used Uber or Lyft and thought to yourself, "This seems so expensive for this ride, I wonder if can use another app to save money?" Well, you've come to the right place.

Due to the nature of ride sharing services, they will have surge pricing which means the price of a ride can drastically vary between different apps and services.

Our website solves this issue for you by providing the information about any given ride across all of the apps with their included surge pricing to let you make the most informed decision about which app to use.

> **Note:** Due to Uber and Lyft closing off their API to the public, an alternative solution was used to gather data and therefore the website is a bit slow to display the results and has some bugs. Please bear with us.

## Technologies Used

The APIs used for the project include the Mapquest API for geocoding of addresses, and an API developed (in place of Lyft and Uber's APIs) to fetch the data from their sites and pass it to the web page.

The page uses the Bootstrap CSS framework and the Bulma CSS framework for formatting the pages.

To make the API fetch the data from the respective search sites:

Ride Data:
- jQuery for ajax request
- Uber Ride Estimate Site
- Lyft Ride Estimate Site

Backend Server:
- Python using FastAPI library
- Selenium for Web scraping the individual sites


[You can try the website out here and start saving money!](https://rgarrettlee.github.io/Ride-Compare/)

[The repository is linked here:](https://github.com/RGarrettLee/Ride-Compare)
---

> ## Screenshots of the Application

![site home page demo](./images/site-demo.png)
![site home page demo](./images/compare-result.png)
