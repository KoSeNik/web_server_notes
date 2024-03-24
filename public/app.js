document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const title = event.target.dataset.title;
    const resultEditTitle = prompt("Введите новое название", title);

    if (resultEditTitle === null) {
      return;
    }

    edit(id, resultEditTitle).then(() => {
      event.target.closest("li").childNodes[0].textContent = resultEditTitle;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, resultEditTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: resultEditTitle,
      id,
    }),
  });
}
