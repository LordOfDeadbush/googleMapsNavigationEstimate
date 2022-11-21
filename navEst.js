maps_nav_url = "https://www.google.com/search?q="
// url sample: https://www.google.com/search?q=37.390603%2C-122.116283to37.384844%2C-122.110408

async function get_travel_est(lat1, lng1, lat2, lng2) {
    url = maps_nav_url + lat1 + "%2C" + lng1 + "to" + lat2 + "%2C" + lng2;
    console.log(url);
    request = await fetch(url);
    pageData = await request.text();
    i = pageData.indexOf("Update Map Image");
    i = pageData.indexOf("span", i);
    i = pageData.indexOf(">",i) + 1;
    console.log(i);
}

get_travel_est(37.390603,-122.116283, 37.384844, -122.110408)