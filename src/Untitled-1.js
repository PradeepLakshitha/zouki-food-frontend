fetch("https://i5jtnibbtbyxbt6cjv2bhqzd4a0pdogx.lambda-url.ap-southeast-2.on.aws/getAllData")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // assuming response is JSON
  })
  .then(data => {
    console.log(data); // handle data here
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });

  
