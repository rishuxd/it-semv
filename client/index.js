fetch("/products")
  .then((response) => response.json())
  .then((data) => {
    const itemsDiv = document.querySelector(".items");
    const categories = {};

    data.forEach((item) => {
      if (!categories[item.category]) {
        categories[item.category] = document.createElement("div");
        categories[item.category].className = "category";
        const h2 = document.createElement("h2");
        h2.textContent = item.category;
        categories[item.category].appendChild(h2);
      }

      const itemDiv = document.createElement("div");
      itemDiv.className = "item";

      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.name;

      const h3 = document.createElement("h3");
      h3.textContent = item.name;

      const p = document.createElement("p");
      p.textContent = item.ingredients;

      const span = document.createElement("span");
      span.textContent = "$" + item.price;

      itemDiv.append(img, h3, p, span);
      categories[item.category].appendChild(itemDiv);
    });

    for (const category in categories) {
      itemsDiv.appendChild(categories[category]);
    }
  });
