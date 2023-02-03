document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");
  const items = document.querySelectorAll("li");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const itemInput = form.querySelector("input");
    const todo = { item: itemInput.value };

    fetch("/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        // location.reload();
        console.log(data);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });

  items.forEach(item => {
    item.addEventListener("click", function() {
      const itemText = item.textContent.replace(/ /g, "-");

      fetch(`/todo/${itemText}`, {
        method: "DELETE"
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          location.reload();
        })
        .catch(error => {
          console.error("There was a problem with the fetch operation:", error);
        });
    });
  });
});
