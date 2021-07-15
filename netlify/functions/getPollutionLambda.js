manageInput(e, ...args); {

    e.preventDefault();
    let baseUrl = "https://api.waqi.info/feed/";

    if (args.length === 1) {

        if (args[0]) {
            baseUrl += `${args[0]}`;
            searchBar.value = "";
            baseUrl += `/?token=${API_KEY}`
        } else {
            alert("Please insert a valid value");
        }

    }

    if (args.length === 2) {

        baseUrl += `geo:${args[0]};${args[1]}`;
        baseUrl += `/?token=${API_KEY}`;

    }

    this.callLambdaPollution(baseUrl);

}