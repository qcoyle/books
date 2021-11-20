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
        submitForm: function() {
            window.alert("Form has been submitted");
        }
    }
})