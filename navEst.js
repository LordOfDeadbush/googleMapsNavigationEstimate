maps_nav_url = "https://www.google.com/search?q="
// url sample: https://www.google.com/search?q=37.390603%2C-122.116283to37.384844%2C-122.110408

async function get_travel_est(lat1, lng1, lat2, lng2) {
    url = maps_nav_url + lat1 + "%2C" + lng1 + "to" + lat2 + "%2C" + lng2;
    console.log(url);
    request = await fetch(url, {method: 'POST', credentials: 'omit'});
    pageData = await request.text();
    i = pageData.indexOf("To:");
    i = pageData.indexOf(">",i) + 1;
    j = pageData.indexOf("<",i);
    // console.log(pageData.slice(i, j));
    return pageData.slice(i, j);
}

function parse_prev_number(s, index) {
    // given index is after the number with no numbers in between
    j = s.lastIndexOf(" ", index);
    i = s.lastIndexOf(" ", j-1) + 1;
    // console.log(s.slice(i, j));
    return parseInt(s.slice(i,j).replace(" ", ""));
}

function turn_into_mins(t) {
    mins = 0;
    if (t.includes("min")) mins += parse_prev_number(t, t.indexOf("min"));
    if (t.includes("hr")) mins += parse_prev_number(t, t.indexOf("hr")) * 60;
    return mins;
}

async function get_travel_estimate_mins(lat1, lng1, lat2, lng2) {
    unparsed_est = await get_travel_est(lat1, lng1, lat2, lng2);
    if (unparsed_est == undefined) return Number.MAX_SAFE_INTEGER;
    parsed_est = turn_into_mins(unparsed_est);
    return parsed_est;
}

async function load_est() { // params for test are: ?la1=37.389852&lo1=-122.114206&la2=37.388990&lo2=-122.066441
    // const queryString = window.location.search;
    // // const params = new URLSearchParams(queryString);
    // la1 = params.get("la1");
    // lo1 = params.get("lo1");
    // la2 = params.get("la2");
    // lo2 = params.get("lo2");
    // console.log(la1, lo1, la2, lo2);
    s = await get_travel_estimate_mins(48.829403, -122.557852, 31.081000, -101.454712);
    document.getElementById("output").innerHTML = s;
}

// get_travel_est(48.829403, -122.557852, 31.081000, -101.454712)
// get_travel_estimate_mins(37.389852, -122.114206, 37.388990, -122.066441).then((result) => console.log(result));

// const queryString = window.location.search;
// const params = new URLSearchParams(queryString);
// la1, lo1, la2, lo2 = params.get("la1"), params.get("lo1"), params.get("la2"), params.get("lo2");


// display_travel_estimate_mins();

load_est();