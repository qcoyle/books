const app = new Vue({
    el: "#add-book",
    data: {
        title: "",
        author: "", // Object for multiple authors, separated by 1, 2, 3, etc.
        readDate: "",
        audiobook: false,
        password: "",
        author2: "",
        author3: "",
        author4: "",
        author5: "",
        author6: ""
    },
    methods: {
        submitForm: async function(event) {
            event.preventDefault(); // Don't reload page yet

            // This password validation is NOT secure. For demo purposes only
            if (password.value === "bookmark") {
                if (this.title && this.author && this.readDate) {

                    // Create authors object
                    let authorObject = {
                        1: this.author
                    }

                    // Look for other authors
                    let i = 1;
                    while (i < 100) {
                        i++;
                        console.log(i);
                        let newAuthor;

                        try {
                            newAuthor = document.getElementById(`author${i.toString()}`).value;
                        } catch (error) {
                            console.log("No more authors");
                            break;
                        }

                        authorObject[i] = newAuthor; // Add to the author object
                    }

                    // Create the new book object
                    const book = JSON.stringify({
                        title: this.title,
                        author: authorObject,
                        read_date: this.readDate,
                        audiobook: this.audiobook
                    });

                    console.log(book);
                    try {
                        const response = await fetch("https://y3lypa1pyb.herokuapp.com/books", {
                            method: "POST",
                            body: book,
                            headers: {
                                "Content-type": "application/json"
                            }
                        });

                        console.log(await response.json());
                        if (response.ok) {
                            window.alert("Book Added!");
                            location.reload(true); // Hard reload from server
                        } else {
                            window.alert("ERROR: Request failed");
                        }

                    } catch (error) {
                        console.log(error);
                    }

                } else {
                    window.alert("ERROR: Please fill out all fields");
                }
            } else {
                window.alert("ERROR: Invalid password");
            }
        },
        addAuthor: function(event) {
            event.preventDefault();
            displayAnotherAuthor(document);
        }
    }
})

// Add authors by clicking button
let authorsCounter = 1;
const displayAnotherAuthor = document => {
    authorsCounter++;
    let parentNode = document.querySelector("#authors");
    console.log(parentNode);
    let input = document.createElement("input");
    input.type = "text";
    input.requiredType = "text";
    input.id = `author${authorsCounter}`;
    input.placeholder = `Enter author ${authorsCounter}`;
    input.style = "margin-top: 5px"
    parentNode.appendChild(input);
}