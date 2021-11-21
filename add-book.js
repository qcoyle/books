const app = new Vue({
    el: "#add-book",
    data: {
        title: "",
        author: "", // Object for multiple authors, separated by 1, 2, 3, etc.
        readDate: "",
        audiobook: false,
        password: "",
        initialWait: true
    },
    methods: {
        submitForm: async function(event) {
            event.preventDefault(); // Don't reload page yet

            // This password validation is NOT secure. For demo purposes only
            if (password.value === "bookmark") {
                if (this.title && this.author && this.readDate) {
                    // Create the new book object
                    const book = JSON.stringify({
                        title: this.title,
                        author: {
                            1: this.author
                        },
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
        }
    }
})