const app = new Vue({
    el: "#remove-book",
    data: {
        id: "",
        deletePassword: ""
    },
    methods: {
        submitForm: async function(event) {
            event.preventDefault(); // Don't reload page yet

            // This password validation is NOT secure. For demo purposes only
            if (deletePassword.value === "bookmark") {
                const endpoint = `https://y3lypa1pyb.herokuapp.com/books/${this.id}`;

                try {
                    const response = await fetch(endpoint, {
                        method: "DELETE"
                    });

                    if (response.ok) {
                        window.alert("Book Deleted!");
                        location.reload(true); // Hard reload from server
                    } else {
                        window.alert("ERROR: Request failed");
                    }

                } catch (error) {
                    console.log(error);
                }
            } else {
                window.alert("ERROR: Invalid password");
            }
        }
    },
    computed: {
        formIsValid: function() {
            return this.id && this.deletePassword;
        }
    }
})