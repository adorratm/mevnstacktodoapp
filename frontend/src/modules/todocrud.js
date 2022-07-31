import { ref, computed } from 'vue';
import { useRoute,useRouter } from 'vue-router';

const getTodos = () => {

    const route = useRoute();
    const router = useRouter();

    const todoId = computed(() => route.params.id);

    const state = ref({
        newAuthor: null,
        newTodoItem: null,
        todos: {},
    });

    const GetAllTodos = async () => {
        try {
            await fetch("http://localhost:5000/todos")
                .then((res) => res.json())
                .then((data) => {
                    state.value.todos = data;
                });
        } catch (error) {
            console.log(error);
        }
    };

    const newTodo = async () => {
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    // "auth-token": state.token
                },
                body: JSON.stringify({
                    author: state.value.newAuthor,
                    todo: state.value.newTodoItem
                })
            };
            await fetch("http://localhost:5000/todos/add", requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    state.value.todos.push(data);
                });
        } catch (error) {
            console.log(error)
        }
    };

    const updateTodo = async () => {
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                    // "auth-token": state.token
                },
                body: JSON.stringify({
                    author: state.value.newAuthor,
                    todo: state.value.newTodoItem
                })
            };
            await fetch("http://localhost:5000/todos/update/" + todoId.value, requestOptions)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                });
                router.push('/todos')
        } catch (error) {
            console.log(error)
        }
    };

    const deleteTodo = async (_id) => {
        try {
            await fetch("http://localhost:5000/todos/delete/" + _id, { method: 'DELETE' })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    GetAllTodos()
                });
        } catch (error) {
            console.log(error)
        }
    };

    const todo = ref({});

    const GetSpecificTodo = async () => {
        try {
            await fetch("http://localhost:5000/todos")
                .then((res) => res.json())
                .then((data) => {
                    todo.value = data.filter(t => t._id === todoId.value)
                });
        } catch (error) {
            console.error(error)
        }
    }

    return { todo, todoId, GetSpecificTodo, state, GetAllTodos, newTodo, updateTodo, deleteTodo }
}

export default getTodos