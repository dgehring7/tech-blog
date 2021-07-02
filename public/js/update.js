const updatePostHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("#post-name").value.trim();
    const description = document.querySelector("#post-description").value.trim();
    const blog_post = document.querySelector("#post-blog").value.trim();
    const id = document.querySelector("#post-content").getAttribute("data-id");
    console.log(id);
  
    if (name && description && blog_post) {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to update post");
      }
    }
  };
  
  document
    .querySelector("#update-button")
    .addEventListener("click", updatePostHandler);