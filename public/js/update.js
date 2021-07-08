const updatePostHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("#blog-name").value.trim();
    const description = document.querySelector("#blog-description").value.trim();
    const blog_post = document.querySelector("#post-blog").value.trim();
    const id = document.querySelector("#blog-content").getAttribute("data-id");
    console.log(id);
  
    if (name && description && blog_post) {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name, description, blog_post }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert("Failed to update blog");
      }
    }
  };
  
  document
    .querySelector("#update-button")
    .addEventListener("click", updatePostHandler);