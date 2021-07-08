const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector("#blog-content").value.trim();
    const id = document.querySelector("#blog_id").value;
  
    if (content) {
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ content, post_id: id }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    } else {
      alert("Please enter a comment");
    }
  };
  
  document
    .querySelector(".new-comment-form")
    .addEventListener("submit", commentFormHandler);