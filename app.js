Vue.use(loader);

const table = new Vue({
    el: '#app',
    components: {
        loader: loader
    },
    data: {
        currentPage: 1,
        elementsPerPage: 10,
        ascending: false,
        sortColumn: '',
        rows: [],
        loading: false
    },
    methods: {
        // These allow for sorting on the table
        "sortTable": function sortTable(col) {
            if (this.sortColumn === col) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = col;
            }

            var ascending = this.ascending;

            this.rows.sort(function(a, b) {
                if (a[col] > b[col]) {
                    return ascending ? 1 : -1
                } else if (a[col] < b[col]) {
                    return ascending ? -1 : 1
                }
                return 0;
            })
        },
        "num_pages": function num_pages() {
            return Math.ceil(this.rows.length / this.elementsPerPage);
        },
        "get_rows": function get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.rows.slice(start, end);
        },
        "change_page": function change_page(page) {
            this.currentPage = page;
        }
    },
    computed: {
        "columns": function columns() {
            if (this.rows.length == 0) {
                return [];
            }
            return Object.keys(this.rows[0])
        }
    },
    async mounted() {
        const url = "https://y3lypa1pyb.herokuapp.com/books";
        this.loading = true;

        try {
            const response = await fetch(url);
            if (response.ok) {
                const jsonResponse = await response.json();
                this.rows = jsonResponse;
                this.loading = false;
            }
        } catch (error) {
            console.log(error);
        }
    }
});