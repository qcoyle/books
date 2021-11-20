const app = new Vue({
    el: "#add-book",
    data: {
        title: "",
        author: "", // Object for multiple authors, separated by 1, 2, 3, etc.
        readDate: "",
        audiobook: false,
        password: ""
    },
    methods: {
        submitForm: async function(event) {
            console.log("submitting form");

            // This password validation is NOT secure. For demo purposes only
            if (password.value === "bookmark") {

                // Create the new book object
                const book = [JSON.stringify({
                    title: this.title,
                    author: {
                        "1": this.author
                    },
                    "read-date": this.readDate,
                    audiobook: this.audiobook
                })];

                console.log(book);
                try {
                    const response = await fetch("https://y3lypa1pyb.herokuapp.com/books", {
                        method: "POST",
                        mode: 'no-cors',
                        body: book,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    if (response.ok) {
                        const jsonResponse = await response.json();
                        console.log(jsonResponse);
                    }

                    console.log(response);
                    window.alert("Book Added!");
                    event.preventDefault();
                } catch (error) {
                    console.log(error);
                }
            } else {
                event.preventDefault(); // Prevent the form from resetting
                window.alert("Invalid password");
            }
        }
    },
    computed: {
        formIsValid: function() {
            return this.title && this.author && this.readDate && this.password;
        }
    }
})