# Bus ETA Report for Hall 8 lab

This was made because it was annoying to take out phone and check how long until bus arrives and then run up when it was too late. With this, I can be constantly reminded when to leave the lab.

First project by Side project and Yapping sub team of Red Bird Racing EVRT.

V2 deployed on 2025-04-07.

## Versions
V1 made by marco lk network and Nicholas(@Nexolas520) did some shit to it

V2 is a from-the-ground-up rewrite of the JavaScript component used to update the ETA and clock by Carson(@Planeson), aimed to increase functionality and efficiency.

## Notes
Room is left for using slots for non-ETA objects like images and animations, as well as replacing route numbers with actual displays.

The clock is synced automatically every hour from [timeapi.io](https://www.timeapi.io/api/timezone/zone?timeZone=Asia%2FHong_Kong).
The clock is the central time-keeping component used to calculate delta from any given ETA timestamp.
If the page is paused, the clock is paused as well. Refresh the page to get updated ETAs.

The HTML probably only works if started in a server due to CORS policies of the GMB ETA server. Optionally use a no-cors proxy to bypass this requirement.

The font used is [Open Sans](<https://fonts.googleapis.com/css?family=Open Sans>).

Layout is updated every minute. The cycling is done every 3 seconds (`const displayTime`). ETA is fetched every 10 seconds (doesn't mean data changes every 10 seconds, depends on ETA server).

To optimize for GMB usability, ETA less than 8 minutes is omitted. The second/third ETA would be used instead. This helps to make 11/M actually usable, if you trust GMB ETA.

Using Firefox breaks the font rendering and the page looks horrible.

## Screenshot
![V2 screenshot](ScreenshotV2.png)

Meant for 1080p displays. For other resolutions, you are suggested to simply zoom in and out.




**API references**

Citybus shit
<https://www.citybus.com.hk/datagovhk/bus_eta_api_specifications.pdf>
<https://www.citybus.com.hk/datagovhk/bus_eta_data_dictionary.pdf>

KMB shit
<https://data.etabus.gov.hk/datagovhk/kmb_eta_api_specification.pdf>
<https://data.etabus.gov.hk/datagovhk/kmb_eta_data_dictionary.pdf>

GMB shit
<https://data.etagmb.gov.hk/static/GMB_ETA_API_Specification.pdf>
